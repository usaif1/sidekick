// dependencies
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {StaticParamList} from '@react-navigation/native';

// screens
import AuthScreen from '../screens';

export type AuthStackNavigatorParams = {
  welcome: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackNavigatorParams>({
  initialRouteName: 'welcome',
  screenOptions: {
    headerShown: false,
    presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
  },
  screens: {
    welcome: AuthScreen,
  },
});

type AuthStackParamList = StaticParamList<typeof AuthStack>;

declare global {
  namespace ReactNavigation {
    interface AuthParamList extends AuthStackParamList {}
  }
}

export default AuthStack;
