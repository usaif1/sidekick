// dependencies
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import WalletScreen from '../screens/WalletScreen';
import AddFundsScreen from '../screens/AddFundsScreen';

const WalletNavigator = createNativeStackNavigator({
  initialRouteName: 'WalletScreen',
  screenOptions: {
    // this prevent flickering on android
    presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerShadowVisible: false,
  },
  screens: {
    WalletScreen: {
      screen: WalletScreen,
      options: {
        title: 'Wallet',
      },
    },
    AddFundsScreen: {
      screen: AddFundsScreen,
      options: {
        headerShown: true,
      },
    },
  },
});

export default WalletNavigator;
