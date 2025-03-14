import { create } from "zustand";

// utils
import createSelectors from "@/utils/selectors";

type GlobalStore = {
  firsTime: boolean;
  loggedIn: boolean;

  // Modal
  isModalOpen: boolean;
  ModalComponent: React.FC | null;
  closeModalCallback: (() => void) | null;
};

type GlobalActions = {
  openModal: (Component: React.FC, onClose?: () => void) => void;
  closeModal: () => void;
  resetGlobalStore: () => void;
};

const globalInitialState: GlobalStore = {
  firsTime: true,
  loggedIn: false,

  // Modal
  isModalOpen: false,
  ModalComponent: null,
  closeModalCallback: null,
};

const globalStore = create<GlobalStore & GlobalActions>((set) => ({
  ...globalInitialState,

  openModal: (Component, onClose) =>
    set({ isModalOpen: true, ModalComponent: Component, closeModalCallback: onClose || null }),

  closeModal: () =>
    set((state) => {
      if (state.closeModalCallback) {
        state.closeModalCallback(); 
      }
      return { isModalOpen: false, ModalComponent: null, closeModalCallback: null };
    }),

  resetGlobalStore: () => set(globalInitialState),
}));

export default createSelectors(globalStore);
