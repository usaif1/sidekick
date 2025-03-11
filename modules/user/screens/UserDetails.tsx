import { View, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ProfileCard from '@/modules/user/components/ProfileCard';
import Menu from '@/modules/user/components/Menu';
import SupportModal from '@/modules/user/components/SupportModal';
import { useModal } from '@/components/Modal/ModalProvider';
import { useThemeStore } from '@/globalStore';
import CustomSafeArea from '@/wrappers/customSafeArea/CustomSafeArea';
import Divider from '@/components/Divider';

// You can import a profile image or use a require statement
// const profileImage = require('../assets/profile-image.jpg');

const UserDetails = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { showModal, hideModal } = useModal();
  const { colors } = useThemeStore(state => state.theme);
  
  // User data
  const userData = {
    name: "Christian Miller",
    email: "christian.miller@infosys.com",
    phone: "9876543210"
  };
  
  // Menu items with the notifications item using a switch
  const menuItems = [
    {
      icon: 'edit-2',
      label: 'Edit Profile',
      controlType: 'none' as const,
      onPress: () => navigation.navigate('Profile', { screen: 'EditProfile' }),
      testID: 'edit-profile-button'
    },
    {
      icon: 'bell',
      label: 'Show Notifications',
      controlType: 'switch' as const,
      isToggled: notificationsEnabled,
      onToggle: (value) => {
        setNotificationsEnabled(value);
        console.log('Notifications toggled:', value);
      },
      onPress: () => {}, // No-op since the switch handles the interaction
      testID: 'notifications-button'
    },
    {
      icon: 'help-circle',
      label: 'Need Help?',
      controlType: 'none' as const,
      onPress: () => showModal(
        <SupportModal
          visible={true}
          onClose={hideModal}
          supportEmail="help@sidekick.com"
          emailSubject="Support Request from Sidekick App"
        />
      ),
      testID: 'help-button'
    }
  ];

  return (
    <CustomSafeArea>
      <View style={styles.container}>
        <ProfileCard
          fullName={userData.name}
          company="Infosys"
          totalMinutes={48}
          totalKilometers={2.9}
          // profileImage={profileImage} // Uncomment if you have a profile image
          style={styles.profileCard}
        />

        <Divider height={16} />
        
        <Menu 
          items={menuItems}
          style={styles.menu}
          testID="user-menu"
        />
      </View>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileCard: {
    marginBottom: 16,
  },
  menu: {
    marginHorizontal: 16,
  }
});

export default UserDetails;
