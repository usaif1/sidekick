/* eslint-disable @typescript-eslint/no-explicit-any */
// dependencies
import {create} from 'zustand';
import {Dimensions} from 'react-native';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {RefObject} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Client} from 'urql';

// components
import WelcomeForm from '../components/WelcomeForm';

// utils
import createSelectors from '@/utils/selectors';
import {ViewType} from '../types';

const {height} = Dimensions.get('window');

type LoaderType =
  | 'loading-user'
  | 'phone-verification'
  | 'user-login'
  | 'profile-update'
  | 'auth-confirmation';

type AuthStore = {
  user: FirebaseAuthTypes.User | null | undefined;
  confirmationResult: FirebaseAuthTypes.ConfirmationResult | null;
  authToken: string;

  // graphql
  graphQLClient: Client | null;

  // bottom sheet
  AuthBottomSheetComponent: React.FC | null;
  authBottomSheetRef: RefObject<BottomSheetMethods | null> | null;
  authBottomSheetSnapPoints: any;
  currentView: ViewType;

  // loaders
  authLoaders: Record<LoaderType, boolean>;
};

type GlobalActions = {
  // otp flow
  setUser: (user: FirebaseAuthTypes.User | null | undefined) => void;
  setConfirmationResult: (
    confirmationResult: FirebaseAuthTypes.ConfirmationResult | null,
  ) => void;
  setAuthToken: (token: string) => void;

  // graphql
  setGraphQLClient: (client: Client | null) => void;

  // bottom sheet actions
  setAuthBottomSheetRef: (ref: RefObject<BottomSheetMethods | null>) => void;
  setAuthBottomSheetComponent: (Component: React.FC) => void;
  setAuthBottomSheetSnapPoints: (snapPoints: any) => void;
  openAuthBottomSheet: () => void;
  setCurrentView: (view: ViewType) => void;

  // loader actions
  startLoading: (loader: LoaderType) => void;
  stopLoading: (loader: LoaderType) => void;

  // reset store
  resetAuthStore: () => void;
};

const globalInitialState: AuthStore = {
  // otp flow
  user: null,
  confirmationResult: null,
  authToken: '',

  // graphql
  graphQLClient: null,

  // bottom sheet
  currentView: 'welcome',
  AuthBottomSheetComponent: WelcomeForm,
  authBottomSheetRef: null,
  authBottomSheetSnapPoints: [height * 0.45],

  // loaders
  authLoaders: {
    'loading-user': true,
    'phone-verification': false,
    'user-login': false,
    'profile-update': false,
    'auth-confirmation': false,
  },
};

const authStore = create<AuthStore & GlobalActions>(set => ({
  ...globalInitialState,

  // otp flow
  setUser: user =>
    set({
      user: user,
    }),

  setConfirmationResult: confirmationResult =>
    set({
      confirmationResult: confirmationResult,
    }),


  setAuthToken: token =>
    set({
      authToken: token,
    }),

  //  graphql
  setGraphQLClient: client =>
    set({
      graphQLClient: client,
    }),

  // bottom sheet actions
  setAuthBottomSheetComponent: Component =>
    set({
      AuthBottomSheetComponent: Component,
    }),

  setAuthBottomSheetSnapPoints: snapPoints =>
    set({
      authBottomSheetSnapPoints: snapPoints,
    }),

  openAuthBottomSheet: () =>
    set(state => {
      if (state.authBottomSheetRef?.current) {
        state.authBottomSheetRef.current.expand();
      }
      return {};
    }),

  setAuthBottomSheetRef: ref =>
    set({
      authBottomSheetRef: ref,
    }),

  setCurrentView: view =>
    set({
      currentView: view,
    }),

  // Loader actions
  startLoading: (loader: LoaderType) =>
    set(state => ({
      authLoaders: {...state.authLoaders, [loader]: true},
    })),

  stopLoading: (loader: LoaderType) =>
    set(state => ({
      authLoaders: {...state.authLoaders, [loader]: false},
    })),

  resetAuthStore: () =>
    set(prevState => ({
      ...globalInitialState,
      authLoaders: {
        ...prevState.authLoaders,
        'loading-user': false,
      },
    })),
}));

export default createSelectors(authStore);
