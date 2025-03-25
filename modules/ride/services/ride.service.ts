// dependencies
import {FetchAllHubsDocument, FetchAllHubsQuery} from '@/generated/graphql';

// utils
import {callMutation, callQuery} from '@/utils/client';

// store
import {useRideStore} from '@/globalStore';

const {setHubs} = useRideStore.getState();

const WalletService = {
  fetchAllHubs: async function () {
    const response: FetchAllHubsQuery = await callQuery({
      queryDocument: FetchAllHubsDocument,
      variables: {},
    });

    setHubs(response.hubs);
  },
};

export default WalletService;
