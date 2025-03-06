import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeLandingPage from './screens/HomeLandingPage';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeLandingPage" component={HomeLandingPage} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
