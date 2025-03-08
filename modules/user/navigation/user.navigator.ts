// /dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import UserDetails from '../screens/UserDetails';

const HomeNavigator = createNativeStackNavigator({
  screens: {
    UserDeets: UserDetails,
  },
  screenOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerShadowVisible: false,
    title: '',
  },
});

export default HomeNavigator;
