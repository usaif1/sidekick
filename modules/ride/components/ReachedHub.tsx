// dependencies
import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import SwipeButton from 'rn-swipe-button';
import {DateTime} from 'luxon';

// components
import TickMarkRounded from '@/assets/tick-mark-rounded.svg';
import {Divider, H2, H3, P2, P3} from '@/components';
import SwipeBtn from '@/assets/swipe-btn-img.svg';
import RideEnded from '../components/RideEnded';

// store
import {useGlobalStore, useRideStore} from '@/globalStore';
import {useThemeStore} from '@/theme/store';
import {RideService, WalletService} from '@/globalService';
import rideStorage from '../storage';
import {Ride_Step_Enum} from '@/generated/graphql';

const {
  theme: {colors},
} = useThemeStore.getState();

const ReachedHub: React.FC = () => {
  const {setModalComponent, setModalCloseButton} = useGlobalStore();
  const {interval, setTimerInterval, setIsPaused, setSelectedHub, totalCost} =
    useRideStore();

  const onSwipeSuccess = async () => {
    setIsPaused(true);
    if (interval) {
      clearInterval(interval);
      setTimerInterval(null);
    }
    await endRide();
    setSelectedHub(undefined);
    setModalComponent(RideEnded);
    setModalCloseButton(null);
  };

  const endRide = async () => {
    const currentRideId = rideStorage.getString('currentRideId');

    try {
      await RideService.createRideStep({
        ride_details_id: currentRideId,
        // steps: 'RIDE_ENDED',
        steps: Ride_Step_Enum.RideEnded,
      });
      await RideService.updateRideEndTime({
        end_time: DateTime.now().toISO(),
        id: currentRideId,
        total_cost: totalCost || 0,
      });

      await deductMoneyFromWallet();

      await WalletService.fetchUserWallet();

      rideStorage.delete('currentRideId');
    } catch (error) {
      console.log('Error ending ride');
    }
  };

  const deductMoneyFromWallet = async () => {
    const userWallet = await WalletService.fetchUserWallet();
    try {
      if (!userWallet) {
        throw new Error('User wallet not found.');
      }

      const availableWalletBalance = userWallet.balance;
      const securityBalance = userWallet.security_deposit;

      if (availableWalletBalance >= totalCost) {
        // Case 1: Wallet has enough balance, deduct from wallet only
        await WalletService.deductBalanceFromWallet({
          id: userWallet.id,
          balance: -totalCost, // Pass negative value to deduct
        });

        console.log(
          `Ride cost of ${totalCost} deducted from wallet. New wallet balance: ${
            availableWalletBalance - totalCost
          }`,
        );
      } else {
        // Case 2: Wallet doesn't have enough, use full wallet and take the rest from security
        const remainingCost = totalCost - availableWalletBalance;

        if (remainingCost > securityBalance) {
          console.error('Insufficient funds in wallet and security deposit.');
          throw new Error('Insufficient balance.');
        }

        // Step 1: Deduct full wallet balance
        await WalletService.deductBalanceFromWallet({
          id: userWallet.id,
          balance: -availableWalletBalance, // Pass negative value to deduct full wallet
        });

        // Step 2: Deduct remaining cost from security deposit
        await WalletService.deductBalanceFromSecurity({
          id: userWallet.id,
          security_deposit: -remainingCost, // Pass negative value to deduct
        });

        console.log(
          `Deducted ${availableWalletBalance} from wallet and ${remainingCost} from security balance.`,
        );
      }

      return {success: true, message: 'Ride cost deducted successfully.'};
    } catch (error) {
      console.error('Error in deducting ride cost:', error);
      return error;
    }
  };

  return (
    <View style={styles.reachedHubWrapper}>
      <View style={styles.headingContainer}>
        <TickMarkRounded />
        <H2 customStyles={{textAlign: 'center'}}>Reached Hub</H2>
      </View>
      <Divider height={6} />
      <P2 textColor="textSecondary">
        Please park your scooter and confirm the payment
      </P2>
      <Divider height={28} />
      <View style={styles.detailsContainer}>
        <View>
          <H3>Car Parking</H3>
          <P3 textColor="textSecondary">10:04 Minutes</P3>
        </View>
        <H3 textColor="highlight">XXX</H3>
      </View>
      <Divider height={28} />
      <SwipeButton
        height={60}
        width={288}
        thumbIconBackgroundColor="red"
        railFillBorderColor="transparent"
        thumbIconBorderColor="#fff"
        railBackgroundColor={colors.redFade}
        enableReverseSwipe={false}
        onSwipeSuccess={onSwipeSuccess}
        swipeSuccessThreshold={70}
        railBorderColor="white"
        thumbIconComponent={ThumbIconButton}
        title=""
        railFillBackgroundColor="transparent"
      />
    </View>
  );
};

export default ReachedHub;

const ThumbIconButton = () => <SwipeBtn />;

const styles = ScaledSheet.create({
  reachedHubWrapper: {
    padding: '18@ms',
    paddingTop: '41.6@vs',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    justifyContent: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
