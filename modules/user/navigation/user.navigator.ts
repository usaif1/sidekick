// Corrected imports
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import UserDetails from '../screens/UserDetails'; // Ensure this path is correct
import EditProfile from '../screens/EditProfile'; // Ensure this path is correct

// Create the stack navigator
const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
        title: '',
      }}
    >
      <Stack.Screen name="UserDeets" component={UserDetails} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }} // We're handling the header in the component
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;