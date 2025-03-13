// /dependencies
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

const ProfileTabBar = ({focused}: {focused: boolean}) => {
  return focused ? <ProfileIconFilled /> : <ProfileIcon />;
};

const WalletTabBar = ({focused}: {focused: boolean}) => {
  return focused ? <WalletIconFilled /> : <WalletIcon />;
};

const RentTabBar = ({focused}: {focused: boolean}) => {
  return focused ? <RentScooterIconFilled /> : <RentScooterIcon />;
};

const HomeNavigator = createBottomTabNavigator({
  initialRouteName: 'rent',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    wallet: {
      screen: WalletScreen,
      options: {
        tabBarIcon: ({focused}) => <WalletTabBar focused={focused} />,
      },
    },
    rent: {
      screen: RentScreen,
      options: {
        tabBarIcon: ({focused}) => <RentTabBar focused={focused} />,
      },
    },
    profile: {
      screen: UserScreen,
      options: {
        tabBarIcon: ({focused}) => <ProfileTabBar focused={focused} />,
      },
    },
  },
});

export default HomeNavigator;
