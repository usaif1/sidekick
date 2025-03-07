import { create } from 'zustand';

interface LocationState {
  latitude: number;
  longitude: number;
  setLocation: (lat: number, lng: number) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  latitude: 12.9716,
  longitude: 77.5946,
  setLocation: (lat, lng) => set({ latitude: lat, longitude: lng }),
}));

export default useLocationStore;
