// dependencies
import {
  FetchUserWalletDocument,
  FetchUserWalletQuery,

  // update balance
  UpdateWalletBalanceDocument,
  UpdateWalletBalanceMutation,
  UpdateWalletBalanceMutationVariables,

  // update security deposit
  UpdateWalletSecurityDepositDocument,
  UpdateWalletSecurityDepositMutation,
  UpdateWalletSecurityDepositMutationVariables,
} from '@/generated/graphql';

// utils
import {callMutation, callQuery} from '@/utils/client';

// store
import {useWalletStore} from '@/globalStore';

const {setWallet} = useWalletStore.getState();

const WalletService = {
  fetchUserWallet: async function () {
    const response: FetchUserWalletQuery = await callQuery({
      queryDocument: FetchUserWalletDocument,
      variables: {},
    });

    setWallet(response.wallets[0]);

    return response.wallets[0];
  },

  updateWalletBalance: async function (
    args: UpdateWalletBalanceMutationVariables,
  ) {
    const response: UpdateWalletBalanceMutation = await callMutation({
      queryDocument: UpdateWalletBalanceDocument,
      variables: args,
    });

    return response.update_wallets_by_pk?.id;
  },

  updateWalletSecurityDeposit: async function (
    args: UpdateWalletSecurityDepositMutationVariables,
  ) {
    const response: UpdateWalletSecurityDepositMutation = await callMutation({
      queryDocument: UpdateWalletSecurityDepositDocument,
      variables: args,
    });

    return response.update_wallets_by_pk?.id;
  },
};

export default WalletService;
