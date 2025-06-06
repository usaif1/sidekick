// dependencies
import {Dimensions, View} from 'react-native';
import React, {useMemo} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import useLocationStore from '@/modules/home/store/locationStore';

// store
import {useGlobalStore, useRideStore} from '@/globalStore';
import {useThemeStore} from '@/theme/store';

// components
import {
  ButtonTextBottomSheet,
  Divider,
  H1,
  // H2,
  H3,
  P1,
} from '@/components';

import {EndRide} from '../components';
import {calculateHubDistance} from '@/modules/home/utilis/distanceUtils';
import {rideScooterService, RideService} from '@/globalService';
import rideStorage from '../storage';
import {BluetoothService} from '@/globalService/bluetoothService';

const {
  theme: {colors},
} = useThemeStore.getState();

const RideDetails: React.FC = () => {
  const currentRideId = rideStorage.getString('currentRideId');
  const currentScooterId = rideStorage.getString('currentScooterId');

  const {setModalComponent, openModal} = useGlobalStore();
  const {
    totalCost,
    isPaused,
    setIsPaused,
    secondsElapsed,
    activeSecondsElapsed,
    pausedSecondsElapsed,
    perMinuteRate,
    pausedPerMinuteRate,
    selectedHub,
    setPauseStartTime,
  } = useRideStore();

  const latitude = useLocationStore(state => state.latitude);
  const longitude = useLocationStore(state => state.longitude);

  // Convert seconds into mm:ss format
  const formatTime = (totalSeconds: number) => {
    try {
      // Validate input
      if (
        typeof totalSeconds !== 'number' ||
        isNaN(totalSeconds) ||
        totalSeconds < 0
      ) {
        console.warn('⚠️ Invalid time value:', totalSeconds);
        return '00:00';
      }

      const seconds = Math.floor(totalSeconds);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      return `${String(minutes).padStart(2, '0')}:${String(
        remainingSeconds,
      ).padStart(2, '0')}`;
    } catch (error) {
      console.error('❌ Error formatting time:', error);
      return '00:00';
    }
  };

  const distance = useMemo(() => {
    try {
      if (!selectedHub || !latitude || !longitude) {
        return '0m';
      }

      // Validate coordinates
      if (
        typeof latitude !== 'number' ||
        typeof longitude !== 'number' ||
        isNaN(latitude) ||
        isNaN(longitude)
      ) {
        console.warn('⚠️ Invalid coordinates:', {latitude, longitude});
        return '0m';
      }

      return calculateHubDistance(latitude, longitude, selectedHub);
    } catch (error) {
      console.error('❌ Error calculating distance:', error);
      return '0m';
    }
  }, [latitude, longitude, selectedHub]);

  const endRide = () => {
    setModalComponent(EndRide);
    openModal();
  };

  // Turn off scooter when pausing
  const turnOffScooter = async () => {
    if (!currentScooterId) return;

    try {
      const response = await RideService.fetchScooterByRegNo({
        regNo: currentScooterId,
      });

      if (!response || !response.device_name) {
        console.log('Scooter not found for turning off');
        return;
      }

      const stopScooterResponse =
        await rideScooterService.toggleScooterMobility({
          imei: parseInt(response.imei),
          immobilize: false,
        });

      if (stopScooterResponse.success) {
        console.log('scooter stopped via API');
        return;
      }

      // BluetoothService.scanDevices(response.device_name, device => {
      //   BluetoothService.stopScooter(device, () => {
      //     console.log('✅ Scooter turned off due to pause');
      //   });
      // });
    } catch (error) {
      console.error('Error turning off scooter:', error);
    }
  };

  // Turn on scooter when resuming
  const turnOnScooter = async () => {
    if (!currentScooterId) return;

    try {
      const response = await RideService.fetchScooterByRegNo({
        regNo: currentScooterId,
      });

      if (!response || !response.device_name) {
        console.log('Scooter not found for turning on');
        return;
      }

      const startScooterResponse =
        await rideScooterService.toggleScooterMobility({
          imei: parseInt(response.imei),
          immobilize: true,
        });

      if (startScooterResponse.success) {
        console.log('scooter turned on via API');
        return;
      }

      // BluetoothService.scanDevices(response.device_name, device => {
      //   BluetoothService.startScooter(device, () => {
      //     console.log('✅ Scooter turned on due to resume');
      //   });
      // });
    } catch (error) {
      console.error('Error turning on scooter:', error);
    }
  };

  return (
    <View style={{height: '100%'}}>
      {/* {selectedHub && (
        <View style={styles.targetHubWrapper}>
          <View style={styles.targetHubContainer}>
            <H2 textColor="highlight">
              {selectedHub.name || 'No Hub Selected'}
            </H2>
            <H2 textColor="highlight">{distance}</H2>
          </View>
        </View>
      )} */}
      <Divider height={9} />
      <View style={styles.rideDetailsContainer}>
        <View style={styles.handle} />
        <Divider height={16} />
        <View style={{alignItems: 'center'}}>
          <H1>{formatTime(secondsElapsed)}</H1>
          <P1>{distance}</P1>
        </View>
        <Divider height={16} />
        <View style={{paddingHorizontal: moderateScale(18)}}>
          <View style={styles.ridingMetricsFlexContainer}>
            <H3 textColor="textSecondary">Active Riding</H3>
            <H3 textColor="textSecondary">
              {formatTime(activeSecondsElapsed)} @ ₹{perMinuteRate}/min
            </H3>
          </View>
          <Divider height={4} />
          {pausedSecondsElapsed > 0 && (
            <>
              <View style={styles.ridingMetricsFlexContainer}>
                <H3 textColor="textSecondary">Paused Time</H3>
                <H3 textColor="textSecondary">
                  {formatTime(pausedSecondsElapsed)} @ ₹{pausedPerMinuteRate}
                  /min
                </H3>
              </View>
              <Divider height={4} />
            </>
          )}
          <View style={styles.ridingMetricsFlexContainer}>
            <H3 textColor="textPrimary">Total Cost</H3>
            <H3 textColor="textPrimary">₹ {totalCost}</H3>
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
                onPress={async () => {
                  try {
                    console.log('🔄 Resuming ride...');

                    // Create ride step first
                    await RideService.createRideStep({
                      ride_details_id: currentRideId,
                      steps: 'RIDE_RESUMED',
                    });
                    console.log('✅ Ride step created: RIDE_RESUMED');

                    // Update state
                    setIsPaused(false);
                    console.log('✅ Pause state updated to false');

                    // Turn on scooter (async, don't wait)
                    turnOnScooter().catch(error => {
                      console.error('❌ Error turning on scooter:', error);
                    });
                  } catch (error) {
                    console.error('❌ Error resuming ride:', error);
                    // Try to revert state if API call failed
                    setIsPaused(true);
                  }
                }}
                customStyle={{width: 170}}>
                Resume Ride
              </ButtonTextBottomSheet>
            ) : (
              <ButtonTextBottomSheet
                variant="primary"
                onPress={async () => {
                  try {
                    console.log('🔄 Pausing ride...');

                    // Create ride step first
                    await RideService.createRideStep({
                      ride_details_id: currentRideId,
                      steps: 'RIDE_PAUSED',
                    });
                    console.log('✅ Ride step created: RIDE_PAUSED');

                    // Update state
                    setIsPaused(true);
                    console.log('✅ Pause state updated to true');

                    // Turn off scooter (async, don't wait)
                    turnOffScooter().catch(error => {
                      console.error('❌ Error turning off scooter:', error);
                    });
                  } catch (error) {
                    console.error('❌ Error pausing ride:', error);
                    // Try to revert state if API call failed
                    setIsPaused(false);
                  }
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
