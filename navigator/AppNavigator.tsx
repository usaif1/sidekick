import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeLandingPage from '../modules/home/screens/HomeLandingPage';
import WalletPage from '../modules/wallet/screens/WalletPage';
import ProfilePage from '../modules/profile/screens/ProfilePage';

import WalletIcon from '../modules/home/assets/walletIcon.svg';
import WalletIconFilled from '../modules/home/assets/walletIconFilled.svg';
import RentScooterIcon from '../modules/home/assets/rentScooterIcon.svg';
import RentScooterIconFilled from '../modules/home/assets/rentScooterIconFilled.svg';
import ProfileIcon from '../modules/home/assets/profileIcon.svg';
import ProfileIconFilled from '../modules/home/assets/profileIconFilled.svg';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Rent Scooter"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#FFFFFF' },
        tabBarLabel: ({ focused }) => {
          const textColor = focused ? '#296AEB' : '#86A0CA';
          return (
            <Text
              style={{
                color: textColor,
                fontWeight: 600,
                fontSize: 10,
                lineHeight: 10,
                letterSpacing: 0,
                textAlign: 'center',
                paddingTop: 4,
              }}
            >
              {route.name}
            </Text>
          );
        },
        tabBarIcon: ({ size, focused }) => {
          const iconMap = {
            Wallet: focused ? WalletIconFilled : WalletIcon,
            'Rent Scooter': focused ? RentScooterIconFilled : RentScooterIcon,
            Profile: focused ? ProfileIconFilled : ProfileIcon,
          };

          const IconComponent = iconMap[route.name as keyof typeof iconMap] ?? WalletIcon; 

          return <IconComponent width={size} height={size}/>;
        },
      })}
    >
      <Tab.Screen name="Wallet" component={WalletPage} />
      <Tab.Screen name="Rent Scooter" component={HomeLandingPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
