import React, {useState} from 'react';
import {Pressable, View, ViewStyle} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {BluetoothDevice} from 'react-native-bluetooth-classic';

import {useThemeStore} from '@/globalStore';
import NearestHubIcon from '../../../assets/nearestHubIcon.svg';
import ScanIcon from '../../../assets/scanIcon.svg';
import {ButtonSmall, ButtonWithIcon, Divider} from '@/components';
import {rideScooterService} from '@/globalService';
import {discoverDevices} from '../../../utilis/bluetoothClassicService';

type Props = {
  containerStyles: ViewStyle;
  handleOpenModal: () => void;
  onSelectNearestHub: () => void;
};

const {
  theme: {colors},
} = useThemeStore.getState();

const ActionButtons: React.FC<Props> = ({
  containerStyles,
  handleOpenModal,
  onSelectNearestHub,
}) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);

  const handleScanAndConnect = async () => {
    const bondedDevices = await discoverDevices();
    // setDevices(bondedDevices);

    // if (bondedDevices.length === 0) {
    //   console.log('No bonded devices found');
    //   return;
    // }

    // const firstDevice = bondedDevices[0]; // Replace with UI selection if needed
    // await connectToDevice(firstDevice);
  };

  return (
    <View style={[containerStyles]}>
      <Pressable
        onPress={onSelectNearestHub}
        style={styles.nearestHubContainer}>
        <NearestHubIcon />
        <ButtonSmall
          onPress={() => {
            rideScooterService.stopScooter('6310215');
          }}
          textColor="highlight">
          Nearest Hub
        </ButtonSmall>
      </Pressable>
      <Divider height={3.2} />
      <ButtonWithIcon
        variant="primary"
        onPress={handleScanAndConnect}
        IconComponent={ScanIcon}>
        Unlock
      </ButtonWithIcon>
    </View>
  );
};

export default ActionButtons;

const styles = ScaledSheet.create({
  nearestHubContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: '19@ms',
    paddingVertical: '8@ms',
    borderRadius: 23,
    columnGap: 10,
  },
});
