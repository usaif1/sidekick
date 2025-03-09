// dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import {Login, OTP, Signup} from '../screens';

const AuthStack = createNativeStackNavigator({
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

export default AuthStack;
