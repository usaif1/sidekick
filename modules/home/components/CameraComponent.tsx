import {ActivityIndicator, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, CameraDevice} from 'react-native-vision-camera';
import {DateTime} from 'luxon';
import {ScaledSheet} from 'react-native-size-matters';

// store
import {useGlobalStore, useThemeStore, useUserStore} from '@/globalStore';

// components
import {ButtonTextSm, showToast} from '@/components';

// services and storage
import {rideStorage} from '@/globalStorage';
import {RideService, rideScooterService} from '@/globalService';

// types and enums
import {useNavigation} from '@react-navigation/native';
import {BluetoothService} from '@/globalService/bluetoothService';

const {colors} = useThemeStore.getState().theme;

interface Props {
  scooterCode: string;
  setScooterCode: React.Dispatch<React.SetStateAction<string>>;
}

const CameraComponent: React.FC<Props> = ({scooterCode, setScooterCode}) => {
  const navigator = useNavigation();

  const {closeModal} = useGlobalStore();
  const {user} = useUserStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [device, setDevice] = useState<CameraDevice | null>(null);

  const isMounted = useRef(true);

  const navigateToRide = () => {
    closeModal();
    // @ts-ignore
    navigator.navigate('rideNavigator');
  };

  const handleCodeScanned = async (codes: any) => {
    const scannedValue = codes[0]?.value;
    if (!scooterCode) {
      setScooterCode(scannedValue);
      rideStorage.set('currentScooterId', `${scannedValue}`);
      RideService.fetchScooterByRegNo({
        regNo: scannedValue,
      })
        .then(async response => {
          if (!response) {
            showToast({
              type: 'error',
              text1: 'Error',
              text2: 'Please check reg no',
            });

            return console.log('Please check reg no');
          } else {
            console.log('response', response);
            console.log('device_name', response.device_name);

            const requiredDeviceName = response.device_name;

            if (!requiredDeviceName) {
              showToast({
                type: 'error',
                text1: 'Error',
                text2: 'No device found',
              });
              return;
            }

            BluetoothService.scanDevices(requiredDeviceName, device => {
              BluetoothService.startScooter(device, async () => {
                try {
                  const rideDetails = await RideService.startRide({
                    object: {
                      user_id: user?.id,
                      scooter_id: response.id,
                      start_hub_id: response.hub_id,
                      start_time: DateTime.now(),
                      ride_distance: 0,
                    },
                  });
                  console.log('scooter no', response);
                  rideStorage.set(
                    'currentScooterId',
                    `${response.registration_number}`,
                  );
                  rideStorage.set('currentRideId', `${rideDetails?.id}`);

                  await RideService.createRideStep({
                    ride_details_id: rideDetails?.id,
                    steps: 'RIDE_STARTED',
                  });
                  navigateToRide();
                } catch (error) {
                  console.log('Error starting ride', error);
                }
              });
            });

            return;

            // setScooterCodeError('');
            // const flespiResponse = await rideScooterService.startScooter(
            //   response.registration_number as string,
            // );

            // if (!flespiResponse?.id) {
            //   return console.log('No flespi id');
            // }
            const rideDetails = await RideService.startRide({
              object: {
                user_id: user?.id,
                scooter_id: response.id,
                start_hub_id: response.hub_id,
                start_time: DateTime.now(),
              },
            });

            console.log('scooter no', response);
            rideStorage.set(
              'currentScooterId',
              `${response.registration_number}`,
            );
            rideStorage.set('currentRideId', `${rideDetails?.id}`);

            await RideService.createRideStep({
              ride_details_id: rideDetails?.id,
              steps: 'RIDE_STARTED',
            });
            navigateToRide();
          }
        })

        .catch(err => {
          console.log('Error starting ride', err?.message);
        });
    }
  };

  useEffect(() => {
    isMounted.current = true;
    let timeoutId: NodeJS.Timeout;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    const fetchCameraDevices = async () => {
      if (!isMounted.current) {
        return;
      }

      try {
        setIsLoading(true);

        // Check if camera permission is already granted first
        const currentStatus = await Camera.getCameraPermissionStatus();
        console.log('Current camera permission status:', currentStatus);

        let status = currentStatus;
        // Only request permission if not already granted
        if (currentStatus !== 'granted') {
          console.log('Requesting camera permission...');
          status = await Camera.requestCameraPermission();
          console.log('New camera permission status:', status);
        }

        if (!isMounted.current) {
          return;
        }
        setCameraAvailable(status === 'granted');

        if (status === 'granted') {
          // Increase timeout to give more time for camera initialization
          const attemptGetDevices = async () => {
            if (!isMounted.current) {
              return;
            }

            try {
              console.log(
                `Getting available camera devices (attempt ${
                  retryCount + 1
                })...`,
              );
              const devices = await Camera.getAvailableCameraDevices();
              console.log('Available devices:', devices.length);

              if (!isMounted.current) {
                return;
              }

              if (devices.length === 0) {
                console.log('No camera devices found');

                // If we haven't exceeded max retries, try again after a delay
                if (retryCount < MAX_RETRIES) {
                  retryCount++;
                  console.log(
                    `Retrying in 1 second (attempt ${retryCount}/${MAX_RETRIES})...`,
                  );
                  timeoutId = setTimeout(attemptGetDevices, 1000);
                  return;
                } else {
                  console.log('Max retries exceeded, giving up');
                  setIsLoading(false);
                  return;
                }
              }

              const backCamera = devices.find(d => d.position === 'back');

              if (backCamera) {
                console.log('Back camera found:', backCamera.id);
                setDevice(backCamera);
              } else {
                console.log(
                  'No back camera found, using first available camera',
                );
                // Fallback to the first camera if no back camera is found
                setDevice(devices[0]);
              }

              setIsLoading(false);
            } catch (error) {
              console.error('Camera device error:', error);
              if (isMounted.current) {
                setIsLoading(false);
              }
            }
          };

          // Start the first attempt after a short delay
          timeoutId = setTimeout(attemptGetDevices, 500);
        } else {
          console.log('Camera permission not granted');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Camera permission error:', error);
        if (isMounted.current) {
          setCameraAvailable(false);
          setIsLoading(false);
        }
      } finally {
        setIsProcessing(false);
      }
    };

    fetchCameraDevices();

    return () => {
      isMounted.current = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.highlight} />
        <Text style={styles.cameraStatusText}>Initializing camera...</Text>
      </View>
    );
  }

  if (isProcessing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.highlight} />
        <Text style={styles.cameraStatusText}>Processing QR Code...</Text>
      </View>
    );
  }

  if (!cameraAvailable) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={styles.cameraStatusText}>Camera permission needed</Text>
        <ButtonTextSm
          customStyles={{marginTop: 10, paddingHorizontal: 10}}
          onPress={async () => {
            setIsLoading(true);
            const status = await Camera.requestCameraPermission();
            setCameraAvailable(status === 'granted');
            setIsLoading(false);
          }}
          variant="highlight">
          Grant Permission
        </ButtonTextSm>
      </View>
    );
  }

  if (!device) {
    return <Text style={styles.cameraStatusText}>Camera not available</Text>;
  }

  return (
    <Camera
      style={styles.camera}
      device={device}
      isActive={!isProcessing}
      codeScanner={{
        codeTypes: ['qr'],
        onCodeScanned: handleCodeScanned,
      }}
    />
  );
};

export default CameraComponent;

const styles = ScaledSheet.create({
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '105%',
    height: '105%',
  },

  cameraStatusText: {
    color: colors.textSecondary,
    fontSize: '14@ms',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
});
