// dependencies
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// components
import ProfileCard from '@/modules/user/components/ProfileCard';
import Menu from '@/modules/user/components/Menu';
import SupportModal from '@/modules/user/components/SupportModal';
import {useModal} from '@/components/Modal/ModalProvider';
import Divider from '@/components/Divider';
import Profile from '../assets/profile.svg';
import Notification from '../assets/notification.svg';
import Help from '../assets/help.svg';
import {useThemeStore} from '@/globalStore';
import userStore from '../store';

const {colors} = useThemeStore.getState().theme;

const UserDetails: React.FC = () => {
  const navigation = useNavigation();
  const {showModal, hideModal} = useModal();
  
  // Get user data and actions from store
  const profile = userStore.use.profile();
  const usageStats = userStore.use.usageStats();
  const notificationsEnabled = userStore.use.settings().notificationsEnabled;
  const toggleNotifications = userStore.use.toggleNotifications();

  // Menu items with the notifications item using a switch
  const menuItems = [
    {
      icon: Profile,
      label: 'Edit Profile',
      controlType: 'none' as const,
      // @ts-ignore
      onPress: () => navigation.navigate('user', {
        screen: 'EditProfile',
        params: {
          initialName: profile.name,
          initialEmail: profile.email,
          initialPhone: profile.phone
        }
      }),
      testID: 'edit-profile-button',
    },
    {
      icon: Notification,
      label: 'Show Notifications',
      controlType: 'switch' as const,
      isToggled: notificationsEnabled,
      // @ts-ignore
      onToggle: (value) => {
        toggleNotifications(value);
      },
      onPress: () => {}, // No-op since the switch handles the interaction
      testID: 'notifications-button',
    },
    {
      icon: Help,
      label: 'Need Help?',
      controlType: 'none' as const,
      onPress: () =>
        showModal(
          <SupportModal
            visible={true}
            onClose={hideModal}
            supportEmail="help@sidekick.com"
            emailSubject="Support Request from Sidekick App"
          />,
        ),
      testID: 'help-button',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProfileCard
          fullName={profile.name}
          company={profile.company}
          totalMinutes={usageStats.totalMinutes}
          totalKilometers={usageStats.totalKilometers}
          // profileImage={profileImage} // Uncomment if you have a profile image
          style={styles.profileCard}
        />

        <Divider height={16} />

        <Menu items={menuItems} style={styles.menu} testID="user-menu" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.appBaseBg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileCard: {
    marginBottom: 16,
  },
  menu: {
    marginHorizontal: 16,
  },
});

export default UserDetails;
