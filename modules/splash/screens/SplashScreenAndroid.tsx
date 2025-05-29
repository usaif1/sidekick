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
import {BleManager, Characteristic, Device} from 'react-native-ble-plx';
import {Buffer, WithImplicitCoercion} from 'buffer';
import {config} from '@/config';

export const bleManager = new BleManager();

const DEVICE_NAME = 'pico0s_d8bc386a35ea';
const REQUIRED_SERVICE_UUID = '180a';
const REQUIRED_CHARACTERISTIC_UUID = '1101';
const decryptEndpoint = `${config.prodEndpoint}/solve`;

const turnOnCommand = '#conf_set out_cnf dout_1=1 conf_sync conf_save\r\n';
const turnOffCommand = '#conf_set out_cnf dout_1=0 conf_sync conf_save\r\n';

function sendCustomCommand(
  characteristic: Characteristic,
  commandString: WithImplicitCoercion<string>,
) {
  const buffer = Buffer.from(commandString, 'utf-8').toString('base64');
  characteristic.writeWithoutResponse(buffer);
}

function extractToken(base64Str: string) {
  console.log('received token', base64Str);
  try {
    const decoded = Buffer.from(base64Str, 'base64').toString('utf-8');
    const match = decoded.match(/#solve\s+(\S+)/);
    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error('Token not found in decoded string');
    }
  } catch (error) {
    // @ts-ignore
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
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  const handleStartScan = async (command: string) => {
    const permission = await requestPermissions();
    if (!permission) {
      Alert.alert('Permissions required', 'BLE permissions not granted');
      return;
    }

    bleManager.startDeviceScan(null, null, async (error, foundDevice) => {
      console.log('foundDevice', foundDevice);
      if (error) {
        console.error('[BLE] Scan error:', error);
        return;
      }

      if (foundDevice?.name?.includes(DEVICE_NAME)) {
        setConnectedDevice(foundDevice);
        bleManager.stopDeviceScan();
        console.log('✅ Device found:', foundDevice);

        foundDevice
          .connect()
          .then(device => {
            device
              .discoverAllServicesAndCharacteristics()
              .then(async services => {
                console.log('✅ all services:', services);

                // Android-only: increase MTU before any long Write No Rsp
                if (Platform.OS === 'android') {
                  console.log('requesting MTU');
                  await device.requestMTU(247); // ➊ bump MTU right after connect
                }

                if (!services?.serviceUUIDs) {
                  console.log('no services found');
                  return;
                }

                const requiredServiceUUID = services.serviceUUIDs.find(
                  service => {
                    return service.includes(REQUIRED_SERVICE_UUID);
                  },
                );

                if (!requiredServiceUUID) {
                  console.log('no required service found');
                  return;
                }

                console.log('requiredServiceUUID', requiredServiceUUID);

                services
                  .characteristicsForService(requiredServiceUUID as string)
                  .then(async characteristics => {
                    console.log('✅ characteristics:', characteristics);

                    const requiredCharacteristic = characteristics.find(
                      characteristic => {
                        return characteristic.uuid.includes(
                          REQUIRED_CHARACTERISTIC_UUID,
                        );
                      },
                    );

                    console.log(
                      'requiredCharacteristic',
                      requiredCharacteristic,
                    );

                    if (!requiredCharacteristic) {
                      console.log('no required characteristic found');
                      return;
                    }

                    device.monitorCharacteristicForService(
                      requiredServiceUUID,
                      requiredCharacteristic.uuid,
                      async (error, currentChar) => {
                        console.log('currentChar', currentChar);
                        if (error) {
                          console.error('error monitoring currentChar', error);

                          return;
                        }

                        if (!currentChar?.value) {
                          console.log('no value found');
                          return;
                        }

                        const decodedToken = extractToken(currentChar.value);
                        console.log('decodedToken', decodedToken);

                        if (!decodedToken) {
                          console.log('no token found');
                          return;
                        }

                        if (decodedToken === 'success') {
                          sendCustomCommand(currentChar, command);
                          device.cancelConnection();
                          return;
                        }

                        try {
                          const response = await axios.get(decryptEndpoint, {
                            params: {
                              token: decodedToken,
                            },
                          });

                          console.log('response', response);

                          const stringCommand = response.data.command;
                          const command = Buffer.from(
                            stringCommand,
                            'utf-8',
                          ).toString('base64');

                          console.log('command', command);

                          currentChar.writeWithoutResponse(command);

                          // setTimeout(() => {
                          //   sendCustomCommand(currentChar, command);
                          // }, 200);
                        } catch (error) {
                          console.error(
                            'error getting command from token',
                            error,
                          );
                        }
                      },
                    );
                  })
                  .catch(error => {
                    console.error('error finding characteristics', error);
                  });
              })
              .catch(error => {
                console.error('error finding services', error);
              });
          })
          .catch(error => {
            console.error('error connecting to foundevice', error);
          });

        foundDevice.onDisconnected(error => {
          console.log('foundDevice disconnected', error);
        });
      }

      setTimeout(() => {
        bleManager.stopDeviceScan();
      }, 5000);
    });
  };

  const handleStopScan = () => {
    bleManager.stopDeviceScan();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BLE Control</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={() => handleStartScan(turnOnCommand)}>
          <Text style={styles.buttonText}>Turn On</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.success]}
          onPress={() => handleStartScan(turnOffCommand)}>
          <Text style={styles.buttonText}>Turn Off</Text>
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
