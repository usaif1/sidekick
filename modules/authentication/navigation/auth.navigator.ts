// dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import {Login} from '../screens';

const AuthStack = createNativeStackNavigator({
  screens: {
    Login: Login,
  },
});

export default AuthStack;
