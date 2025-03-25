// dependencies
import {Dimensions, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

// store
import {useGlobalStore} from '@/globalStore';
import {useThemeStore} from '@/theme/store';

// components
import {ButtonTextBottomSheet, Divider, H1, H2, H3, P1} from '@/components';

import {EndRide} from '../components';

const {
  theme: {colors},
} = useThemeStore.getState();

const RideDetails: React.FC = () => {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const {setModalComponent, openModal} = useGlobalStore();

  const endRide = () => {
    setModalComponent(EndRide);
    openModal();
  };

  return (
    <View style={{height: '100%'}}>
      <View style={styles.targetHubWrapper}>
        <View style={styles.targetHubContainer}>
          <H2 textColor="highlight">Car Parking</H2>
          <H2 textColor="highlight">250m</H2>
        </View>
      </View>
      <Divider height={9} />
      <View style={styles.rideDetailsContainer}>
        <View style={styles.handle} />
        <Divider height={16} />
        <View style={{alignItems: 'center'}}>
          <H1>00:35</H1>
          <P1>250m</P1>
        </View>
        <Divider height={16} />
        <View style={{paddingHorizontal: moderateScale(18)}}>
          <View style={styles.ridingMetricsFlexContainer}>
            <H3 textColor="textSecondary">Riding Cost</H3>
            <H3 textColor="textSecondary">XX/Minute</H3>
          </View>
          <Divider height={4} />
          <View style={styles.ridingMetricsFlexContainer}>
            <H3 textColor="textSecondary">Total</H3>
            <H3 textColor="textSecondary">XX</H3>
          </View>

          <Divider height={16} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ButtonTextBottomSheet
              variant="alert"
              onPress={endRide}
              customStyle={{width: 170}}>
              End Ride
            </ButtonTextBottomSheet>
            {isPaused ? (
              <ButtonTextBottomSheet
                variant="primary"
                onPress={() => {
                  setIsPaused(false);
                }}
                customStyle={{width: 170}}>
                Resume Ride
              </ButtonTextBottomSheet>
            ) : (
              <ButtonTextBottomSheet
                variant="primary"
                onPress={() => {
                  setIsPaused(true);
                }}
                customStyle={{width: 170}}>
                Pause Ride
              </ButtonTextBottomSheet>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideDetails;

const styles = ScaledSheet.create({
  targetHubWrapper: {
    paddingHorizontal: '10@s',
  },

  targetHubContainer: {
    backgroundColor: colors.white,
    paddingVertical: '14@vs',
    paddingHorizontal: '18@vs',
    borderWidth: 1,
    borderColor: colors.highlight,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  handle: {
    alignSelf: 'center',
    height: '3.4@vs',
    backgroundColor: colors.textSecondary,
    width: '70@s',
  },

  rideDetailsContainer: {
    backgroundColor: 'white',
    height: Dimensions.get('screen').height,
    borderRadius: 16,
    paddingTop: '16@vs',
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },

  ridingMetricsFlexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
