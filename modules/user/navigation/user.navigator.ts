// /dependencies
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Stack} from 

// screens
import UserDetails from '../screens/UserDetails';
import EditProfile from '../screens/EditProfile';

const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
        title: '',
      }}
    >
      <Stack.Screen name="UserDeets" component={UserDetails} />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfile} 
        options={{ headerShown: false }} // We're handling the header in the component
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
