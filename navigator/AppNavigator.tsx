import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeLandingPage from '../modules/home/screens/HomeLandingPage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeLandingPage} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
