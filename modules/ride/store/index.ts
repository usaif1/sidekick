// dependencies
import {create} from 'zustand';

// utils
import createSelectors from '@/utils/selectors';

// types
import {FetchAllHubsQuery} from '@/generated/graphql';

// const {height} = Dimensions.get('window');

// type LoaderType =
//   | 'loading-user'
//   | 'phone-verification'
//   | 'user-login'
//   | 'profile-update'
//   | 'auth-confirmation';

export type SelectedHub = {
  id: string;
  label: string;
  distance: string;
};

type RideStore = {
  hubs: FetchAllHubsQuery['hubs'];
  interval: NodeJS.Timeout | null;
  totalCost: number;
  isPaused: boolean;
  secondsElapsed: number;
  perMinuteRate: number;
  selectedHub: SelectedHub;
};

type WalletActions = {
  setHubs: (allHubs: FetchAllHubsQuery['hubs']) => void;
  setTimerInterval: (timeoutInterval: NodeJS.Timeout | null) => void;
  setTotalCost: (cost: number) => void;
  setIsPaused: (pauseState: boolean) => void;
  setSecondsElapsed: (updater: any) => void;

  setSelectedHub: (hub: SelectedHub) => void;
};

const rideInitialState: RideStore = {
  hubs: [],
  interval: null,
  totalCost: 0,
  isPaused: false,
  secondsElapsed: 0,
  perMinuteRate: 2,

  selectedHub: {
    id: 'car_parking',
    label: 'Car Parking',
    distance: '23m',
  },
};

const rideStore = create<RideStore & WalletActions>(set => ({
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

  resetRideStore: () => set(rideInitialState),
}));

export default createSelectors(rideStore);
