// dependencies
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import {
  Welcome,
  AlreadyUserForm,
  EmployeeForm,
  SignupForm,
  OTP,
} from '../screens';

// components
import BackArrowButtonSecondary from '@/components/BackArrowButtonSecondary';

export type AuthStackNavigatorParams = {
  welcome: undefined;
  existing: undefined;
  employee: undefined;
  new: undefined;
  otp: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackNavigatorParams>({
  initialRouteName: 'welcome',
  screenOptions: {
    headerShadowVisible: false,
    presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
    title: '',
    headerLeft: () => <BackArrowButtonSecondary />,
    headerTransparent: true,
    headerStyle: {
      backgroundColor: 'transparent',
    },
  },
  screens: {
    welcome: {
      screen: Welcome,
      options: {
        headerShown: false,
        headerLeft: () => null,
      },
    },
    existing: AlreadyUserForm,
    employee: EmployeeForm,
    new: SignupForm,
    otp: OTP,
  },
});

export default AuthStack;
