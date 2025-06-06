// dependencies
import {create} from 'zustand';
import {CameraDevice} from 'react-native-vision-camera';
import {DateTime} from 'luxon';

// utils
import createSelectors from '@/utils/selectors';

// types
import {FetchAllHubsQuery, FetchCompletedRidesQuery} from '@/generated/graphql';

// const {height} = Dimensions.get('window');

// type LoaderType =
//   | 'loading-user'
//   | 'phone-verification'
//   | 'user-login'
//   | 'profile-update'
//   | 'auth-confirmation';

type RideStore = {
  hubs: FetchAllHubsQuery['hubs'];
  interval: NodeJS.Timeout | null;
  totalCost: number;
  isPaused: boolean;
  secondsElapsed: number;
  perMinuteRate: number;
  selectedHub: FetchAllHubsQuery['hubs'][0] | undefined;

  // Ride timing
  rideStartTime: string | null; // ISO timestamp from server

  // New pause tracking properties
  pausedSecondsElapsed: number; // Track total paused time
  pauseStartTime: number | null; // When current pause started
  activeSecondsElapsed: number; // Track active riding time
  pausedPerMinuteRate: number; // Half rate for paused time

  // ride history
  completedRides: FetchCompletedRidesQuery['ride_details'];

  // camera
  device: CameraDevice | null | undefined;

  // ride history
  rideHistory: FetchCompletedRidesQuery['ride_details'];
};

type RideActions = {
  setHubs: (allHubs: FetchAllHubsQuery['hubs']) => void;
  setTimerInterval: (timeoutInterval: NodeJS.Timeout | null) => void;
  setTotalCost: (cost: number) => void;
  setIsPaused: (pauseState: boolean) => void;
  setSecondsElapsed: (updater: any) => void;
  setSelectedHub: (hub: FetchAllHubsQuery['hubs'][0] | undefined) => void;

  // Ride timing
  setRideStartTime: (startTime: string | null) => void;
  syncTimerWithServer: (startTime: string, pausedTime: number) => void;

  // New pause tracking actions
  setPausedSecondsElapsed: (seconds: number) => void;
  setPauseStartTime: (timestamp: number | null) => void;
  setActiveSecondsElapsed: (seconds: number) => void;
  incrementActiveTime: () => void;
  incrementPausedTime: () => void;

  // ride history
  setCompletedRides: (rides: FetchCompletedRidesQuery['ride_details']) => void;

  //camera
  setDevice: (camera: CameraDevice | null | undefined) => void;

  // ride history
  setRideHistory: (rides: FetchCompletedRidesQuery['ride_details']) => void;
  resetRideStore: () => void;
};

// Separate state from actions
const rideInitialState: RideStore = {
  hubs: [],
  interval: null,
  totalCost: 0,
  isPaused: false,
  secondsElapsed: 0,
  perMinuteRate: 2,
  selectedHub: undefined,

  // Ride timing
  rideStartTime: null, // ISO timestamp from server

  // New pause tracking properties
  pausedSecondsElapsed: 0, // Track total paused time
  pauseStartTime: null, // When current pause started
  activeSecondsElapsed: 0, // Track active riding time
  pausedPerMinuteRate: 1, // Half rate for paused time

  // ride history
  completedRides: [],

  // camera
  device: null,

  // ride history
  rideHistory: [],
};

