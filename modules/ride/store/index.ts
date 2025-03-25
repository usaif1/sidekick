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

type RideStore = {
  hubs: FetchAllHubsQuery['hubs'];
};

type WalletActions = {
  setHubs: (allHubs: FetchAllHubsQuery['hubs']) => void;
};

const rideInitialState: RideStore = {
  hubs: [],
};

const rideStore = create<RideStore & WalletActions>(set => ({
  ...rideInitialState,

  setHubs: allHubs =>
    set({
      hubs: allHubs,
    }),

  resetRideStore: () => set(rideInitialState),
}));

export default createSelectors(rideStore);
