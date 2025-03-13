// dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// navigators
import HomeNavigator from '@/modules/home/navigation/home.navigator';
import UserNavigator from '@/modules/user/navigation/user.navigator';
import WalletNavigator from '@/modules/wallet/navigation/wallet.navigator';

const ProtectedNavigator = createNativeStackNavigator({
  initialRouteName: 'home',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    home: {
      screen: HomeNavigator,
    },
    user: {
      screen: UserNavigator,
    },
    wallet: {
      screen: WalletNavigator,
    },
  },
});

export default ProtectedNavigator;
