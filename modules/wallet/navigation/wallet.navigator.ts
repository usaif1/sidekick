import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WalletScreen from '../screens/WalletScreen';
import AddFundsScreen from '../screens/AddFundsScreen';
import PaymentSuccessModal from '../components/PaymentSuccessModal';

const Stack = createNativeStackNavigator();

const WalletNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="WalletScreen" 
        component={WalletScreen} 
        options={{ title: 'Wallet' }}
      />
      <Stack.Screen 
        name="AddFundsScreen" 
        component={AddFundsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'transparentModal', headerShown: false }}>
        <Stack.Screen 
          name="PaymentSuccessModal" 
          component={PaymentSuccessModal} 
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default WalletNavigator; 