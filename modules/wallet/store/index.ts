// dependencies
import {create} from 'zustand';

// utils
import createSelectors from '@/utils/selectors';

// types
import {FetchUserWalletQuery} from '@/generated/graphql';

// const {height} = Dimensions.get('window');

// type LoaderType =
//   | 'loading-user'
//   | 'phone-verification'
//   | 'user-login'
//   | 'profile-update'
//   | 'auth-confirmation';

type WalletStore = {
  userWallet: FetchUserWalletQuery['wallets'][0] | null | undefined;

  //add amount
  rechargeAmount: string;
};

type WalletActions = {
  setWallet: (
    wallet: FetchUserWalletQuery['wallets'][0] | null | undefined,
  ) => void;

  setRechargeAmount: (amt: string) => void;

  // reset store
  resetWalletStore: () => void;
};

const walletInitialState: WalletStore = {
  userWallet: null,
  rechargeAmount: '0',
};

const walletStore = create<WalletStore & WalletActions>(set => ({
  ...walletInitialState,

  // otp flow
  setWallet: wallet =>
    set({
      userWallet: wallet,
    }),

  setRechargeAmount: amt => set({rechargeAmount: amt}),

  resetWalletStore: () => set(walletInitialState),
}));

export default createSelectors(walletStore);
