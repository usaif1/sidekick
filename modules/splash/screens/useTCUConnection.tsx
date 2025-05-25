// -----------------------------------------------------------------------------
// useTcuBluetooth.ts – v2  (extra diagnostics + auto-retry when OperationRejected)
// -----------------------------------------------------------------------------
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  BleManager,
  Device,
  Characteristic,
  ConnectionPriority,
  BleError,
  LogLevel,
} from 'react-native-ble-plx';
import {PermissionsAndroid, Platform} from 'react-native';
import CryptoJS from 'crypto-js';
import {Buffer} from 'buffer';

export const SERVICE_UUID = '0000180a-0000-1000-8000-00805f9b34fb';
export const CHAR_UUID = '00001101-0000-1000-8000-00805f9b34fb';

// Map the ble-plx numeric codes (hard-to-read) → labels for easier logs
const humanBleCode = (e?: BleError) =>
  e?.errorCode === 102
    ? 'DeviceDisconnected'
    : e?.errorCode === 201
    ? 'OperationRejected'
    : e?.errorCode === 205
    ? 'OperationCancelled'
    : e?.errorCode === 301
    ? 'LocationServicesOff'
    : `Unknown(${e?.errorCode ?? '—'})`;

type TcuEvent = {type: 'log' | 'authenticated' | 'auth_failed'; line?: string};
interface Opt {
  targetName?: string;
  key: string;
  retries?: number;
}

export const useTcuBluetooth = ({targetName, key, retries = 3}: Opt) => {
  const ble = useRef(new BleManager()).current;
  ble.setLogLevel(LogLevel.Verbose); // <— full stacktraces in native logs

  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [connected, setConnected] = useState(false);
  const [char, setChar] = useState<Characteristic | null>(null);
  const [events, setEvents] = useState<TcuEvent[]>([]);

  const logEvt = (e: TcuEvent) => setEvents(p => [...p, e]);
  const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

  // ───────── permissions ─────────
  const requestPerms = async () => {
    if (Platform.OS !== 'android') return true;
    const res = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
    return Object.values(res).every(
      v => v === PermissionsAndroid.RESULTS.GRANTED,
    );
  };

  // ───────── scan ─────────
  const startScan = useCallback(async () => {
    if (scanning) return;
    if (!(await requestPerms())) {
      console.warn('[BLE] perms denied');
      return;
    }
    setScanning(true);
    setDevices([]);
    ble.startDeviceScan(null, {allowDuplicates: false}, (e, dev) => {
      if (e) {
        console.error('[BLE] scan err', humanBleCode(e));
        stopScan();
        return;
      }
      if (!dev || (targetName && dev.name !== targetName)) return;
      setDevices(p => (p.some(d => d.id === dev.id) ? p : [...p, dev]));
    });
  }, [ble, scanning, targetName]);
  const stopScan = useCallback(() => {
    ble.stopDeviceScan();
    setScanning(false);
  }, [ble]);

  // ───────── connect with auto-retry ─────────
  const connect = useCallback(
    async (dev: Device) => {
      stopScan();
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          console.log(
            `[BLE] connect attempt ${attempt + 1}/${retries + 1} →`,
            dev.id,
          );
          const cDev = await dev.connect({timeout: 8000});
          await wait(400);
          await cDev.discoverAllServicesAndCharacteristics();
          if (Platform.OS === 'android') {
            try {
              await cDev.requestConnectionPriority(ConnectionPriority.High);
              await cDev.requestMTU(247);
            } catch (e) {
              /*non-fatal*/
            }
          }
          const c = await cDev.readCharacteristicForService(
            SERVICE_UUID,
            CHAR_UUID,
          );
          setChar(c);
          setConnected(true);
          cDev.monitorCharacteristicForService(
            SERVICE_UUID,
            CHAR_UUID,
            (err, up) => {
              if (err) {
                console.error('[BLE] monitor', humanBleCode(err));
                return;
              }
              const ascii = Buffer.from(up?.value ?? '', 'base64').toString(
                'ascii',
              );
              ascii
                .split('\r\n')
                .filter(l => l.startsWith('#'))
                .forEach(handleLine);
            },
          );
          cDev.onDisconnected(e => {
            console.warn('[BLE] lost', humanBleCode(e));
            setConnected(false);
            setChar(null);
          });
          return; // ✅ success – exit retry loop
        } catch (e) {
          console.error('[BLE] connect fail', humanBleCode(e as BleError));
          if (attempt === retries) return; // exhausted
          await wait(1000 * (attempt + 1)); // back-off
        }
      }
    },
    [stopScan, retries],
  );

  // ───────── line parser + auth ─────────
  const sendRaw = (ascii: string) => {
    if (!char) return;
    const mtu = 180;
    for (let i = 0; i < ascii.length; i += mtu) {
      const chunk = ascii.slice(i, i + mtu);
      ble.writeCharacteristicWithoutResponseForDevice(
        char.deviceID,
        SERVICE_UUID,
        CHAR_UUID,
        Buffer.from(chunk, 'ascii').toString('base64'),
      );
    }
  };
  const handleLine = (line: string) => {
    logEvt({type: 'log', line});
    if (line.startsWith('#solve ')) {
      const token = line.split(' ')[1];
      const hash = CryptoJS.HmacSHA256(token, key).toString(CryptoJS.enc.Hex);
      console.log('[BLE] → HMAC response');
      sendRaw(`#solved ${hash}\r\n`);
    } else if (line === '\r\n' || !line) {
      return;
    } else if (line === 'solve success' || line === '#solve success') {
      logEvt({type: 'authenticated'});
    } else if (line === 'solve failed' || line === '#solve failed') {
      logEvt({type: 'auth_failed'});
    }
  };

  const sendCmd = (cmd: string) => sendRaw(cmd + '\r\n');

  useEffect(() => () => ble.destroy(), [ble]);

  return {scanning, devices, connected, events, startScan, connect, sendCmd};
};
