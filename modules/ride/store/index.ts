// dependencies
import {create} from 'zustand';
import {CameraDevice} from 'react-native-vision-camera';

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

  //
  setDevice: (camera: CameraDevice | null | undefined) => void;

  // ride history
  setRideHistory: (rides: FetchCompletedRidesQuery['ride_details']) => void;
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

  resetRideStore: () => set(rideInitialState),
}));

export default createSelectors(rideStore);
