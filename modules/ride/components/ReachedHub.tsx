// dependencies
import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import SwipeButton from 'rn-swipe-button';

// components
import TickMarkRounded from '@/assets/tick-mark-rounded.svg';
import {Divider, H2, H3, P2, P3} from '@/components';
import SwipeBtn from '@/assets/swipe-btn-img.svg';
import RideEnded from '../components/RideEnded';

// store
import {useGlobalStore, useRideStore} from '@/globalStore';
import {useThemeStore} from '@/theme/store';

const {
  theme: {colors},
} = useThemeStore.getState();

const ReachedHub: React.FC = () => {
  const {setModalComponent, setModalCloseButton} = useGlobalStore();
  const {interval, setTimerInterval, setIsPaused} = useRideStore();

  const onSwipeSuccess = () => {
    setIsPaused(true);
    if (interval) {
      clearInterval(interval);
      setTimerInterval(null);
    }

    setModalComponent(RideEnded);
    setModalCloseButton(null);
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
