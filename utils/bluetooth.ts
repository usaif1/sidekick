import {BleManager} from 'react-native-ble-plx';
import {PermissionsAndroid, Platform} from 'react-native';
import {Buffer} from 'buffer';

const bleManager = new BleManager();

interface ManufacturerData {
  manufacturerId: number;
  payload: Buffer;
}

// Decode manufacturer data
export function decodeManufacturerData(
  base64String: string,
): ManufacturerData | null {
  if (!base64String) {
    return null;
  }

  const buffer = Buffer.from(base64String, 'base64');

  const manufacturerId = buffer.readUInt16LE(0); // First two bytes
  const payload = buffer.slice(2); // Remaining bytes after manufacturerId

  return {
    manufacturerId,
    payload,
  };
}

// Request permissions
export async function requestBluetoothAndLocationPermissions(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const grantedConnect = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    );
    const grantedScan = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    );
    const grantedLocation = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (grantedConnect && grantedScan && grantedLocation) {
      return true;
    }

    const permissions = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);

    const allGranted = Object.values(permissions).every(
      status => status === PermissionsAndroid.RESULTS.GRANTED,
    );

    return allGranted;
  } catch (error) {
    console.warn('Permission error', error);
    return false;
  }
}

// Check if the payload matches your FMB930
function isTargetDeviceByManufacturerData(payloadBuffer: Buffer): boolean {
  if (!payloadBuffer) {
    return false;
  }

  const deviceType = payloadBuffer.readUInt8(0);
  const deviceSubtype = payloadBuffer.readUInt8(1);

  // Example: Match device type + subtype
  if (deviceType === 1 && deviceSubtype === 9) {
    const deviceUniqueId = payloadBuffer.slice(4, 20).toString('hex');
    console.log('Potential Device ID:', deviceUniqueId);

    // Further validation can be added here
    return true;
  }

  return false;
}

// Main function to start BLE scan
export async function ensureBluetoothOnAndScan() {
  const hasPermission = await requestBluetoothAndLocationPermissions();

  if (!hasPermission) {
    console.log('No Bluetooth permission');
    return;
  }

  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error('Scan error', error);
      return;
    }

    if (device) {
      console.log('device', device);
      const decoded = decodeManufacturerData(device.manufacturerData || '');
      console.log('decoded', decoded);

      if (decoded && isTargetDeviceByManufacturerData(decoded.payload)) {
        console.log('✅ Found my FMB930 based on manufacturerData');
        console.log(
          `Device Name: ${device.name || device.localName || 'Unknown'}`,
        );
        console.log(`Device ID: ${device.id}`);

        bleManager.stopDeviceScan();

        // Now you can connect to device.id if needed
        connectToDevice(device.id);
      }
    }
  });

  //   setTimeout(() => {
  //     console.log('Stopping scan after timeout...');
  //     bleManager.stopDeviceScan();
  //   }, 30000);
}

// Connect to a device
async function connectToDevice(deviceId: string) {
  try {
    console.log('➡ Trying to connect to device:', deviceId);

    const connectedDevice = await bleManager.connectToDevice(deviceId, {
      autoConnect: false, // ❗ Try disabling autoConnect for faster error detection
      timeout: 10000, // ❗ Optional timeout if library supports it (manual timeout better)
    });

    console.log(
      '✅ Connected to device:',
      connectedDevice.name || connectedDevice.localName || 'Unnamed',
    );

    await connectedDevice.discoverAllServicesAndCharacteristics();
    console.log('✅ Discovered services and characteristics.');

    const services = await connectedDevice.services();
    console.log('✅ Services:', services);

    for (const service of services) {
      const characteristics = await connectedDevice.characteristicsForService(
        service.uuid,
      );
      for (const characteristic of characteristics) {
        console.log('Characteristic:', characteristic.uuid);
      }
    }
  } catch (error) {
    console.error(
      '❌ Connection failed with error:',
      JSON.stringify(error, null, 2),
    );
  }
}
