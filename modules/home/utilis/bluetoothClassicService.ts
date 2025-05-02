import {PermissionsAndroid, Platform, Alert, Linking} from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice,
} from 'react-native-bluetooth-classic';
import {Buffer} from 'buffer';

/**
 * Requests all necessary permissions for Bluetooth Classic
 */
export const requestBluetoothPermissions = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);

    const allGranted = Object.values(granted).every(
      status => status === PermissionsAndroid.RESULTS.GRANTED,
    );

    if (!allGranted) {
      Alert.alert(
        'Permissions Denied',
        'Please grant location and Bluetooth permissions.',
      );
    }

    return allGranted;
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

// export const sendRawHexCommand = async (
//   device: BluetoothDevice,
//   hexString: string, // e.g. '464D4258AAAAAAA...'
// ) => {
//   try {
//     // Convert hex string to binary Buffer
//     const buffer = Buffer.from(hexString.replace(/\s+/g, ''), 'hex'); // remove spaces if present

//     // Send binary buffer over Bluetooth
//     const result = await device.write(buffer.toString('latin1')); // latin1 ensures byte-level accuracy
//     console.log('Raw hex sent:', hexString);
//     device.onDataReceived(data => console.log('Scooter response:', data));
//     return result;
//   } catch (err) {
//     console.error('Failed to send raw hex command:', err);
//     return false;
//   }
// };

// const hexToBytes = (hex: string): number[] => {
//   return (
//     hex
//       .replace(/\s+/g, '') // Remove spaces
//       .match(/.{1,2}/g) // Split into 2-char chunks
//       ?.map(byte => parseInt(byte, 16)) || []
//   );
// };

export const sendRawHexBytes = async (
  device: BluetoothDevice,
  command: string,
) => {
  try {
    const hexString = command; //'464D4258AAAAAAAA002E000200010EA8';
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
      bytes.push(parseInt(hexString.substring(i, i + 2), 16));
    }
    const byteArray = new Uint8Array(bytes);
    // or, using Buffer (if available in your environment):
    const buffer = Buffer.from(hexString, 'hex');

    // Hex string without spaces
    // const hex = '464D4258AAAAAAAA002E000200010EA8'.replace(/\s+/g, '');

    // Convert hex string into Buffer
    // const byteBuffer = Buffer.from(hex, 'hex');

    // Convert byte buffer into Latin-1 encoded string (1 char = 1 byte)
    // const byteString = byteBuffer.toString('latin1');

    device
      .write(buffer)
      .then(result => {
        console.log('result', result);
        // Data sent successfully
      })
      .catch(error => {
        console.log('error', error);
        // Handle write error
      });

    // Send to device
    // const success = await device.write(byteString);

    // console.log('Sent raw hex bytes:', byteBuffer);
    // return success;
  } catch (err) {
    console.error('Failed to send hex bytes:', err);
    return false;
  }
};

/**
 * Tries to get Bluetooth + Location-based available devices
 */
export const discoverDevices = async (): Promise<BluetoothDevice[]> => {
  console.log('Search for devices started');
  try {
    const hasPermission = await requestBluetoothPermissions();
    if (!hasPermission) return [];

    const isBluetoothOn = await RNBluetoothClassic.isBluetoothEnabled();
    if (!isBluetoothOn) {
      await RNBluetoothClassic.requestBluetoothEnabled();
    }

    // ✅ Attempt discovery (this requires Location Services ON too)
    const discoveredDevices = await RNBluetoothClassic.startDiscovery();
    // const allDevices = [...bonded, ...discoveredDevices];
    console.log('discoveredDevices', discoveredDevices);

    const bonded = await RNBluetoothClassic.getBondedDevices();
    console.log('bonded devices', bonded);

    const bondedSidekick = bonded.find(device => device.name === 'sidekick');

    if (bondedSidekick) {
      console.log('bondedSidekick', bondedSidekick);

      bondedSidekick.connect()?.then(async () => {
        const startCommand = '464D4258AAAAAAAA002E000200010EA8';
        const stopCommand = '464D4258AAAAAAAA002E00020000CE69 ';

        sendRawHexBytes(bondedSidekick, startCommand);

        setTimeout(() => {
          sendRawHexBytes(bondedSidekick, stopCommand);
        }, 10000);

        // bondedSidekick.onDataReceived(data => {
        //   console.log('Scooter response:', data);
        // });

        // const resp = await bondedSidekick.write(
        //   encodedCommand.toString('base64'),
        // );

        // console.log('resp', resp);
      });

      return discoveredDevices;
    }

    const sidekickScooter = discoveredDevices.find(
      device => device.name === 'sidekick',
    );

    console.log('sidekickScooter', sidekickScooter);

    const connection = await sidekickScooter?.connect();

    console.log('connectionStatus', connection);

    const command = 'setdigout 1 60\r\n';
    const resp2 = await sidekickScooter?.write(command);

    console.log('resp2', resp2);

    return discoveredDevices;
  } catch (err: any) {
    console.error('Error during discovery:', err);

    // Special handling for geolocation timeout / ACTIVITY_NULL
    if (err.message?.includes('Location') || err.code === 3 || err.code === 4) {
      Alert.alert(
        'Location Issue',
        'Bluetooth discovery needs location services. Please enable location and try again.',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
      );
    } else {
      Alert.alert('Discovery Error', err.message || 'Unknown error');
    }

    return [];
  }
};
