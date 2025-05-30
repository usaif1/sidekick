/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const scooterActionsEndpoint =
  'https://rpchandler-5qdomig34a-uc.a.run.app/rpcHandler';
// 'http://127.0.0.1:5001/sidekick-c821e/us-central1/rpcHandler';

const jsonRpcClient = axios.create({
  baseURL: scooterActionsEndpoint, // 🔁 Change this
  headers: {
    'Content-Type': 'application/json',
  },
});

export enum ScooterMethods {
  GW_DEVICES_COMMANDS = 'http.gw.devices.commands.post',
}

async function jsonRpcCall(
  method: ScooterMethods,
  params: any[] | object,
  id?: number,
) {
  const payload = {
    jsonrpc: '2.0',
    method,
    params,
    id: id,
  };

  try {
    const response = await jsonRpcClient.post('/', payload);
    const {data} = response;

    if (!data?.id) {
      return null;
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Request failed');
  }
}

export const rideScooterService = {
  startScooter: async function (deviceId: string) {
    const commandData = {
      data: JSON.stringify([
        {
          name: 'custom',
          properties: {
            text: 'setdigout 1 900',
          },
          timeout: 60,
        },
      ]),
    };

    // try {
    //   const response = await jsonRpcCall(
    //     ScooterMethods.GW_DEVICES_COMMANDS,
    //     [`${deviceId}`, commandData],
    //     Date.now(),
    //   );

    //   return response;
    // } catch (error) {
    //   throw new Error('Error starting scooter');
    // }
  },

  stopScooter: async function (deviceId: string) {
    const commandData = {
      data: JSON.stringify([
        {
          name: 'custom',
          properties: {
            text: 'setdigout 0',
          },
          timeout: 60,
        },
      ]),
    };

    // try {
    //   const response = await jsonRpcCall(
    //     ScooterMethods.GW_DEVICES_COMMANDS,
    //     [`${deviceId}`, commandData],
    //     Date.now(),
    //   );

    //   return response;
    // } catch (error) {
    //   throw new Error('Error starting scooter');
    // }
  },
};
