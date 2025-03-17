// dependencies
import {create} from 'zustand';
import {RefObject} from 'react';

// utils
import createSelectors from '@/utils/selectors';

// types
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

type GlobalStore = {
  firsTime: boolean;
  loggedIn: boolean;

  // Modal
  isModalOpen: boolean;
  ModalComponent: React.FC | null;
  closeModalCallback: (() => void) | null;

  // bottom sheet
  BottomSheetComponent: React.FC | null;
  bottomSheetRef: RefObject<BottomSheetMethods | null> | null;
  closeBottomSheetCallback: (() => void) | null;
};

type GlobalActions = {
  // modal actions
  openModal: (Component: React.FC, onClose?: () => void) => void;
  closeModal: () => void;

  // bottom sheet actions
  setBottomSheetRef: (ref: RefObject<BottomSheetMethods | null>) => void;
  setBottomSheetComponent: (Component: React.FC) => void;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;

  // reset store
  resetGlobalStore: () => void;
};

const globalInitialState: GlobalStore = {
  firsTime: true,
  loggedIn: false,

  // Modal
  isModalOpen: false,
  ModalComponent: null,
  closeModalCallback: null,

  // bottom sheet
  BottomSheetComponent: null,
  bottomSheetRef: null,
  closeBottomSheetCallback: null,
};

const globalStore = create<GlobalStore & GlobalActions>(set => ({
  ...globalInitialState,

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
  setBottomSheetComponent: Component =>
    set({
      BottomSheetComponent: Component,
    }),

  openBottomSheet: () =>
    set(state => {
      if (state.bottomSheetRef?.current) {
        state.bottomSheetRef.current.expand();
      }
      return {};
    }),

  setBottomSheetRef: ref =>
    set({
      bottomSheetRef: ref,
    }),

  closeBottomSheet: () =>
    set(state => {
      if (state.closeBottomSheetCallback) {
        state.closeBottomSheetCallback();
      }
      if (state.bottomSheetRef && state.bottomSheetRef?.current) {
        state.bottomSheetRef.current.close();
      }
      return {};
    }),

  resetGlobalStore: () => set(globalInitialState),
}));

export default createSelectors(globalStore);
