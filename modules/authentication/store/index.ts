// dependencies
import {create} from 'zustand';
import {Dimensions} from 'react-native';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {RefObject} from 'react';

// components
import WelcomeForm from '../components/WelcomeForm';

// utils
import createSelectors from '@/utils/selectors';
import {ViewType} from '../types';

const {height} = Dimensions.get('window');

type AuthStore = {
  authNavigation: any;
  user: any;

  // bottom sheet
  AuthBottomSheetComponent: React.FC | null;
  authBottomSheetRef: RefObject<BottomSheetMethods | null> | null;
  authBottomSheetSnapPoints: any;
  currentView: ViewType;
};

type GlobalActions = {
  setAuthNavigation: (nav: any) => void;
  navigate: (screen: string) => void;

  // bottom sheet actions
  setAuthBottomSheetRef: (ref: RefObject<BottomSheetMethods | null>) => void;
  setAuthBottomSheetComponent: (Component: React.FC) => void;
  setAuthBottomSheetSnapPoints: (snapPoints: any) => void;
  openAuthBottomSheet: () => void;
  setCurrentView: (view: ViewType) => void;

  // reset store
  resetAuthStore: () => void;
};

const globalInitialState: AuthStore = {
  user: null,
  authNavigation: null,
  currentView: 'welcome',

  // bottom sheet
  AuthBottomSheetComponent: WelcomeForm,
  authBottomSheetRef: null,
  authBottomSheetSnapPoints: [height * 0.45],
};

const authStore = create<AuthStore & GlobalActions>(set => ({
  ...globalInitialState,

  //   actions
  setAuthNavigation: nav =>
    set({
      authNavigation: nav,
    }),

  navigate: screen =>
    set(state => {
      if (state.authNavigation) {
        state.authNavigation.navigate(screen);
      }

      return {};
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

  resetAuthStore: () => set(globalInitialState),
}));

export default createSelectors(authStore);
