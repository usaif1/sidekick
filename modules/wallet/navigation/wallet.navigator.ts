// dependencies
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import WalletScreen from '../screens/WalletScreen';
import AddFundsScreen from '../screens/AddFundsScreen';

const WalletNavigator = createNativeStackNavigator({
  initialRouteName: 'WalletScreen',
  screenOptions: {
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
        headerShown: false,
      },
    },
    },
});

export default WalletNavigator;