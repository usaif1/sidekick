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
  TNC,
} from '../screens';
import {
  SplashScreen1,
  SplashScreen2,
  SplashScreen3,
} from '../../splash/screens';

// components
import BackArrowButtonSecondary from '@/components/BackArrowButtonSecondary';

export type AuthStackNavigatorParams = {
  welcome: undefined;
  existing: undefined;
  employee: undefined;
  new: undefined;
  otp: undefined;
  splash1: undefined;
  splash2: undefined;
  splash3: undefined;
  tnc: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackNavigatorParams>({
  initialRouteName: 'splash1',
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
    splash1: {
      screen: SplashScreen1,
      options: {
        headerShown: false,
        headerLeft: () => null,
      },
    },
    splash2: {
      screen: SplashScreen2,
      options: {
        headerShown: false,
        headerLeft: () => null,
      },
    },
    splash3: {
      screen: SplashScreen3,
      options: {
        headerShown: false,
        headerLeft: () => null,
      },
    },
    tnc: {
      screen: TNC,
    },
  },
});

export default AuthStack;
