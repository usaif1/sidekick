import { create } from 'zustand';

interface LocationState {
  latitude: number;
  longitude: number;
  hasUserLocation: boolean; // Flag to track if we have actual user location
  isLocationLoading: boolean; // Flag to track if location is being fetched
  setLocation: (lat: number, lng: number) => void;
  clearLocation: () => void; // Reset to default state
  setLocationLoading: (loading: boolean) => void; // Set loading state
}

const useLocationStore = create<LocationState>(set => ({
  latitude: 28.7041,
  longitude: 77.1025,
  hasUserLocation: false, // Initially false since these are default coordinates
  isLocationLoading: false, // Initially not loading
  setLocation: (lat, lng) => set({ latitude: lat, longitude: lng, hasUserLocation: true, isLocationLoading: false }),
  clearLocation: () => set({ latitude: 28.7041, longitude: 77.1025, hasUserLocation: false, isLocationLoading: false }),
  setLocationLoading: (loading) => set({ isLocationLoading: loading }),
}));

export default useLocationStore;
