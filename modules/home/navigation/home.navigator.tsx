// /dependencies
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

// navigators
// import UserNavigator from '@/modules/user/navigation/user.navigator';
// import WalletNavigator from '@/modules/wallet/navigation/wallet.navigator';

// screens
import RentScreen from '../screens/RentScreen';
import WalletScreen from '@/modules/wallet/screens/WalletScreen';
import UserScreen from '@/modules/user/screens/UserDetails';

// assets
import RentScooterIcon from '../assets/rentScooterIcon.svg';
import RentScooterIconFilled from '../assets/rentScooterIconFilled.svg';
import WalletIcon from '../assets/walletIcon.svg';
import WalletIconFilled from '../assets/walletIconFilled.svg';
import ProfileIcon from '../assets/profileIcon.svg';
import ProfileIconFilled from '../assets/profileIconFilled.svg';

// store
import {useThemeStore} from '@/globalStore';

const Tab = createBottomTabNavigator();

const TabBarLabel = ({focused, title}: {focused: boolean; title: string}) => {
  const {colors} = useThemeStore(state => state.theme);

  return (
    <Text
      style={{
        color: focused ? colors.highlight : colors.textSecondary,
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 10,
        letterSpacing: 0,
        textAlign: 'center',
        paddingTop: 4,
      }}>
      {title}
    </Text>
  );
};

const HomeNavigator = () => {
  const {colors} = useThemeStore(state => state.theme);

  return (
    <Tab.Navigator
      initialRouteName="Rent"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 10,
          backgroundColor: colors.white,
        },
      }}
    >
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <>{focused ? <WalletIconFilled /> : <WalletIcon />}</>;
          },
          tabBarLabel: ({focused}) => {
            return <TabBarLabel focused={focused} title="Wallet" />;
          },
        }}
      />
      <Tab.Screen
        name="Rent"
        component={RentScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <>{focused ? <RentScooterIconFilled /> : <RentScooterIcon />}</>;
          },
          tabBarLabel: ({focused}) => {
            return <TabBarLabel focused={focused} title="Rent" />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return <>{focused ? <ProfileIconFilled /> : <ProfileIcon />}</>;
          },
          tabBarLabel: ({focused}) => {
            return <TabBarLabel focused={focused} title="Profile" />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
