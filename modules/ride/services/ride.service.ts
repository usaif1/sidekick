// utils
import {callMutation, callQuery} from '@/utils/client';
import {DateTime, Duration} from 'luxon';

// store
import {useRideStore} from '@/globalStore';

// storage
import {currentRideStorage, CurrentRideData} from '../storage';
import rideStorage from '../storage';

// types
import {
  FetchAllHubsDocument,
  FetchAllHubsQuery,

  // fetch scooter by reg no
  FetchScooterByNumberDocument,
  FetchScooterByNumberQuery,
  FetchScooterByNumberQueryVariables,

  // fetch current ride
  FetchCurrentRideDocument,
  FetchCurrentRideQuery,
  FetchCurrentRideQueryVariables,

  // fetch active ride
  FetchActiveRideDocument,
  FetchActiveRideQuery,
  FetchActiveRideQueryVariables,

  // create ride
  CreateRideDocument,
  CreateRideMutation,
  CreateRideMutationVariables,
  CreateRideStepDocument,
  CreateRideStepMutationVariables,
  CreateRideStepMutation,
  UpdateRideEndTimeDocument,
  UpdateRideEndTimeMutation,
  UpdateRideEndTimeMutationVariables,
  FetchCompletedRidesQueryVariables,
  FetchCompletedRidesQuery,
  FetchCompletedRidesDocument,
} from '@/generated/graphql';

const {setHubs, setRideHistory, setCompletedRides} = useRideStore.getState();

