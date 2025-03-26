// dependencies
import {Pressable, Text, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
  const {confirmationResult, setAuthUser} = useAuthStore();

  const [otp, setOTP] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start countdown timer on component mount
    startCountdown();

    // Clear timer on component unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startCountdown = () => {
    setIsResendDisabled(true);
    setCountdown(120); // Reset to 2 minutes

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount <= 1) {
          // When countdown reaches 0, clear interval and enable resend button
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setIsResendDisabled(false);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleResendOTP = () => {
    // Reset the countdown and disable resend button
    startCountdown();
    // In a real implementation, you would call the API here
    // For now, we're just showing a UI feedback
    console.log('Resending OTP...');
  };

  const validateOTP = (): boolean => {
    if (!otp || otp.trim() === '') {
      setOtpError('OTP is required');
      return false;
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      setOtpError('Please enter a valid 6-digit OTP');
      return false;
    }

    setOtpError('');
    return true;
  };

  const verifyOTP = async () => {
    if (!validateOTP()) {
      return;
    }

    try {
      const response = await AuthService.verifyOTP(
        confirmationResult,
        otp,
        () => {},
      );
      setAuthUser(response);
      return response;
    } catch (err) {
      setOtpError('Invalid OTP. Please try again.');
      console.error('Error verifying OTP:', err);
    }
  };

  return (
    <BottomSheetView>
      <View style={styles.contentContainer}>
        <View style={{width: '100%'}}>
          <Text style={styles.label}>Please Enter the OTP Received</Text>
          <Divider height={10} />
          <BottomSheetStyledInput
            placeholder="XXXXXX"
            value={otp}
            onChangeText={text => {
              setOTP(text);
            }}
            keyboardType="numeric"
            maxLength={6}
            customStyle={{
              textAlign: 'center',
              paddingLeft: 0,
            }}
          />
          {otpError ? (
            <Text style={[styles.errorText, {color: theme.colors.error}]}>
              {otpError}
            </Text>
          ) : null}
        </View>

        <View style={styles.resendContainer}>
          <Pressable
            style={{
              alignSelf: 'center',
              opacity: isResendDisabled ? 0.5 : 1,
            }}
            onPress={isResendDisabled ? undefined : handleResendOTP}
            disabled={isResendDisabled}>
            <Text
              style={{
                color: theme.colors.highlight,
                fontSize: 12,
                fontWeight: '600',
                textDecorationLine: 'underline',
              }}>
              Resend OTP
            </Text>
          </Pressable>
          {isResendDisabled && (
            <Text style={styles.countdownText}>
              {formatTime(countdown)}
            </Text>
          )}
        </View>

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
  errorText: {
    fontSize: '12@ms',
    marginTop: '4@vs',
    textAlign: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8@vs',
    columnGap: '8@s',
  },
  countdownText: {
    fontSize: '12@ms',
    fontWeight: '500',
  },
});
