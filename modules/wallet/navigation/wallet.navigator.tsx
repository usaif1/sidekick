// dependencies
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import WalletScreen from '../screens/WalletScreen';
import AddFundsScreen from '../screens/AddFundsScreen';

const Stack = createNativeStackNavigator();

const WalletNavigator = () => (
  <Stack.Navigator
    initialRouteName="WalletScreen"
    screenOptions={{
      // this prevent flickering on android
      presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerShadowVisible: false,
    }}
  >
    <Stack.Screen
      name="WalletScreen"
      component={WalletScreen}
      options={{
        title: 'Wallet',
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="AddFundsScreen"
      component={AddFundsScreen}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

export default WalletNavigator;
