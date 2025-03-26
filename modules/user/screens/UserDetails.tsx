// dependencies
import {View, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

// service
import {AuthService, UserService} from '@/globalService';

// store
import {useGlobalStore, useThemeStore, useUserStore} from '@/globalStore';

// components
import ProfileCard from '@/modules/user/components/ProfileCard';
import Menu from '@/modules/user/components/Menu';
import Divider from '@/components/Divider';
import Profile from '../assets/profile.svg';
import Notification from '../assets/notification.svg';
import Help from '../assets/help.svg';
import {ButtonText, GlobalModal,showToast} from '@/components';
import NeedHelp from '@/modules/user/components/NeedHelp';

const {colors} = useThemeStore.getState().theme;

const UserDetails: React.FC = () => {
  const {user} = useUserStore();
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const {openModal, setModalComponent, closeBottomSheet} = useGlobalStore();

  // User data
  const userData = user;

  // Menu items with the notifications item using a switch
  const menuItems = [
    {
      icon: Profile,
      label: 'Edit Profile',
      controlType: 'none' as const,
      // @ts-ignore
      onPress: () => navigation.navigate('user', {screen: 'EditProfile'}),
      testID: 'edit-profile-button',
    },
    {
      icon: Notification,
      label: 'Show Notifications',
      controlType: 'switch' as const,
      isToggled: notificationsEnabled,
      // @ts-ignore
      onToggle: value => {
        showToast({
          type: 'success',
          text1: 'Notifications ' + (value ? 'enabled' : 'disabled'),
          position: 'top',
        });
        setNotificationsEnabled(value);
      },
      onPress: () => {}, // No-op since the switch handles the interaction
      testID: 'notifications-button',
    },
    {
      icon: Help,
      label: 'Need Help?',
      controlType: 'none' as const,
      onPress: () => {
        setModalComponent(NeedHelp);
        openModal();
      },
      testID: 'help-button',
    },
  ];

  useFocusEffect(
    useCallback(() => {
      closeBottomSheet();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    UserService.fetchUserDetails();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProfileCard
          fullName={userData?.full_name as string}
          company={
            userData?.user_organizations?.length
              ? userData?.user_organizations[0].organization?.name
              : ''
          }
          totalMinutes={48}
          totalKilometers={2.9}
          // profileImage={profileImage} // Uncomment if you have a profile image
          style={styles.profileCard}
        />

        <Divider height={16} />

        <Menu items={menuItems} style={styles.menu} testID="user-menu" />
      </View>

      <View style={{width: 200, alignSelf: 'center'}}>
        <ButtonText
          variant="error"
          onPress={() => {
            AuthService.signOut();
          }}>
          Logout
        </ButtonText>
      </View>

      <GlobalModal />
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
