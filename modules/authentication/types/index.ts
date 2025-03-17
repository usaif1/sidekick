// dependencies
import {Dimensions} from 'react-native';

// components
import {OTPForm, SignupForm, WelcomeForm} from '../components';

const {height} = Dimensions.get('window');

export type ViewType =
  | 'welcome'
  | 'new'
  | 'existing'
  | 'employee'
  | 'otpNew'
  | 'otpExisting'
  | 'otpEmployee';

export const AuthBottomSheetSnapPoints = {
  welcome: [height * 0.45],
  new: [height * 0.55],
  existing: [height * 0.55],
  employee: [height * 0.55],
  otpNew: [height * 0.35],
  otpExisting: [height * 0.35],
  otpEmployee: [height * 0.35],
};

export const AuthBottomSheetComponent = {
  welcome: WelcomeForm,
  new: SignupForm,
  existing: SignupForm,
  employee: SignupForm,
  otpNew: OTPForm,
  otpExisting: OTPForm,
  otpEmployee: OTPForm,
};
