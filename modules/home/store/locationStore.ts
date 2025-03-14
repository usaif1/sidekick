import { create } from 'zustand';

interface LocationState {
  latitude: number;
  longitude: number;
  heading: number; 
  setLocation: (lat: number, lng: number) => void;
  setHeading: (heading: number) => void;
}

const useLocationStore = create<LocationState>(set => ({
  latitude: 28.7041,
  longitude: 77.1025,
  heading: 0, 
  setLocation: (lat, lng, heading = 0) => set({ latitude: lat, longitude: lng, heading }),
  setHeading: (heading) => set({ heading }), 
}));

export default useLocationStore;
