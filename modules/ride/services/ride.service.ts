// utils
import {callMutation, callQuery} from '@/utils/client';

// store
import {useRideStore} from '@/globalStore';

// types
import {
  FetchAllHubsDocument,
  FetchAllHubsQuery,

  // fetch scooter by reg no
  FetchScooterByNumberDocument,
  FetchScooterByNumberQuery,
  FetchScooterByNumberQueryVariables,

  // create ride
  CreateRideDocument,
  CreateRideMutation,
  CreateRideMutationVariables,
} from '@/generated/graphql';

const {setHubs} = useRideStore.getState();

const WalletService = {
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

  startRide: async function (args: CreateRideMutationVariables) {
    const response: CreateRideMutation = await callMutation({
      queryDocument: CreateRideDocument,
      variables: args,
    });

    return response.insert_ride_details_one?.id;
  },
};

export default WalletService;
