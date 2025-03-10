// dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// navigators
import HomeNavigator from '@/modules/home/navigation/home.navigator';
import UserNavigator from '@/modules/user/navigation/user.navigator';


const ProtectedNavigator = createNativeStackNavigator({
  initialRouteName: 'home',
  screens: {
    home: HomeNavigator,
    user: UserNavigator,
  },
  screenOptions: {
    headerShown: false,
  },
});

export default ProtectedNavigator;
