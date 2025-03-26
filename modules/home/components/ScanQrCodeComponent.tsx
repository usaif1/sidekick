import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {Camera, CameraDevice} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

// components
import H2 from '@/components/Typography/H2';
import P2 from '@/components/Typography/P2';
import Divider from '@/components/Divider';

// store
import {useGlobalStore, useThemeStore} from '@/globalStore';
import LinearGradientSVG from '../assets/linearGradient.svg';
import {ButtonTextSm} from '@/components';
import {RideService} from '@/globalService';

const {colors} = useThemeStore.getState().theme;

const ScanQrCodeComponent = () => {
  const navigator = useNavigation();
  const {closeModal} = useGlobalStore();

  const [isKeyboardFocused, setIsKeyboardFocused] = useState<boolean>(false);
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [device, setDevice] = useState<CameraDevice | null>(null);
  const [scooterCode, setScooterCode] = useState<string>('');
  const [scooterCodeError, setScooterCodeError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isMounted = useRef(true);
  const inputRef = useRef<TextInput>(null);

  // Add keyboard listeners to detect when keyboard is shown/hidden
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardFocused(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardFocused(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Function to dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
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

        if (!isMounted.current) return;
        setCameraAvailable(status === 'granted');

        if (status === 'granted') {
          // Increase timeout to give more time for camera initialization
          const attemptGetDevices = async () => {
            if (!isMounted.current) return;

            try {
              console.log(
                `Getting available camera devices (attempt ${
                  retryCount + 1
                })...`,
              );
              const devices = await Camera.getAvailableCameraDevices();
              console.log('Available devices:', devices.length);

              if (!isMounted.current) return;

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
      }
    };

    fetchCameraDevices();

    return () => {
      console.log('Cleaning up camera resources');
      isMounted.current = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleCodeScanned = (codes: any) => {
    console.log('fire');
    const scannedValue = codes[0]?.value;
    console.log('scanned value', scannedValue);
    if (scannedValue) {
      // setScooterCode(scannedValue);
      // navigateToRide();
    }
  };

  const validateScooterCode = (): boolean => {
    if (!scooterCode || scooterCode.trim() === '') {
      setScooterCodeError('Please enter a scooter code');
      return false;
    }

    setScooterCodeError('');
    return true;
  };

  const navigateToRide = () => {
    closeModal();
    // @ts-ignore
    navigator.navigate('rideNavigator');
  };

  const handleContinue = () => {
    RideService.fetchScooterByRegNo({
      regNo: scooterCode,
    })
      .then(response => {
        if (!response) {
          return console.log('Please check reg no');
        } else {
          RideService.startRide({
            object: {},
          }).then(() => {
            if (validateScooterCode()) {
              navigateToRide();
            }
          });
        }
      })

      .catch(err => {
        console.log('Error starting ride', err?.message);
      });
  };

  const renderCamera = () => {
    if (isLoading) {
      return (
        <Text style={styles.cameraStatusText}>Initializing camera...</Text>
      );
    }

    if (!cameraAvailable) {
      return (
        <View>
          <Text style={styles.cameraStatusText}>Camera permission needed</Text>
          <ButtonTextSm
            customStyles={{marginTop: 10}}
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
        isActive={true}
        codeScanner={{
          codeTypes: ['qr'],
          onCodeScanned: handleCodeScanned,
        }}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {!isKeyboardFocused && (
          <>
            <View style={styles.secondaryContainer}>
              <H2>Scan QR Code</H2>
              <Divider height={6} />
              <P2
                customStyles={{textAlign: 'center'}}
                textColor="textSecondary">
                Please scan the QR Code in the
              </P2>
              <P2
                customStyles={{textAlign: 'center'}}
                textColor="textSecondary">
                middle of the Scooter's handle
              </P2>
              <Divider height={12} />
              <View style={styles.cameraContainer}>{renderCamera()}</View>
            </View>

            <Divider height={12} />
            <View style={styles.separatorContainer}>
              <LinearGradientSVG style={styles.gradientLeft} />
              <Text style={styles.orText}>or</Text>
              <LinearGradientSVG style={styles.gradientRight} />
            </View>
            <Divider height={12} />
          </>
        )}

        <View>
          <H2 customStyles={{textAlign: 'center'}}>Enter Scooter Number</H2>
          <Divider height={5} />
          <P2 textColor="textSecondary" customStyles={{textAlign: 'center'}}>
            Please enter the number you see
          </P2>
          <Divider height={14} />
          <TouchableWithoutFeedback>
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                onFocus={() => setIsKeyboardFocused(true)}
                onBlur={() => {
                  // We'll rely on the Keyboard listeners instead
                  // This is just a backup
                  setTimeout(() => {
                    if (!inputRef.current?.isFocused()) {
                      setIsKeyboardFocused(false);
                    }
                  }, 100);
                }}
                placeholder="XXXX"
                value={scooterCode}
                onChangeText={text => {
                  setScooterCode(text);
                  if (scooterCodeError) {
                    setScooterCodeError('');
                  }
                }}
                placeholderTextColor={colors.textSecondary}
                style={[
                  styles.input,
                  {color: colors.textPrimary},
                  scooterCodeError ? {borderColor: colors.error} : null,
                ]}
              />
              <View style={{width: 100}}>
                <ButtonTextSm
                  customStyles={{height: '100%'}}
                  onPress={() => {
                    dismissKeyboard();
                    handleContinue();
                  }}
                  variant="highlight">
                  Continue
                </ButtonTextSm>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {scooterCodeError ? (
            <Text style={styles.errorText}>{scooterCodeError}</Text>
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: '19@ms',
    alignItems: 'center',
  },
  secondaryContainer: {
    paddingTop: '19@ms',
    alignItems: 'center',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientLeft: {
    width: 47,
    height: 4,
    marginRight: 10,
  },
  gradientRight: {
    width: 47,
    height: 4,
    marginLeft: 10,
    transform: [{rotate: '180deg'}],
  },
  orText: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.textPrimary,
  },

  input: {
    textAlign: 'center',
    height: '100%',
    fontSize: moderateScale(13.5),
    fontFamily: 'PlusJakartaSans-Medium',
    fontWeight: '600',
    flex: 1,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    color: colors.textSecondary,
  },

  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
    maxHeight: 40,
  },
  cameraContainer: {
    height: 200,
    width: 200,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.highlight,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '105%',
    height: '105%',
  },
  errorText: {
    color: colors.error,
    fontSize: '12@ms',
    marginTop: '4@vs',
    textAlign: 'center',
  },
  cameraStatusText: {
    color: colors.textSecondary,
    fontSize: '14@ms',
    textAlign: 'center',
  },
});

export default ScanQrCodeComponent;
