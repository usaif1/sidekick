// dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// navigators
import HomeNavigator from '@/modules/home/navigation/home.navigator';
import UserNavigator from '@/modules/user/navigation/user.navigator';

const ProtectedNavigator = createNativeStackNavigator({
  initialRouteName: 'HomeScreen',
  screens: {
    HomeScreen: HomeNavigator,
    User: UserNavigator,
  },
  screenOptions: {
    headerShown: false,
  },
});

export default ProtectedNavigator;
