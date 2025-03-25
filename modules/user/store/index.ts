/* eslint-disable @typescript-eslint/no-explicit-any */
// dependencies
import {create} from 'zustand';

// utils
import createSelectors from '@/utils/selectors';

// types
import {FetchCurrentUserQuery} from '@/generated/graphql';

// const {height} = Dimensions.get('window');

// type LoaderType =
//   | 'loading-user'
//   | 'phone-verification'
//   | 'user-login'
//   | 'profile-update'
//   | 'auth-confirmation';

export type NewUserFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
};

type UserStore = {
  user: FetchCurrentUserQuery['users'][0] | null | undefined;
};

type UserActions = {
  // firebase credentials
  setUser: (user: FetchCurrentUserQuery['users'][0] | null | undefined) => void;

  // reset store
  resetUserStore: () => void;
};

const userInitialState: UserStore = {
  // otp flow
  user: null,

  // bottom sheet
};

const userStore = create<UserStore & UserActions>(set => ({
  ...userInitialState,

  // otp flow
  setUser: user =>
    set({
      user: user,
    }),

  resetUserStore: () => set(userInitialState),
}));

export default createSelectors(userStore);
