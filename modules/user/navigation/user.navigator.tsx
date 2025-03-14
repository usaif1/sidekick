// dependencies
import {Platform} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import {EditProfile, UserDetails} from '../screens';

// components
import {BackArrowButton} from '@/components';

const UserNavigator = createNativeStackNavigator({
  initialRouteName: 'UserDetails',
  screenOptions: {
    presentation: Platform.OS === 'android' ? 'transparentModal' : 'card',
  },
  screens: {
    UserDetails: {
      screen: UserDetails,
      options: {
        title: 'User Details',
        headerShadowVisible: false,
      },
    },
    EditProfile: {
      screen: EditProfile,
      options: {
        title: '',
        headerLeft: () => <BackArrowButton title="Edit Profile" />,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});

export default UserNavigator;
