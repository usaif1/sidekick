// /dependencies
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

// screens
import RentScreen from '../screens/RentScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WalletScreen from '../screens/WalletScreen';

// assets
import RentScooterIcon from '../assets/rentScooterIcon.svg';
import RentScooterIconFilled from '../assets/rentScooterIconFilled.svg';
import WalletIcon from '../assets/walletIcon.svg';
import WalletIconFilled from '../assets/walletIconFilled.svg';
import ProfileIcon from '../assets/profileIcon.svg';
import ProfileIconFilled from '../assets/profileIconFilled.svg';

// store
import {useThemeStore} from '@/globalStore';

const theme = useThemeStore.getState().theme;

const TabBarLabel = ({focused, title}: {focused: boolean; title: string}) => {
  return (
    <Text
      style={{
        color: focused ? theme.colors.highlight : theme.colors.textSecondary,
        fontWeight: 600,
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

const HomeNavigator = createBottomTabNavigator({
  initialRouteName: 'Rent',
  screens: {
    Wallet: {
      screen: WalletScreen,
      options: {
        tabBarIcon: ({focused}) => {
          return <>{focused ? <WalletIconFilled /> : <WalletIcon />}</>;
        },
        tabBarLabel: ({focused}) => {
          return <TabBarLabel focused={focused} title="Wallet" />;
        },
      },
    },
    Rent: {
      screen: RentScreen,
      options: {
        tabBarIcon: ({focused}) => {
          return (
            <>{focused ? <RentScooterIconFilled /> : <RentScooterIcon />}</>
          );
        },
        tabBarLabel: ({focused}) => {
          return <TabBarLabel focused={focused} title="Rent" />;
        },
      },
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        tabBarIcon: ({focused}) => {
          return <>{focused ? <ProfileIconFilled /> : <ProfileIcon />}</>;
        },
        tabBarLabel: ({focused}) => {
          return <TabBarLabel focused={focused} title="Profile" />;
        },
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarStyle: {
      height: 90,
      paddingTop: 10,
    },
  },
});

export default HomeNavigator;
