import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import HomeLandingPage from '../modules/home/screens/HomeLandingPage';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <AppStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Home" component={HomeLandingPage} />
        </AppStack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
