// dependencies
import auth from '@react-native-firebase/auth';

export const sendOTP = async (phoneNumber: string, forceResend: boolean) => {
  console.log('sent OTP fired');
  try {
    const confirmation = await auth().signInWithPhoneNumber(
      phoneNumber,
      forceResend,
    );
    console.log('confirmation', confirmation);
    console.log('OTP sent successfully');
    return confirmation;
  } catch (error) {
    console.error('error sending OTP', error);
    throw new Error('Failed to send OTP');
  }
};
