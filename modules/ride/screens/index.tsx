// dependencies
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, StyleSheet, AppState} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// stores
import useLocationStore from '@/modules/home/store/locationStore';
import {useGlobalStore, useRideStore} from '@/globalStore';

// utils and components
import {mapStyles} from '@/modules/home/utilis/mapStyle';
import {findNearestHub} from '@/modules/home/utilis/distanceUtils';
import requestLocationPermission from '@/components/LocationPermission';
import UserLocationMarker from '@/modules/home/components/UserLocationMarker';
import HubMarkers from '@/modules/home/components/HubMarkers';
import {RideDetails} from '../components';
import {GlobalModal} from '@/components';
import {RideService} from '@/globalService';
import rideStorage from '../storage';

const RideScreen: React.FC = () => {
  const latitude = useLocationStore(state => state.latitude);
  const longitude = useLocationStore(state => state.longitude);
  const hasUserLocation = useLocationStore(state => state.hasUserLocation);
  const setLocation = useLocationStore(state => state.setLocation);

  const {selectedHub, setSelectedHub, hubs} = useRideStore();

  const mapRef = useRef<MapView>(null);
  const {
    setTimerInterval,
    interval,
    setTotalCost,
    isPaused,
    perMinuteRate,
    pausedPerMinuteRate,
    secondsElapsed,
    activeSecondsElapsed,
    pausedSecondsElapsed,
    setIsPaused,
    setSecondsElapsed,
    incrementActiveTime,
    incrementPausedTime,
    resetRideStore,
    syncTimerWithServer,
    rideStartTime,
  } = useRideStore();

  // App state for background/foreground detection
  const appState = useRef(AppState.currentState);

  // Function to calculate paused time from ride steps
  const calculatePausedTime = (rideSteps: any[]) => {
    let pausedSeconds = 0;
    let pauseStart: string | null = null;

    rideSteps
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .forEach(step => {
        if (step.steps === 'RIDE_PAUSED') {
          pauseStart = step.created_at;
        } else if (step.steps === 'RIDE_RESUMED' && pauseStart) {
          const pauseEnd = step.created_at;
          const pauseDuration = new Date(pauseEnd).getTime() - new Date(pauseStart).getTime();
          pausedSeconds += Math.floor(pauseDuration / 1000);
          pauseStart = null;
        }
      });

    // If currently paused, add time since last pause
    if (pauseStart && isPaused) {
      const now = new Date().getTime();
      const currentPauseDuration = now - new Date(pauseStart).getTime();
      pausedSeconds += Math.floor(currentPauseDuration / 1000);
    }

    return pausedSeconds;
  };

  // Function to sync timer with server
  const syncWithServer = async () => {
    const currentRideId = rideStorage.getString('currentRideId');
    if (!currentRideId) return;

    try {
      console.log('🔄 Syncing timer with server...');
      const rideData = await RideService.fetchCurrentRide({id: currentRideId});
      
      if (rideData?.start_time) {
        const pausedTime = calculatePausedTime(rideData.ride_steps || []);
        syncTimerWithServer(rideData.start_time, pausedTime);
        console.log('✅ Timer synced successfully');
      }
    } catch (error) {
      console.error('❌ Error syncing timer:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation(lat, lng);
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      },
      error => {
        console.log('err', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getCurrentLocation();
    requestLocationPermission();
    
    // Load initial ride data and sync timer
    syncWithServer();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // App state listener for background/foreground detection
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground - sync timer with server
        console.log('📱 App came to foreground - syncing timer...');
        syncWithServer();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {setGlobalBottomSheetComponent, openGlobalBottomSheet} =
    useGlobalStore();

  // bottom sheet logic
  useEffect(() => {
    setGlobalBottomSheetComponent(RideDetails);
    setTimeout(() => {
      openGlobalBottomSheet();
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Timer always runs, but increments different counters based on pause state
    const newInterval = setInterval(() => {
      if (isPaused) {
        incrementPausedTime(); // Increment both total and paused time
      } else {
        incrementActiveTime(); // Increment both total and active time
      }
    }, 1000);

    setTimerInterval(newInterval);

    return () => {
      if (newInterval) {
        clearInterval(newInterval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]); // Re-create interval when pause state changes

  useEffect(() => {
    // Calculate cost using dual pricing: full rate for active time, half rate for paused time
    const activeCost = Math.ceil(activeSecondsElapsed / 60) * perMinuteRate;
    const pausedCost = Math.ceil(pausedSecondsElapsed / 60) * pausedPerMinuteRate;
    setTotalCost(activeCost + pausedCost);
    console.log('💰 Cost updated:', {
      activeSecondsElapsed,
      pausedSecondsElapsed,
      activeCost,
      pausedCost,
      totalCost: activeCost + pausedCost,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSecondsElapsed, pausedSecondsElapsed]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      // Clean up on unmount
      if (interval) {
        clearInterval(interval);
      }
      // Small delay to allow final updates
      setTimeout(() => {
        resetRideStore();
      }, 100);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [heading, setHeading] = useState<number>(0);

  const handleSelectNearestHub = useCallback(() => {
    if (!hasUserLocation || !latitude || !longitude || hubs.length === 0) {
      return;
    }

    const nearest = findNearestHub(latitude, longitude, hubs);
    if (!nearest) {
      // Alert.alert(
      //   'No Hubs Found',
      //   'There are no hubs available within 20km of your location.',
      // );
      return;
    }

    setSelectedHub(nearest);
    mapRef.current?.animateToRegion({
      latitude: nearest.latitude,
      longitude: nearest.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasUserLocation, latitude, longitude, hubs]);

  // Removed automatic nearest hub selection - let user manually select hubs if needed
  // useEffect(() => {
  //   if (hasUserLocation && latitude && longitude && hubs.length > 0) {
  //     handleSelectNearestHub();
  //   }
  // }, [hasUserLocation, latitude, longitude, hubs, handleSelectNearestHub]);

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        zoomEnabled={true}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        customMapStyle={mapStyles}
        initialRegion={{
          latitude: latitude || 28.7041,
          longitude: longitude || 77.1025,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {hasUserLocation && latitude && longitude && (
          <UserLocationMarker
            latitude={latitude}
            longitude={longitude}
            heading={heading}
          />
        )}
        <HubMarkers
          hubs={hubs}
          selectedHub={selectedHub}
          onHubSelect={setSelectedHub}
        />
      </MapView>

      <GlobalModal />
    </View>
  );
};

export default RideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
