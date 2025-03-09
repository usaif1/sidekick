// dependencies
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

// screens
import UserDetails from '../screens/UserDetails'; // Ensure this path is correct
import EditProfile from '../screens/EditProfile'; // Ensure this path is correct

// store
import { useThemeStore } from '@/globalStore';

const UserNavigator = createNativeStackNavigator({
  initialRouteName: 'UserDeets',
  screenOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerShadowVisible: false,
    title: '',
  },
  screens: {
    UserDeets: {
      screen: UserDetails,
    },
    EditProfile: {
      screen: EditProfile,
      options: { 
        headerShown: false // We're handling the header in the component
      },
    },
  },
});

export default UserNavigator;