const RideService = {
  fetchAllHubs: async function () {
    const response: FetchAllHubsQuery = await callQuery({
      queryDocument: FetchAllHubsDocument,
      variables: {},
    });

    setHubs(response.hubs);
    return response.hubs;
  },

  // fetch scooter by ride to check it exists

  fetchScooterByRegNo: async function (
    args: FetchScooterByNumberQueryVariables,
  ) {
    const response: FetchScooterByNumberQuery = await callQuery({
      queryDocument: FetchScooterByNumberDocument,
      variables: args,
    });

    return response.scooters[0];
  },

  fetchCurrentRide: async function (args: FetchCurrentRideQueryVariables) {
    const response: FetchCurrentRideQuery = await callQuery({
      queryDocument: FetchCurrentRideDocument,
      variables: args,
    });

    return response.ride_details_by_pk;
  },

  startRide: async function (args: CreateRideMutationVariables) {
    const response: CreateRideMutation = await callMutation({
      queryDocument: CreateRideDocument,
      variables: args,
    });

    return response.insert_ride_details_one;
  },

  createRideStep: async function (args: CreateRideStepMutationVariables) {
    const response: CreateRideStepMutation = await callMutation({
      queryDocument: CreateRideStepDocument,
      variables: args,
    });

    return response.insert_ride_steps_one;
  },

  updateRideEndTime: async function (args: UpdateRideEndTimeMutationVariables) {
    const response: UpdateRideEndTimeMutation = await callMutation({
      queryDocument: UpdateRideEndTimeDocument,
      variables: args,
    });

    return response.update_ride_details_by_pk;
  },

  fetchCompletedRides: async function (
    args: FetchCompletedRidesQueryVariables,
  ) {
    const response: FetchCompletedRidesQuery = await callQuery({
      queryDocument: FetchCompletedRidesDocument,
      variables: args,
    });

    setRideHistory(response.ride_details);

    return response;
  },

  endRide: async function (args: UpdateRideEndTimeMutationVariables) {
    const response: UpdateRideEndTimeMutation = await callMutation({
      queryDocument: UpdateRideEndTimeDocument,
      variables: args,
    });

    return response.update_ride_details_by_pk;
  },

  fetchAllCompletedRides: async function (
    args: FetchCompletedRidesQueryVariables,
  ) {
    const response: FetchCompletedRidesQuery = await callQuery({
      queryDocument: FetchCompletedRidesDocument,
      variables: args,
    });

    setCompletedRides(response?.ride_details);

    return response.ride_details;
  },

  getTotalRideDuration: (rides: FetchCompletedRidesQuery['ride_details']) => {
    console.log('rides', rides);
    let totalDuration = Duration.fromMillis(0);

    rides.forEach(ride => {
      if (ride?.start_time && ride?.end_time) {
        const start = DateTime.fromISO(ride.start_time);
        const end = DateTime.fromISO(ride.end_time);

        const duration = end.diff(start);
        totalDuration = totalDuration.plus(duration);
      }
    });

    // Return formatted duration
    const total = totalDuration.shiftTo('minutes', 'seconds');
    return {
      totalMilliseconds: totalDuration.toMillis(),
      totalSeconds: Math.floor(totalDuration.as('seconds')),
      totalMinutes: Math.floor(totalDuration.as('minutes')),
      formatted: `${total.minutes} min ${Math.floor(total.seconds)} sec`,
    };
  },

  // Active ride management
  fetchActiveRideByUserId: async function (userId: string) {
    try {
      console.log('🔍 Fetching active ride for user ID:', userId);

      const response: FetchActiveRideQuery = await callQuery({
        queryDocument: FetchActiveRideDocument,
        variables: { userId },
      });

      console.log('📊 Active ride API response:', response.ride_details);

      return response.ride_details[0] || null;
    } catch (error) {
      console.error('❌ Error fetching active ride:', error);
      return null;
    }
  },

  // Check if user has an active ride (API first, local fallback)
  checkActiveRide: async function (userId: string): Promise<{
    hasActiveRide: boolean;
    rideData: CurrentRideData | null;
    source: 'local' | 'api';
  }> {
    console.log('🔍 checkActiveRide called for user ID:', userId);

    // Clean up any inconsistencies in old storage system first
    const oldRideId = rideStorage.getString('currentRideId');
    const oldScooterId = rideStorage.getString('currentScooterId');
    const localRideData = currentRideStorage.getCurrentRide();
    const hasLocalRide = currentRideStorage.hasActiveRide();

    // If old system has data but new doesn't, clean up old system
    if ((oldRideId || oldScooterId) && !hasLocalRide) {
      console.log('🧹 Cleaning up stale old storage data');
      rideStorage.delete('currentRideId');
      rideStorage.delete('currentScooterId');
    }

    // First try API (primary source of truth)
    try {
      console.log('🌐 Checking API first for user:', userId);
      const apiRideData = await RideService.fetchActiveRideByUserId(userId);

      console.log('📊 API ride data:', apiRideData);

      if (apiRideData) {
        // Additional safety check: verify the ride doesn't have RIDE_ENDED step
        const hasEndedStep = apiRideData.ride_steps?.some(step => step.steps === 'RIDE_ENDED');
        if (hasEndedStep) {
          console.log('⚠️ API returned ride with RIDE_ENDED step, treating as no active ride');
          // Clear any local storage since API says no active ride
          currentRideStorage.clearCurrentRide();
          return {
            hasActiveRide: false,
            rideData: null,
            source: 'api',
          };
        }

        console.log('✅ Found active ride via API:', apiRideData);

        // Convert API data to local storage format
        const latestStep = apiRideData.ride_steps[apiRideData.ride_steps.length - 1]?.steps;
        console.log('🔄 Latest ride step from API:', latestStep);

        // Map API statuses to local storage statuses
        let status: CurrentRideData['status'] = 'IN_PROGRESS';
        if (latestStep === 'RIDE_STARTED') {
          status = 'STARTED';
        } else if (latestStep === 'RIDE_PAUSED') {
          status = 'PAUSED';
        } else if (latestStep === 'RIDE_RESUMED') {
          status = 'IN_PROGRESS';
        }

        console.log('🔄 Mapped status:', status);
        const rideData: CurrentRideData = {
          rideId: apiRideData.id,
          userId: apiRideData.user_id,
          scooterId: apiRideData.scooter_id,
          startTime: apiRideData.start_time,
          startHubId: apiRideData.start_hub_id,
          status,
          lastUpdated: new Date().toISOString(),
        };

        console.log('💾 Updating local storage with API data:', rideData);

        // Sync local storage with API data
        currentRideStorage.setCurrentRide(rideData);

        return {
          hasActiveRide: true,
          rideData,
          source: 'api',
        };
      } else {
        console.log('❌ No active ride found in API');
        // Clear local storage since API says no active ride
        if (hasLocalRide) {
          console.log('🧹 Clearing stale local storage data');
          currentRideStorage.clearCurrentRide();
        }
        return {
          hasActiveRide: false,
          rideData: null,
          source: 'api',
        };
      }
    } catch (apiError) {
      console.error('❌ API error, falling back to local storage:', apiError);

      // Fallback to local storage only on API error
      console.log('💾 Falling back to local storage check:', { hasLocalRide, localRideData });

      if (hasLocalRide && localRideData) {
        console.log('✅ Found active ride in local storage (fallback):', localRideData);
        return {
          hasActiveRide: true,
          rideData: localRideData,
          source: 'local',
        };
      }

      console.log('❌ No active ride found in local storage either');
      return {
        hasActiveRide: false,
        rideData: null,
        source: 'local',
      };
    }
  },

  // Store ride data when starting a ride
  storeActiveRide: function (rideData: {
    rideId: string;
    userId: string;
    scooterId: string;
    startTime: string;
    startHubId: string;
  }): void {
    const currentRideData: CurrentRideData = {
      ...rideData,
      status: 'STARTED',
      lastUpdated: new Date().toISOString(),
    };

    // Store in new storage system
    currentRideStorage.setCurrentRide(currentRideData);

    // Also ensure old storage system is synchronized (in case other parts of app depend on it)
    rideStorage.set('currentRideId', rideData.rideId);
    rideStorage.set('currentScooterId', rideData.scooterId);

    console.log('✅ Ride data stored in both storage systems');
  },

  // Update ride status locally
  updateRideStatus: function (status: CurrentRideData['status']): void {
    currentRideStorage.updateRideStatus(status);
    console.log(`✅ Ride status updated to: ${status}`);
  },

  // Clear active ride data when ride ends
  clearActiveRide: function (): void {
    // Clear new storage system
    currentRideStorage.clearCurrentRide();

    // Also clear old storage system for complete cleanup
    rideStorage.delete('currentRideId');
    rideStorage.delete('currentScooterId');

    console.log('✅ Active ride data cleared from both storage systems');
  },
};

export default RideService;
