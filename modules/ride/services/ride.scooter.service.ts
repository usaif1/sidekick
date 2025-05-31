/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// ajjas
const scooterImmobilizeEndpoint = 'https://api.ajjas.com/b2b/immobilize';

export const rideScooterService = {
  toggleScooterMobility: async function ({
    imei,
    immobilize,
  }: {
    imei: string;
    immobilize: boolean;
  }) {
    try {
      const response = await axios.post(
        scooterImmobilizeEndpoint,
        {
          imei: imei,
          immobilize: immobilize,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':
              '657b4e228d12bfbee306b438df60a87b7c3703a8e6fc6d1bfba3c281dd6f0415',
          },
        },
      );

      if (!response.data) {
        return {
          success: false,
          data: 'No response from scooter',
        };
      }

      if (response.data.data !== 'Operation successful') {
        return {
          success: false,
          data: response.data.data,
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  },
};
