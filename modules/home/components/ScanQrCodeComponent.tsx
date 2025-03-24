import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Platform, Alert} from 'react-native';
import {Camera} from 'react-native-vision-camera';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import H2 from '@/components/Typography/H2';
import P2 from '@/components/Typography/P2';
import Divider from '@/components/Divider';
import {useGlobalStore, useThemeStore} from '@/globalStore';
import LinearGradientSVG from '../assets/linearGradient.svg';
import {ButtonTextSm} from '@/components';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

const {colors} = useThemeStore.getState().theme;

const ScanQrCodeComponent = () => {
  const {navigator, closeModal} = useGlobalStore();
  const [hasPermission, setHasPermission] = useState(false);
  const devices = Camera.getAvailableCameraDevices();
  const device = devices.find(d => d.position === 'back');

  useEffect(() => {
    const checkPermissions = async () => {
      let permission;
      if (Platform.OS === 'ios') {
        permission = await request(PERMISSIONS.IOS.CAMERA);
      } else {
        permission = await request(PERMISSIONS.ANDROID.CAMERA);
      }

      setHasPermission(permission === RESULTS.GRANTED);

      if (permission !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission Denied',
          'Camera access is required to scan QR codes.',
        );
      }
    };

    checkPermissions();
  }, []);

  const handleCodeScanned = (codes: any) => {
    const scannedValue = codes[0]?.value;
    if (scannedValue) {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>
        <H2>Scan QR Code</H2>
        <Divider height={6} />
        <P2 customStyles={{textAlign: 'center'}} textColor="textSecondary">
          Please scan the QR Code in the
        </P2>
        <P2 customStyles={{textAlign: 'center'}} textColor="textSecondary">
          middle of the Scooter’s handle
        </P2>
        <Divider height={12} />
        {device && hasPermission ? (
          <View
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: colors.highlight,
              overflow: 'hidden',
            }}>
            <Camera
              style={{flex: 1}}
              device={device}
              isActive={true}
              codeScanner={{
                codeTypes: ['qr'],
                onCodeScanned: handleCodeScanned,
              }}
            />
          </View>
        ) : (
          <View
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: colors.highlight,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>No camera available</Text>
          </View>
        )}
      </View>

      <Divider height={12} />
      <View style={styles.separatorContainer}>
        <LinearGradientSVG style={styles.gradientLeft} />
        <Text style={styles.orText}>or</Text>
        <LinearGradientSVG style={styles.gradientRight} />
      </View>
      <Divider height={12} />

      <View>
        <H2 customStyles={{textAlign: 'center'}}>Enter Scooter Number</H2>
        <Divider height={5} />
        <P2 textColor="textSecondary" customStyles={{textAlign: 'center'}}>
          Please enter the number you see
        </P2>
        <Divider height={14} />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="XXXX"
            placeholderTextColor={colors.textSecondary}
            style={styles.input}
          />
          <View style={{width: 100}}>
            <ButtonTextSm
              customStyles={{height: '100%'}}
              onPress={() => {
                closeModal();
                navigator.navigate('rideNavigator');
              }}
              variant="highlight">
              Continue
            </ButtonTextSm>
          </View>
        </View>
      </View>
    </View>
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
});

export default ScanQrCodeComponent;
