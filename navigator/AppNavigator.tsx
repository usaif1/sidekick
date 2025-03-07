import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeLandingPage from '../modules/home/screens/HomeLandingPage';
import WalletPage from '../modules/wallet/screens/WalletPage';
import ProfilePage from '../modules/profile/screens/ProfilePage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Wallet" component={WalletPage} />
      <Tab.Screen name="Rent Scooter" component={HomeLandingPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
