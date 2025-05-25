import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {BleManager, Characteristic} from 'react-native-ble-plx';
import {Buffer, WithImplicitCoercion} from 'buffer';

export const bleManager = new BleManager();

function sendCustomCommand(
  characteristic: Characteristic,
  commandString: WithImplicitCoercion<string>,
) {
  const buffer = Buffer.from(commandString, 'utf-8').toString('base64');
  characteristic.writeWithoutResponse(buffer);
}

function extractToken(base64Str: string) {
  try {
    const decoded = Buffer.from(base64Str, 'base64').toString('utf-8');
    const match = decoded.match(/#solve\s+(\S+)/);
    console.log('match', match);
    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error('Token not found in decoded string');
    }
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
}

async function requestPermissions() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]);
    const allGranted = Object.values(granted).every(g => g === 'granted');
    return allGranted;
  }
  return true; // iOS auto-prompts on scan
}

const BLEControlScreen: React.FC = () => {
  const [deviceConnected, setDeviceConnected] = useState(null);

  const handleStartScan = async () => {
    const permission = await requestPermissions();
    if (!permission) {
      Alert.alert('Permissions required', 'BLE permissions not granted');
      return;
    }

    bleManager.startDeviceScan(null, null, async (error, device) => {
      console.log('device', device);
      if (error) {
        console.error('[BLE] Scan error:', error);
        return;
      }

      if (device?.localName?.includes('pico0s_d8bc386a35ea')) {
        bleManager.stopDeviceScan();
        console.log('✅ Device found:', device.name);
        console.log('device', device);

        device
          .connect()
          .then(connectedDevice => {
            console.log('connectedDevice', connectedDevice);

            connectedDevice.onDisconnected(() => {
              console.log('disconnected');
            });

            connectedDevice
              .discoverAllServicesAndCharacteristics()
              .then(services => {
                console.log('services', services.serviceUUIDs[0]);

                services
                  .characteristicsForService(services.serviceUUIDs[0])
                  .then(chars => {
                    console.log('chars', chars);

                    const requiredChar = chars.find(char => {
                      console.log('char', char);
                      return char.uuid.includes('1101');
                    });

                    console.log('requiredChar', requiredChar);

                    requiredChar?.monitor((monitorError, listener) => {
                      if (monitorError || !listener?.value) {
                        console.error('Monitor error:', monitorError);
                        return;
                      }

                      console.log('listener', listener);

                      const decoded = Buffer.from(
                        listener.value,
                        'base64',
                      ).toString('utf-8');

                      console.log('decoded', decoded);

                      if (
                        decoded.includes('solve success') ||
                        decoded.includes('solve failed')
                      ) {
                        console.log('✅ RESULT:', decoded);

                        sendCustomCommand(
                          requiredChar,
                          '#conf_set out_cnf dout_1=1 conf_sync conf_save\r\n',
                        );
                        return;
                      }

                      const decryptedToken = extractToken(listener.value);
                      if (!decryptedToken) return;

                      axios
                        .get('http://1.6.0.40:3000/', {
                          params: {token: decryptedToken},
                        })
                        .then(response => {
                          const hexHash = response.data.hash;
                          console.log('hexHash', hexHash);
                          const command = Buffer.from(
                            hexHash,
                            'utf-8',
                          ).toString('base64');

                          console.log('command', command);

                          requiredChar
                            .writeWithoutResponse(command)
                            .then(() => {
                              console.log('✅ Command written');
                            })
                            .catch(err =>
                              console.error('❌ Write error:', err?.message),
                            );
                        });
                    });
                  })
                  .catch(err => {
                    console.log('no chars found', err);
                  });
              })
              .catch(err => {
                console.log('no services found', err);
              });
          })
          .catch(error);

        return;
      }
    });

    console.log('Start Scan clicked');
  };

  const handleStopScan = () => {
    bleManager.stopDeviceScan();
    console.log('Scan stopped');
  };

  const handleDisconnect = async () => {
    if (deviceConnected) {
      try {
        await deviceConnected.cancelConnection();
        console.log('🔌 Disconnected');
        setDeviceConnected(null);
      } catch (err) {
        console.error('❌ Disconnect error:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BLE Control</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={handleStartScan}>
          <Text style={styles.buttonText}>Start Scan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.danger]}
          onPress={handleStopScan}>
          <Text style={styles.buttonText}>Stop Scan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.success]}
          onPress={() => Alert.alert('Already handled in scan')}>
          <Text style={styles.buttonText}>Connect</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.warning]}
          onPress={handleDisconnect}>
          <Text style={styles.buttonText}>Disconnect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  primary: {
    backgroundColor: '#2196F3',
  },
  danger: {
    backgroundColor: '#F44336',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  warning: {
    backgroundColor: '#FF9800',
  },
});

export default BLEControlScreen;
