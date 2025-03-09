// dependencies
import {create} from 'zustand';

// utils
import createSelectors from '@/utils/selectors';

type GlobalStore = {
  firsTime: boolean;

  // modal
  isModalOpen: boolean;
  closeModalCallback: () => void;
};

type GlobalActions = {
  openModal: () => void;
  closeModal: () => void;

  // reset modal store
  resetGlobalStore: () => void;
};

const globalInitialState: GlobalStore = {
  firsTime: true,
  // modal

  isModalOpen: false,
  closeModalCallback: () => null,
};

const globalStore = create<GlobalStore & GlobalActions>(set => ({
  ...globalInitialState,
  openModal: () => set({isModalOpen: true}),
  closeModal: () => set({isModalOpen: false}),

  // reset address store
  resetGlobalStore: () => set(globalInitialState),
}));

export default createSelectors(globalStore);
