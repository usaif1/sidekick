import {showToast} from '@/components';
import {config} from '@/config';
import {Platform} from 'react-native';
import {BleManager, Characteristic, Device} from 'react-native-ble-plx';
import {Buffer, WithImplicitCoercion} from 'buffer';
import axios from 'axios';

const REQUIRED_SERVICE_UUID = '180a';
const REQUIRED_CHARACTERISTIC_UUID = '1101';
const decryptEndpoint = `${config.prodEndpoint}/solve`;

const turnOnCommand = '#conf_set out_cnf dout_1=1 conf_sync conf_save\r\n';
const turnOffCommand = '#conf_set out_cnf dout_1=0 conf_sync conf_save\r\n';
const pingCommand = '#conf_get out_cnf dout_1\r\n';

const bleManager = new BleManager();

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

export const BluetoothService = {
  // scan devices
  scanDevices: async (
    deviceName: string,
    callback: (device: Device) => void,
  ) => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      setTimeout(() => {
        bleManager.stopDeviceScan();
      }, 10000);
      if (error) {
        if (error?.message === 'BluetoothLE is powered off') {
          showToast({
            type: 'error',
            text1: 'Error',
            text2: 'Please turn on Bluetooth',
          });
        }

        console.log('Error scanning devices', error);

        return null;
      }

      console.log('device', device);

      if (device?.name === deviceName) {
        console.log('device found', device);
        bleManager.stopDeviceScan();
        callback(device);
        return device;
      }
    });

    return null;
  },

  // connect to device &&  start scooter
  startScooter: async (foundDevice: Device, successCallback: () => void) => {
    try {
      const connectedDevice = await foundDevice.connect();
      if (Platform.OS === 'android') {
        await connectedDevice.requestMTU(247);
      }

      console.log('connected to device =>', connectedDevice);

      const allServices =
        await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log('allServices', allServices);

      if (!allServices?.serviceUUIDs) {
        console.log('no services found');
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Error connecting to device',
        });
        return;
      }

      const requiredServiceUUID = allServices.serviceUUIDs.find(service => {
        return service.includes(REQUIRED_SERVICE_UUID);
      });

      if (!requiredServiceUUID) {
        console.log('no required service found');
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Error connecting to device',
        });
        return;
      }

      const requiredCharacteristic = (
        await allServices.characteristicsForService(requiredServiceUUID)
      ).find(characteristic => {
        return characteristic.uuid.includes(REQUIRED_CHARACTERISTIC_UUID);
      });

      if (!requiredCharacteristic) {
        console.log('no required characteristic found');
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Error connecting to device',
        });
        return;
      }

      connectedDevice.monitorCharacteristicForService(
        requiredServiceUUID,
        requiredCharacteristic.uuid,
        async (error, characteristic) => {
          if (error) {
            console.log('Error in monitoring characteristic', error);
            showToast({
              type: 'error',
              text1: 'Error',
              text2: 'Error connecting to device',
            });
            return;
          }

          console.log('characteristic', characteristic);
          if (!characteristic?.value) {
            console.log('no value found in characteristic');
            showToast({
              type: 'error',
              text1: 'Error',
              text2: 'Error connecting to device',
            });
            return;
          }

          if (!characteristic.value) {
            console.log('no value found in characteristic');
            // showToast({
            //   type: 'error',
            //   text1: 'Error',
            //   text2: 'Error connecting to device',
            // });
            return;
          }

          const decodedToken = extractToken(characteristic.value);
          console.log('token', decodedToken);

          if (!decodedToken) {
            console.log('no decoded token found');
            // showToast({
            //   type: 'error',
            //   text1: 'Error',
            //   text2: 'Error connecting to device',
            // });
            return;
          }

          //   if (decodedToken && decodedToken !== 'success') {
          //     console.log('auth failed', decodedToken);
          //     showToast({
          //       type: 'error',
          //       text1: 'Error',
          //       text2: 'Error connecting to device',
          //     });
          //     return;
          //   }

          if (decodedToken === 'success') {
            sendCustomCommand(characteristic, turnOnCommand);
            await connectedDevice.cancelConnection();
            // setTimeout(() => {
            //   sendCustomCommand(characteristic, pingCommand);
            // }, 1000);

            successCallback();
            return;
          }

          const response = await axios.get(decryptEndpoint, {
            params: {
              token: decodedToken,
            },
          });

          console.log('response from axios call', response);
          const stringCommand = response.data.command;

          const command = Buffer.from(stringCommand, 'utf-8').toString(
            'base64',
          );

          console.log('command', command);

          characteristic.writeWithoutResponse(command);
        },
      );

      return foundDevice;
    } catch (error) {
      console.log('Error connecting to device', error);
    }
  },

  // stop scooter
  stopScooter: async (foundDevice: Device, successCallback: () => void) => {
    try {
      const connectedDevice = await foundDevice.connect();
      if (Platform.OS === 'android') {
        await connectedDevice.requestMTU(247);
      }

      console.log('connected to device =>', connectedDevice);

      const allServices =
        await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log('allServices', allServices);

      if (!allServices?.serviceUUIDs) {
        console.log('no services found');
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Error connecting to device',
        });
        return;
      }

      const requiredServiceUUID = allServices.serviceUUIDs.find(service => {
        return service.includes(REQUIRED_SERVICE_UUID);
      });

      if (!requiredServiceUUID) {
        console.log('no required service found');
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Error connecting to device',
        });
        return;
      }

      const requiredCharacteristic = (
        await allServices.characteristicsForService(requiredServiceUUID)
      ).find(characteristic => {
        return characteristic.uuid.includes(REQUIRED_CHARACTERISTIC_UUID);
      });

      if (!requiredCharacteristic) {
        console.log('no required characteristic found');
        showToast({
          type: 'error',
          text1: 'Error',
          text2: 'Error connecting to device',
        });
        return;
      }

      connectedDevice.monitorCharacteristicForService(
        requiredServiceUUID,
        requiredCharacteristic.uuid,
        async (error, characteristic) => {
          if (error) {
            console.log('Error in monitoring characteristic', error);
            showToast({
              type: 'error',
              text1: 'Error',
              text2: 'Error connecting to device',
            });
            return;
          }

          console.log('characteristic', characteristic);
          if (!characteristic?.value) {
            console.log('no value found in characteristic');
            showToast({
              type: 'error',
              text1: 'Error',
              text2: 'Error connecting to device',
            });
            return;
          }

          if (!characteristic.value) {
            console.log('no value found in characteristic');
            showToast({
              type: 'error',
              text1: 'Error',
              text2: 'Error connecting to device',
            });
            return;
          }

          const decodedToken = extractToken(characteristic.value);
          console.log('token', decodedToken);

          if (!decodedToken) {
            console.log('no decoded token found');
            // showToast({
            //   type: 'error',
            //   text1: 'Error',
            //   text2: 'Error connecting to device',
            // });
            return;
          }

          //   if (decodedToken && decodedToken !== 'success') {
          //     console.log('auth failed', decodedToken);
          //     showToast({
          //       type: 'error',
          //       text1: 'Error',
          //       text2: 'Error connecting to device',
          //     });
          //     return;
          //   }

          if (decodedToken === 'success') {
            sendCustomCommand(characteristic, turnOffCommand);
            connectedDevice.cancelConnection();
            // setTimeout(() => {
            //   sendCustomCommand(characteristic, pingCommand);
            // }, 1000);

            successCallback();
            return;
          }

          const response = await axios.get(decryptEndpoint, {
            params: {
              token: decodedToken,
            },
          });

          console.log('response from axios call', response);
          const stringCommand = response.data.command;

          const command = Buffer.from(stringCommand, 'utf-8').toString(
            'base64',
          );

          console.log('command', command);

          characteristic.writeWithoutResponse(command);
        },
      );

      return foundDevice;
    } catch (error) {
      console.log('Error connecting to device', error);
    }
  },

  // disconnect from device
  disconnectFromDevice: async (deviceId: string) => {
    console.log('disconnectFromDevice', deviceId);
  },
};
