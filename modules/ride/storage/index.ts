// dependencies
import {MMKV} from 'react-native-mmkv';

// types
type CurrentRideData = {
  rideId: string;
  userId: string;
  scooterId: string;
  startTime: string;
  startHubId: string;
  status: 'STARTED' | 'IN_PROGRESS' | 'PAUSED';
  lastUpdated: string;
};

// Initialize MMKV
const rideStorage = new MMKV({
  id: 'ride-storage',
  encryptionKey: 'your-secure-key',
});

// Current ride storage utilities
export const currentRideStorage = {
  // Store current ride data
  setCurrentRide: (rideData: CurrentRideData): void => {
    try {
      rideStorage.set('currentRide', JSON.stringify(rideData));
      rideStorage.set('hasActiveRide', true);
    } catch (error) {
      console.error('Error storing current ride:', error);
    }
  },

  // Get current ride data
  getCurrentRide: (): CurrentRideData | null => {
    try {
      const rideDataString = rideStorage.getString('currentRide');
      if (rideDataString) {
        return JSON.parse(rideDataString) as CurrentRideData;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving current ride:', error);
      return null;
    }
  },

  // Check if there's an active ride
  hasActiveRide: (): boolean => {
    try {
      return rideStorage.getBoolean('hasActiveRide') ?? false;
    } catch (error) {
      console.error('Error checking active ride status:', error);
      return false;
    }
  },

  // Update ride status
  updateRideStatus: (status: CurrentRideData['status']): void => {
    try {
      const currentRide = currentRideStorage.getCurrentRide();
      if (currentRide) {
        const updatedRide: CurrentRideData = {
          ...currentRide,
          status,
          lastUpdated: new Date().toISOString(),
        };
        currentRideStorage.setCurrentRide(updatedRide);
      }
    } catch (error) {
      console.error('Error updating ride status:', error);
    }
  },

  // Clear current ride data (when ride ends)
  clearCurrentRide: (): void => {
    try {
      rideStorage.delete('currentRide');
      rideStorage.set('hasActiveRide', false);
    } catch (error) {
      console.error('Error clearing current ride:', error);
    }
  },

  // Update last activity timestamp
  updateLastActivity: (): void => {
    try {
      const currentRide = currentRideStorage.getCurrentRide();
      if (currentRide) {
        const updatedRide: CurrentRideData = {
          ...currentRide,
          lastUpdated: new Date().toISOString(),
        };
        currentRideStorage.setCurrentRide(updatedRide);
      }
    } catch (error) {
      console.error('Error updating last activity:', error);
    }
  },
};

export default rideStorage;
export type {CurrentRideData};
