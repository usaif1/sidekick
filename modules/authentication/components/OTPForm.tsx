// dependencies
import {Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {ScaledSheet} from 'react-native-size-matters';

// components
import {BottomSheetStyledInput, ButtonText, Divider} from '@/components';

// store
import {useThemeStore, useAuthStore} from '@/globalStore';

// services
import AuthService from '../services/auth.service';

const OTPForm: React.FC = () => {
  const {theme} = useThemeStore();
  const {confirmationResult, setUser} = useAuthStore();

  const [otp, setOTP] = useState<string>('');

  const verifyOTP = async () => {
    try {
      const response = await AuthService.verifyOTP(
        confirmationResult,
        otp,
        () => {},
      );
      setUser(response);
      return response;
    } catch (err) {}
  };

  return (
    <BottomSheetView>
      <View style={styles.contentContainer}>
        <View style={{width: '100%'}}>
          <Text style={styles.label}>Please Enter the OTP Received</Text>
          <Divider height={10} />
          <BottomSheetStyledInput
            placeholder="XXXX"
            value={otp}
            onChangeText={text => {
              setOTP(text);
            }}
            customStyle={{
              textAlign: 'center',
              paddingLeft: 0,
            }}
          />
        </View>

        <Pressable
          style={{
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: theme.colors.highlight,
              fontSize: 10,
              fontWeight: '600',
              textDecorationLine: 'underline',
              marginTop: 12,
            }}>
            Resend OTP
          </Text>
        </Pressable>

        <View
          style={{
            marginTop: 20,
            width: 220,
            alignSelf: 'center',
          }}>
          <ButtonText variant="primary" onPress={verifyOTP}>
            Continue
          </ButtonText>
        </View>
      </View>
    </BottomSheetView>
  );
};

export default OTPForm;

const styles = ScaledSheet.create({
  background: {
    flex: 1,
  },
  contentContainer: {
    rowGap: 16,
    width: '100%',
    backgroundColor: 'white', // Optional: Adds a dark overlay for text readability
    borderRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
