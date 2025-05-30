import {
  check,
  request,
  openSettings,
  RESULTS,
  Permission,
  PERMISSIONS,
} from 'react-native-permissions';
import {Platform, Alert, Linking} from 'react-native';
import {showToast} from '@/components';

// Type alias for possible result states
type PermissionResult = 'granted' | 'denied' | 'blocked' | 'unavailable';

/**
 * Generic permission handler with UI prompt if blocked.
 */
export async function ensurePermission(
  permission: Permission,
  label: string,
): Promise<boolean> {
  let result = await check(permission);

  if (result === RESULTS.DENIED) {
    result = await request(permission);
  }

  if (result === RESULTS.GRANTED) {
    return true;
  }

  if (result === RESULTS.BLOCKED) {
    Alert.alert(
      `${label} Permission Required`,
      `${label} access is blocked. Please enable it in Settings.`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Open Settings', onPress: () => openSettings()},
      ],
    );
  }

  return false;
}

/**
 * Ensures Bluetooth and related permissions are granted.
 */
export async function ensureBluetoothPermissions(): Promise<boolean> {
  try {
    if (Platform.OS === 'android') {
      // Android BLE requires both Bluetooth and Location (especially < Android 12)
      const locationPermission = await ensurePermission(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        'Location',
      );

      const scanPermission = await ensurePermission(
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        'Bluetooth Scan',
      );

      const connectPermission = await ensurePermission(
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        'Bluetooth Connect',
      );

      const result = scanPermission && connectPermission && locationPermission;
      return result;
    } else if (Platform.OS === 'ios') {
      // For iOS, use the correct enum
      const bluetoothPermission = await ensurePermission(
        PERMISSIONS.IOS.BLUETOOTH,
        'Bluetooth',
      );

      return bluetoothPermission;
    }

    return false;
  } catch (error) {
    console.error('Error ensuring Bluetooth permissions:', error);
    showToast({
      type: 'error',
      text1: 'Permission Error',
      text2: 'Failed to check Bluetooth permissions',
    });
    return false;
  }
}

/**
 * Prompts the user to manually enable Bluetooth via system settings.
 */
export const promptEnableBluetooth = () => {
  Alert.alert(
    'Bluetooth Required',
    'Please turn on Bluetooth to connect to your device.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Open Settings',
        onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('App-Prefs:'); // safest fallback for iOS
          } else {
            Linking.openSettings(); // Android
          }
        },
      },
    ],
    {cancelable: false},
  );
};

/**
 * Optional wrapper with toast & better error handling.
 */
export async function checkAndRequestPermission(
  permission: Permission,
  label: string,
  showAlert: boolean = true,
): Promise<boolean> {
  try {
    let result = await check(permission);

    if (result === RESULTS.GRANTED) return true;

    if (result === RESULTS.DENIED) {
      result = await request(permission);
      if (result === RESULTS.GRANTED) return true;
    }

    if (result === RESULTS.BLOCKED && showAlert) {
      Alert.alert(
        `${label} Permission Required`,
        `${label} access is permanently denied. Please enable it in Settings to continue.`,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => openSettings()},
        ],
      );
    } else if (result === RESULTS.UNAVAILABLE && showAlert) {
      showToast({
        type: 'error',
        text1: 'Feature Unavailable',
        text2: `${label} is not available on this device`,
      });
    }

    return false;
  } catch (error) {
    console.error(`Error checking ${label} permission:`, error);
    if (showAlert) {
      showToast({
        type: 'error',
        text1: 'Permission Error',
        text2: `Failed to check ${label} permission`,
      });
    }
    return false;
  }
}
