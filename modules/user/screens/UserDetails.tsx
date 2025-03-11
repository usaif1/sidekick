import {View, Text, Button, StyleSheet} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import ProfileCard from '@/modules/user/components/ProfileCard';
import Menu from '@/modules/user/components/Menu';
import SupportModal from '@/modules/user/components/SupportModal';
import { useModal } from '@/components/Modal/ModalProvider';

type Props = {};

const UserDetails = (props: Props) => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { showModal, hideModal } = useModal();
  
  // User data that would be passed to the EditProfile screen
  const userData = {
    name: "Christian Miller",
    email: "christian.miller@infosys.com",
    phone: "9876543210"
  };
  
  // Menu items with the notifications item using a switch
  const menuItems = [
    {
      icon: 'edit',
      label: 'Edit Profile',
      controlType: 'none' as const,
      onPress: () => navigation.navigate('EditProfile'),
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
    <View style={styles.container}>
      <Text style={styles.title}>UserDetails</Text>
      
      <ProfileCard
        fullName={userData.name}
        company="Infosys"
        totalMinutes={48}
        totalKilometers={2.9}
        // onPress={() => console.log('Card pressed')}
        // onAvatarPress={() => console.log('Avatar pressed')}
        style={styles.profileCard}
      />
      
      {/* Menu component with switch for notifications */}
      <Menu 
        items={menuItems}
        style={styles.menu}
        testID="user-menu"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileCard: {
    marginVertical: 16,
  },
  menu: {
    marginTop: 16,
  }
});

export default UserDetails;
