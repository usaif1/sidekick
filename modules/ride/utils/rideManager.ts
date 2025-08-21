// Active Ride Management Utility
// This file provides a centralized way to manage ride state across the app

import RideService from '../services/ride.service';
import {currentRideStorage, CurrentRideData} from '../storage';
import {useRideStore} from '@/globalStore';

export class RideManager {
  /**
   * Initialize ride check on app startup
   * Should be called in App.tsx or main navigation component
   */
  static async initializeRideCheck(userId: string): Promise<{
    hasActiveRide: boolean;
    rideData: CurrentRideData | null;
  }> {
    try {
      console.log('🚀 Initializing ride check for user:', userId);

      const result = await RideService.checkActiveRide(userId);

      // Update global store
      const {setCurrentRide} = useRideStore.getState();
      setCurrentRide(result.rideData);

      if (result.hasActiveRide && result.rideData) {
        console.log('✅ Active ride found during initialization:', {
          rideId: result.rideData.rideId,
          status: result.rideData.status,
          source: result.source,
        });
      } else {
        console.log('❌ No active ride found during initialization');
      }

      return {
        hasActiveRide: result.hasActiveRide,
        rideData: result.rideData,
      };
    } catch (error) {
      console.error('❌ Error during ride initialization:', error);
      return {
        hasActiveRide: false,
        rideData: null,
      };
    }
  }

  /**
   * Start a new ride and store data locally
   */
  static startRide(rideData: {
    rideId: string;
    userId: string;
    scooterId: string;
    startTime: string;
    startHubId: string;
  }): void {
    // Store in local storage
    RideService.storeActiveRide(rideData);

    // Update global store
    const {setCurrentRide} = useRideStore.getState();
    const currentRideData: CurrentRideData = {
      ...rideData,
      status: 'STARTED',
      lastUpdated: new Date().toISOString(),
    };
    setCurrentRide(currentRideData);

    console.log('🚴‍♂️ Ride started and stored:', rideData.rideId);
  }

  /**
   * Update ride status
   */
  static updateRideStatus(status: CurrentRideData['status']): void {
    // Update local storage
    RideService.updateRideStatus(status);

    // Update global store
    const {currentRide, setCurrentRide} = useRideStore.getState();
    if (currentRide) {
      const updatedRide: CurrentRideData = {
        ...currentRide,
        status,
        lastUpdated: new Date().toISOString(),
      };
      setCurrentRide(updatedRide);
    }

    console.log('🔄 Ride status updated to:', status);
  }

  /**
   * End the current ride and clear data
   */
  static endRide(): void {
    // Clear local storage
    RideService.clearActiveRide();

    // Clear global store
    const {clearCurrentRide} = useRideStore.getState();
    clearCurrentRide();

    console.log('🏁 Ride ended and data cleared');
  }

  /**
   * Get current ride data from local storage
   */
  static getCurrentRide(): CurrentRideData | null {
    return currentRideStorage.getCurrentRide();
  }

  /**
   * Check if there's an active ride (local check only)
   */
  static hasActiveRide(): boolean {
    return currentRideStorage.hasActiveRide();
  }

  /**
   * Force refresh ride status from API
   */
  static async refreshFromAPI(userId: string): Promise<{
    hasActiveRide: boolean;
    rideData: CurrentRideData | null;
  }> {
    try {
      const result = await RideService.checkActiveRide(userId);

      // Update global store
      const {setCurrentRide} = useRideStore.getState();
      setCurrentRide(result.rideData);

      return {
        hasActiveRide: result.hasActiveRide,
        rideData: result.rideData,
      };
    } catch (error) {
      console.error('❌ Error refreshing ride status from API:', error);
      return {
        hasActiveRide: false,
        rideData: null,
      };
    }
  }
}

export default RideManager;
