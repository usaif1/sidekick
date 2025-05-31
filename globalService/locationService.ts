import Geolocation from '@react-native-community/geolocation';
import {Alert, Platform} from 'react-native';
import {showToast} from '@/components';
import {ensureBluetoothPermissions, checkAndRequestPermission} from '@/utils/permissionsHelper';
import {PERMISSIONS} from 'react-native-permissions';
import useLocationStore from '@/modules/home/store/locationStore';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationServiceConfig {
  timeout?: number;
  maximumAge?: number;
  enableHighAccuracy?: boolean;
}

const DEFAULT_CONFIG: LocationServiceConfig = {
  timeout: 15000,
  maximumAge: 10000,
  enableHighAccuracy: true,
};

const LocationService = {
  // Request location permissions
  requestLocationPermissions: async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const fineLocationGranted = await checkAndRequestPermission(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          'Fine Location',
          true
        );
        
        const coarseLocationGranted = await checkAndRequestPermission(
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          'Coarse Location',
          true
        );

        return fineLocationGranted && coarseLocationGranted;
      } else if (Platform.OS === 'ios') {
        const locationWhenInUseGranted = await checkAndRequestPermission(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          'Location When In Use',
          true
        );
        
        return locationWhenInUseGranted;
      }
      
      return false;
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      showToast({
        type: 'error',
        text1: 'Permission Error',
        text2: 'Failed to request location permissions',
      });
      return false;
    }
  },

  // Get current location with promise
  getCurrentLocation: (config: LocationServiceConfig = DEFAULT_CONFIG): Promise<LocationCoordinates> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const coordinates: LocationCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(coordinates);
        },
        (error) => {
          console.error('Error getting current location:', error);
          reject(error);
        },
        {
          enableHighAccuracy: config.enableHighAccuracy ?? DEFAULT_CONFIG.enableHighAccuracy,
          timeout: config.timeout ?? DEFAULT_CONFIG.timeout,
          maximumAge: config.maximumAge ?? DEFAULT_CONFIG.maximumAge,
        }
      );
    });
  },

  // Get current location and update store
  getCurrentLocationAndUpdateStore: async (
    config: LocationServiceConfig = DEFAULT_CONFIG
  ): Promise<LocationCoordinates | null> => {
    try {
      // Set loading state
      const {setLocationLoading} = useLocationStore.getState();
      setLocationLoading(true);
      
      // First ensure we have location permissions
      const hasPermissions = await LocationService.requestLocationPermissions();
      
      if (!hasPermissions) {
        setLocationLoading(false);
        showToast({
          type: 'error',
          text1: 'Permission Required',
          text2: 'Location permissions are required to show your position',
        });
        return null;
      }

      // Get current location
      const coordinates = await LocationService.getCurrentLocation(config);
      
      // Update the location store (this will set hasUserLocation: true and isLocationLoading: false)
      const {setLocation} = useLocationStore.getState();
      setLocation(coordinates.latitude, coordinates.longitude);
      
      console.log('Location updated:', coordinates);
      
      showToast({
        type: 'success',
        text1: 'Location Found',
        text2: 'Your location has been updated',
      });
      
      return coordinates;
    } catch (error) {
      // Clear loading state on error
      const {setLocationLoading} = useLocationStore.getState();
      setLocationLoading(false);
      
      console.error('Error getting location and updating store:', error);
      
      // Handle specific error types
      if ((error as any).code === 1) { // PERMISSION_DENIED
        showToast({
          type: 'error',
          text1: 'Permission Denied',
          text2: 'Please enable location permissions in settings',
        });
      } else if ((error as any).code === 2) { // POSITION_UNAVAILABLE
        showToast({
          type: 'error',
          text1: 'Location Unavailable',
          text2: 'Unable to retrieve your location',
        });
      } else if ((error as any).code === 3) { // TIMEOUT
        showToast({
          type: 'error',
          text1: 'Location Timeout',
          text2: 'Location request timed out. Please try again.',
        });
      } else {
        showToast({
          type: 'error',
          text1: 'Location Error',
          text2: 'Failed to get your current location',
        });
      }
      
      return null;
    }
  },

  // Set map region to user location
  animateMapToUserLocation: (
    mapRef: React.RefObject<any>, 
    coordinates?: LocationCoordinates,
    latitudeDelta: number = 0.01,
    longitudeDelta: number = 0.01
  ) => {
    const {latitude, longitude} = useLocationStore.getState();
    
    const targetLocation = coordinates || {latitude, longitude};
    
    if (!targetLocation.latitude || !targetLocation.longitude) {
      console.warn('No valid coordinates to animate to');
      return;
    }

    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: targetLocation.latitude,
        longitude: targetLocation.longitude,
        latitudeDelta,
        longitudeDelta,
      });
    }
  },

  // Handle location on login (main function for the feature request)
  handleLocationOnLogin: async (
    mapRef?: React.RefObject<any>,
    config: LocationServiceConfig = DEFAULT_CONFIG
  ): Promise<LocationCoordinates | null> => {
    console.log('Handling location on login...');
    
    try {
      // Get current location and update store
      const coordinates = await LocationService.getCurrentLocationAndUpdateStore(config);
      
      if (coordinates && mapRef) {
        // Animate map to user location with a slight delay to ensure map is ready
        setTimeout(() => {
          LocationService.animateMapToUserLocation(mapRef, coordinates);
        }, 500);
      }
      
      return coordinates;
    } catch (error) {
      console.error('Error handling location on login:', error);
      return null;
    }
  },

  // Watch position (for real-time tracking)
  watchPosition: (
    callback: (coordinates: LocationCoordinates) => void,
    config: LocationServiceConfig = DEFAULT_CONFIG
  ): number => {
    return Geolocation.watchPosition(
      (position) => {
        const coordinates: LocationCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        callback(coordinates);
      },
      (error) => {
        console.error('Error watching position:', error);
      },
      {
        enableHighAccuracy: config.enableHighAccuracy ?? DEFAULT_CONFIG.enableHighAccuracy,
        timeout: config.timeout ?? DEFAULT_CONFIG.timeout,
        maximumAge: config.maximumAge ?? DEFAULT_CONFIG.maximumAge,
        distanceFilter: 10, // Update every 10 meters
      }
    );
  },

  // Clear watch
  clearWatch: (watchId: number) => {
    Geolocation.clearWatch(watchId);
  },
};

export default LocationService; 