const rideStore = create<RideStore & RideActions>(set => ({
  ...rideInitialState,

  setHubs: allHubs =>
    set({
      hubs: allHubs,
    }),

  setTimerInterval: timeoutInterval =>
    set({
      interval: timeoutInterval,
    }),

  setTotalCost: cost =>
    set({
      totalCost: cost,
    }),

  setIsPaused: pausedState =>
    set({
      isPaused: pausedState,
    }),

  setSecondsElapsed: updater =>
    set(state => ({
      secondsElapsed:
        typeof updater === 'function' ? updater(state.secondsElapsed) : updater,
    })),

  setSelectedHub: hub =>
    set({
      selectedHub: hub,
    }),

  // ride history
  setCompletedRides: rides =>
    set({
      completedRides: rides,
    }),

  // camera
  setDevice: camera =>
    set({
      device: camera,
    }),

  // ride history
  setRideHistory: rides =>
    set({
      rideHistory: rides,
    }),

  resetRideStore: () => set((state) => ({
    ...rideInitialState,
    hubs: state.hubs, // Preserve hubs data across resets
  })),

  // New pause tracking actions
  setPausedSecondsElapsed: (seconds: number) =>
    set({
      pausedSecondsElapsed: seconds,
    }),

  setPauseStartTime: (timestamp: number | null) =>
    set({
      pauseStartTime: timestamp,
    }),

  setActiveSecondsElapsed: (seconds: number) =>
    set({
      activeSecondsElapsed: seconds,
    }),

  incrementActiveTime: () =>
    set(state => {
      try {
        const newSecondsElapsed = (state.secondsElapsed || 0) + 1;
        const newActiveSecondsElapsed = (state.activeSecondsElapsed || 0) + 1;
        
        return {
          secondsElapsed: newSecondsElapsed,
          activeSecondsElapsed: newActiveSecondsElapsed,
        };
      } catch (error) {
        console.error('❌ Error incrementing active time:', error);
        return state;
      }
    }),

  incrementPausedTime: () =>
    set(state => {
      try {
        const newSecondsElapsed = (state.secondsElapsed || 0) + 1;
        const newPausedSecondsElapsed = (state.pausedSecondsElapsed || 0) + 1;
        
        return {
          secondsElapsed: newSecondsElapsed,
          pausedSecondsElapsed: newPausedSecondsElapsed,
        };
      } catch (error) {
        console.error('❌ Error incrementing paused time:', error);
        return state;
      }
    }),

  // Ride timing
  setRideStartTime: startTime =>
    set({
      rideStartTime: startTime,
    }),

  syncTimerWithServer: (startTime, pausedTime) =>
    set(state => {
      try {
        // Validate inputs
        if (!startTime || typeof pausedTime !== 'number' || pausedTime < 0) {
          console.error('❌ Invalid sync parameters:', {startTime, pausedTime});
          return state; // Return current state unchanged
        }

        const now = DateTime.now();
        const start = DateTime.fromISO(startTime);
        
        // Check if DateTime parsing was successful
        if (!start.isValid) {
          console.error('❌ Invalid start time format:', startTime);
          return state; // Return current state unchanged
        }

        const diff = now.diff(start, 'seconds');
        
        // Check if diff calculation was successful
        if (!diff.isValid) {
          console.error('❌ Invalid time difference calculation');
          return state; // Return current state unchanged
        }

        const totalElapsedSeconds = Math.floor(diff.seconds);
        const activeElapsedSeconds = Math.max(0, totalElapsedSeconds - pausedTime);

        // Validate calculated values
        if (isNaN(totalElapsedSeconds) || isNaN(activeElapsedSeconds) || 
            totalElapsedSeconds < 0 || activeElapsedSeconds < 0) {
          console.error('❌ Invalid calculated elapsed times:', {
            totalElapsedSeconds,
            activeElapsedSeconds
          });
          return state; // Return current state unchanged
        }

        console.log('🔄 Timer sync successful:', {
          startTime,
          totalElapsedSeconds,
          pausedTime,
          activeElapsedSeconds,
        });

        return {
          rideStartTime: startTime,
          secondsElapsed: totalElapsedSeconds,
          activeSecondsElapsed: activeElapsedSeconds,
          pausedSecondsElapsed: pausedTime,
        };
      } catch (error) {
        console.error('❌ Error in syncTimerWithServer:', error);
        return state; // Return current state unchanged
      }
    }),
}));

export default createSelectors(rideStore);
