// dependencies
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import WalletScreen from '../screens/WalletScreen';
import AddFundsScreen from '../screens/AddFundsScreen';

// components
import {BackArrowButton} from '@/components';

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
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AddFundsScreen"
      component={AddFundsScreen}
      options={{
        headerLeft: () => <BackArrowButton title="Add Funds" />,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    />
  </Stack.Navigator>
);

export default WalletNavigator;
