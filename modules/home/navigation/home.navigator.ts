// /dependencies
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WalletScreen from '../screens/WalletScreen';

const HomeNavigator = createBottomTabNavigator({
  initialRouteName: 'Home',
  screens: {
    Wallet: WalletScreen,
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  screenOptions: {
    headerShown: false,
  },
});

export default HomeNavigator;
