// dependencies
import {
  CreateWalletDocument,
  CreateWalletMutation,
  CreateWalletMutationVariables,
} from '@/generated/graphql';
import {callMutation, callQuery} from '@/utils/client';

const WalletService = {
  createUserWallet: async function (args: CreateWalletMutationVariables) {
    const response: CreateWalletMutation = await callMutation({
      queryDocument: CreateWalletDocument,
      variables: args,
    });

    return response.insert_wallets_one?.id;
  },
};

export default WalletService;
