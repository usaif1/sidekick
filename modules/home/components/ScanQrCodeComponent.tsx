import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {DateTime} from 'luxon';

// components
import H2 from '@/components/Typography/H2';
import P2 from '@/components/Typography/P2';
import Divider from '@/components/Divider';

// store
import {useGlobalStore, useThemeStore, useUserStore} from '@/globalStore';
import LinearGradientSVG from '../assets/linearGradient.svg';
import {ButtonTextSm} from '@/components';
import {RideService} from '@/globalService';
import {rideStorage} from '@/globalStorage';
import {Ride_Step_Enum} from '@/generated/graphql';
import {rideScooterService} from '@/modules/ride/services/ride.scooter.service';
import CameraComponent from './CameraComponent';

const {colors} = useThemeStore.getState().theme;

const ScanQrCodeComponent = () => {
  const navigator = useNavigation();
  const {closeModal} = useGlobalStore();
  const {user} = useUserStore();

  const [isKeyboardFocused, setIsKeyboardFocused] = useState<boolean>(false);

  const [scooterCode, setScooterCode] = useState<string>('');
  const [scooterCodeError, setScooterCodeError] = useState<string>('');

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

  const startScooterRecursive = async (response: any) => {
    const flespiResponse = await rideScooterService.startScooter(
      response?.registration_number as string,
    );

    if (flespiResponse?.response) {
      const rideDetails = await RideService.startRide({
        object: {
          user_id: user?.id,
          scooter_id: response.id,
          start_hub_id: response.hub_id,
          start_time: DateTime.now(),
        },
      });

      console.log('scooter no', response);
      rideStorage.set('currentScooterId', `${response.registration_number}`);
      rideStorage.set('currentRideId', `${rideDetails?.id}`);

      await RideService.createRideStep({
        ride_details_id: rideDetails?.id,
        steps: Ride_Step_Enum.RideStarted,
      });
      navigateToRide();
      return true;
    }

    startScooterRecursive(response?.registration_number as string);
  };

  const handleContinue = () => {
    if (!validateScooterCode()) {
      return null;
    }

    RideService.fetchScooterByRegNo({
      regNo: scooterCode,
    })
      .then(async response => {
        if (!response) {
          setScooterCodeError('No scooter found with this code');

          return console.log('Please check reg no');
        } else {
          // setScooterCodeError('');
          // const flespiResponse = await rideScooterService.startScooter(
          //   response.registration_number as string,
          // );

          // if (!flespiResponse?.error) {
          //   return console.log('No flespi id');
          // }

          await startScooterRecursive(response as any);

          // const rideDetails = await RideService.startRide({
          //   object: {
          //     user_id: user?.id,
          //     scooter_id: response.id,
          //     start_hub_id: response.hub_id,
          //     start_time: DateTime.now(),
          //   },
          // });

          // console.log('scooter no', response);
          // rideStorage.set(
          //   'currentScooterId',
          //   `${response.registration_number}`,
          // );
          // rideStorage.set('currentRideId', `${rideDetails?.id}`);

          // await RideService.createRideStep({
          //   ride_details_id: rideDetails?.id,
          //   steps: Ride_Step_Enum.RideStarted,
          // });
          // navigateToRide();
        }
      })

      .catch(err => {
        console.log('Error starting ride', err?.message);
      });
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
              <View style={styles.cameraContainer}>
                <CameraComponent
                  scooterCode={scooterCode}
                  setScooterCode={setScooterCode}
                />
              </View>
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
                maxLength={7}
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
            <View
              style={{
                alignItems: 'flex-start',
                paddingLeft: 5,
              }}>
              <Text style={styles.errorText}>{scooterCodeError}</Text>
            </View>
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

  errorText: {
    color: colors.error,
    fontSize: '12@ms',
    marginTop: '4@vs',
    textAlign: 'center',
  },
});

export default ScanQrCodeComponent;
