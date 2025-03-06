import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import HomeNavigator from '../modules/home';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="home" component={HomeNavigator} />
        </AppStack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
