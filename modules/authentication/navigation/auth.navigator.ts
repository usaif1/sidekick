// dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {StaticParamList} from '@react-navigation/native';

// screens
import {Login, OTP, Signup} from '../screens';

export type AuthStackNavigatorParams = {
  login: undefined;
  signup: undefined;
  otp: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackNavigatorParams>({
  initialRouteName: 'login',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    login: Login,
    signup: Signup,
    otp: OTP,
  },
});

type AuthStackParamList = StaticParamList<typeof AuthStack>;

declare global {
  namespace ReactNavigation {
    interface AuthParamList extends AuthStackParamList {}
  }
}

export default AuthStack;
