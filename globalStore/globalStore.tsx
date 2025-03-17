// dependencies
import {create} from 'zustand';
import {RefObject} from 'react';

// utils
import createSelectors from '@/utils/selectors';

// types
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

// components
import {RideDetails} from '@/modules/ride/components';

type GlobalStore = {
  firsTime: boolean;
  loggedIn: boolean;
  navigator: any;

  // Modal
  isModalOpen: boolean;
  ModalComponent: React.FC | null;
  closeModalCallback: (() => void) | null;

  // bottom sheet
  GlobalBottomSheetComponent: React.FC | null;
  globalBottomSheetRef: RefObject<BottomSheetMethods | null> | null;
  closeGlobalBottomSheetCallback: (() => void) | null;
  globalBottomSheetSnapPoints: any[];
};

type GlobalActions = {
  setNavigator: (nav: any) => void;

  // modal actions
  openModal: (Component: React.FC, onClose?: () => void) => void;
  closeModal: () => void;

  // bottom sheet actions
  setGlobalBottomSheetRef: (ref: RefObject<BottomSheetMethods | null>) => void;
  setGlobalBottomSheetComponent: (Component: React.FC) => void;
  openGlobalBottomSheet: () => void;
  closeBottomSheet: () => void;
  setGlobalBottomSheetSnapPoints: (snapPoints: any) => void;

  // reset store
  resetGlobalStore: () => void;
};

const globalInitialState: GlobalStore = {
  firsTime: true,
  loggedIn: false,
  navigator: null,

  // Modal
  isModalOpen: false,
  ModalComponent: null,
  closeModalCallback: null,

  // bottom sheet
  GlobalBottomSheetComponent: RideDetails,
  globalBottomSheetRef: null,
  closeGlobalBottomSheetCallback: null,
  globalBottomSheetSnapPoints: [200, 400],
};

const globalStore = create<GlobalStore & GlobalActions>(set => ({
  ...globalInitialState,

  setNavigator: nav =>
    set({
      navigator: nav,
    }),

  // modal actions
  openModal: (Component, onClose) =>
    set({
      isModalOpen: true,
      ModalComponent: Component,
      closeModalCallback: onClose || null,
    }),

  closeModal: () =>
    set(state => {
      if (state.closeModalCallback) {
        state.closeModalCallback();
      }
      return {
        isModalOpen: false,
        ModalComponent: null,
        closeModalCallback: null,
      };
    }),

  // bottom sheet actions
  setGlobalBottomSheetComponent: Component =>
    set({
      GlobalBottomSheetComponent: Component,
    }),

  openGlobalBottomSheet: () =>
    set(state => {
      if (state.globalBottomSheetRef?.current) {
        state.globalBottomSheetRef.current.expand();
      }
      return {};
    }),

  setGlobalBottomSheetRef: ref =>
    set({
      globalBottomSheetRef: ref,
    }),

  closeBottomSheet: () =>
    set(state => {
      if (state.closeGlobalBottomSheetCallback) {
        state.closeGlobalBottomSheetCallback();
      }
      if (state.globalBottomSheetRef && state.globalBottomSheetRef?.current) {
        state.globalBottomSheetRef.current.close();
      }
      return {};
    }),

  setGlobalBottomSheetSnapPoints: snapPoints =>
    set({
      globalBottomSheetSnapPoints: snapPoints,
    }),

  resetGlobalStore: () => set(globalInitialState),
}));

export default createSelectors(globalStore);
