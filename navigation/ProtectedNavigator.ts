// dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// navigators
import HomeNavigator from '@/modules/home/navigation/home.navigator';
import UserNavigator from '@/modules/user/navigation/user.navigator';
import WalletNavigator from '@/modules/wallet/navigation/wallet.navigator';

const ProtectedNavigator = createNativeStackNavigator({
  initialRouteName: 'HomeScreen',
  screens: {
    HomeScreen: HomeNavigator,
    User: UserNavigator,
    Wallet: WalletNavigator,
  },
  screenOptions: {
    headerShown: false,
  },
});

export default ProtectedNavigator;
