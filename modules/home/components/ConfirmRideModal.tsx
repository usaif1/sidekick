import React from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {DateTime} from 'luxon';
import {useNavigation} from '@react-navigation/native';

// components
import H2 from '@/components/Typography/H2';
import P2 from '@/components/Typography/P2';
import {ButtonTextSm, showToast} from '@/components';

// store
import {useGlobalStore, useThemeStore, useUserStore} from '@/globalStore';
import {useRideStore} from '@/globalStore';

// services and storage
import {rideStorage} from '@/globalStorage';
import {RideService, rideScooterService} from '@/globalService';
import {BluetoothService} from '@/globalService/bluetoothService';

const {colors} = useThemeStore.getState().theme;

interface Props {
  scooterCode: string;
  scooterData: any;
  onCancel: () => void;
}

const ConfirmRideModal: React.FC<Props> = ({
  scooterCode,
  scooterData,
  onCancel,
}) => {
  const navigator = useNavigation();
  const {closeModal} = useGlobalStore();
  const {user} = useUserStore();
  const {setRideStartTime} = useRideStore();

  const navigateToRide = () => {
    closeModal();
    // @ts-ignore
    navigator.navigate('rideNavigator');
  };

  const handleStartRide = async () => {
    if (!scooterData) {
      return;
    }

    try {
      // start scooter via api
      const scooterResponse = await rideScooterService.toggleScooterMobility({
        imei: parseInt(scooterData.imei, 10),
        immobilize: true,
      });

      if (!scooterResponse.success) {
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to start scooter. Please try again.',
        });
        return;
      }

      // if (scooterResponse.success) {
      //   try {
      //     const rideDetails = await RideService.startRide({
      //       object: {
      //         user_id: user?.id,
      //         scooter_id: scooterData.id,
      //         start_hub_id: scooterData.hub_id,
      //         start_time: DateTime.now(),
      //         ride_distance: 0,
      //       },
      //     });
      //     console.log('scooter no', scooterData);
      //     // Store in old storage system
      //     rideStorage.set(
      //       'currentScooterId',
      //       `${scooterData.registration_number}`,
      //     );
      //     rideStorage.set('currentRideId', `${rideDetails?.id}`);

      //     // Store in new storage system
      //     RideService.storeActiveRide({
      //       rideId: rideDetails?.id,
      //       userId: user?.id,
      //       scooterId: scooterData.id,
      //       startTime: DateTime.now().toISO(),
      //       startHubId: scooterData.hub_id,
      //     });
      //     console.log('✅ Ride data stored in both storage systems');

      //     await RideService.createRideStep({
      //       ride_details_id: rideDetails?.id,
      //       steps: 'RIDE_STARTED',
      //     });
      //     setRideStartTime(DateTime.now().toISO());
      //     navigateToRide();
      //   } catch (error) {
      //     console.log('Error starting ride', error);
      //     showToast({
      //       type: 'error',
      //       text1: 'Error',
      //       text2: 'Failed to start ride',
      //     });
      //   }
      //   return;
      // }

      // Fallback to Bluetooth
      console.log('Starting Bluetooth scan for:', scooterData.device_name);

      // Add timeout for overall operation
      const operationTimeout = setTimeout(() => {
        showToast({
          type: 'error',
          text1: 'Timeout',
          text2: 'Scooter connection timed out. Please try again.',
        });
      }, 45000); // 45 seconds total timeout

      BluetoothService.scanDevices(scooterData.device_name, device => {
        clearTimeout(operationTimeout);
        BluetoothService.startScooter({
          scooterRegNo: scooterResponse.data.registration_number,
          foundDevice: device,
          successCallback: async () => {
            try {
              const rideDetails = await RideService.startRide({
                object: {
                  user_id: user?.id,
                  scooter_id: scooterData.id,
                  start_hub_id: scooterData.hub_id,
                  start_time: DateTime.now(),
                  ride_distance: 0,
                },
              });
              console.log('scooter no', scooterData);
              // Store in old storage system
              rideStorage.set(
                'currentScooterId',
                `${scooterData.registration_number}`,
              );
              rideStorage.set('currentRideId', `${rideDetails?.id}`);

              // Store in new storage system
              RideService.storeActiveRide({
                rideId: rideDetails?.id,
                userId: user?.id,
                scooterId: scooterData.id,
                startTime: DateTime.now().toISO(),
                startHubId: scooterData.hub_id,
              });
              console.log(
                '✅ Ride data stored in both storage systems (Bluetooth)',
              );

              await RideService.createRideStep({
                ride_details_id: rideDetails?.id,
                steps: 'RIDE_STARTED',
              });
              setRideStartTime(DateTime.now().toISO());
              clearTimeout(operationTimeout);
              navigateToRide();
            } catch (error) {
              console.log('Error starting ride', error);
              clearTimeout(operationTimeout);
              showToast({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to start ride',
              });
            }
          },
        });
      });
    } catch (error) {
      console.log('Error in handleStartRide', error);
      showToast({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to start ride',
      });
    }
  };

  const handleCancel = () => {
    // Call the onCancel prop to handle returning to scan modal
    onCancel();
  };

  return (
    <View style={styles.container}>
      <H2 customStyles={{textAlign: 'center', marginBottom: 8}}>
        Confirm Ride
      </H2>
      <P2
        textColor="textSecondary"
        customStyles={{textAlign: 'center', marginBottom: 20}}>
        Start ride with scooter {scooterCode}?
      </P2>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <ButtonTextSm
            customStyles={{backgroundColor: colors.lightGray}}
            onPress={handleCancel}
            variant="secondary">
            Cancel
          </ButtonTextSm>
        </View>
        <View style={styles.button}>
          <ButtonTextSm onPress={handleStartRide} variant="highlight">
            Start Ride
          </ButtonTextSm>
        </View>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: '19@ms',
    alignItems: 'center',
    paddingHorizontal: '24@ms',
  },

  buttonContainer: {
    flexDirection: 'row',
    columnGap: 12,
    width: '100%',
  },

  button: {
    flex: 1,
  },
});

export default ConfirmRideModal;
