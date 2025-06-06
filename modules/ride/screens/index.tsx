// dependencies
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, StyleSheet, AppState, AppStateStatus} from 'react-native';
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
    try {
      let pausedSeconds = 0;
      let pauseStart: string | null = null;

      if (!Array.isArray(rideSteps)) {
        console.log('❌ Invalid ride steps data');
        return 0;
      }

      rideSteps
        .sort((a, b) => {
          try {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          } catch (error) {
            console.error('Error sorting ride steps:', error);
            return 0;
          }
        })
        .forEach(step => {
          try {
            if (step.steps === 'RIDE_PAUSED') {
              pauseStart = step.created_at;
            } else if (step.steps === 'RIDE_RESUMED' && pauseStart) {
              const pauseEnd = step.created_at;
              const pauseDuration = new Date(pauseEnd).getTime() - new Date(pauseStart).getTime();
              pausedSeconds += Math.floor(pauseDuration / 1000);
              pauseStart = null;
            }
          } catch (error) {
            console.error('Error processing ride step:', error);
          }
        });

      // If currently paused, add time since last pause
      if (pauseStart && isPaused) {
        try {
          const now = new Date().getTime();
          const currentPauseDuration = now - new Date(pauseStart).getTime();
          pausedSeconds += Math.floor(currentPauseDuration / 1000);
        } catch (error) {
          console.error('Error calculating current pause duration:', error);
        }
      }

      return pausedSeconds;
    } catch (error) {
      console.error('❌ Error in calculatePausedTime:', error);
      return 0;
    }
  };

  // Function to sync timer with server
  const syncWithServer = async () => {
    try {
      const currentRideId = rideStorage.getString('currentRideId');
      if (!currentRideId) {
        console.log('⚠️ No current ride ID found');
        return;
      }

      console.log('🔄 Syncing timer with server...');
      const rideData = await RideService.fetchCurrentRide({id: currentRideId});
      
      if (rideData?.start_time) {
        const pausedTime = calculatePausedTime(rideData.ride_steps || []);
        
        // Ensure we have valid data before syncing
        if (typeof pausedTime === 'number' && !isNaN(pausedTime)) {
          syncTimerWithServer(rideData.start_time, pausedTime);
          console.log('✅ Timer synced successfully');
        } else {
          console.log('⚠️ Invalid paused time calculated, skipping sync');
        }
      } else {
        console.log('⚠️ No start time found in ride data');
      }
    } catch (error) {
      console.error('❌ Error syncing timer:', error);
      // Don't crash the app, just log the error
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
    
    // Load initial ride data and sync timer with a slight delay
    const timeoutId = setTimeout(() => {
      syncWithServer();
    }, 1000);
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // App state listener for background/foreground detection
  useEffect(() => {
    let isComponentMounted = true;
    
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      try {
        console.log('📱 App state change:', {
          previous: appState.current,
          next: nextAppState,
          isComponentMounted
        });
        
        if (!isComponentMounted) {
          console.log('⚠️ Component unmounted, ignoring app state change');
          return;
        }
        
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
          // App has come to the foreground - sync timer with server
          console.log('📱 App came to foreground - syncing timer...');
          // Add delay to ensure app is fully active
          setTimeout(() => {
            if (isComponentMounted) {
              syncWithServer();
            }
          }, 500);
        }
        
        appState.current = nextAppState;
      } catch (error) {
        console.error('❌ Error in app state change handler:', error);
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      isComponentMounted = false;
      if (subscription?.remove) {
        subscription.remove();
      }
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
    console.log('🔄 Creating new timer interval, isPaused:', isPaused);
    
    const newInterval = setInterval(() => {
      try {
        if (isPaused) {
          incrementPausedTime(); // Increment both total and paused time
        } else {
          incrementActiveTime(); // Increment both total and active time
        }
      } catch (error) {
        console.error('❌ Error in timer interval:', error);
      }
    }, 1000);

    setTimerInterval(newInterval);
    console.log('✅ Timer interval created');

    return () => {
      console.log('🔄 Cleaning up timer interval');
      if (newInterval) {
        clearInterval(newInterval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]); // Re-create interval when pause state changes

  useEffect(() => {
    try {
      // Calculate cost using dual pricing: full rate for active time, half rate for paused time
      const activeCost = Math.ceil(activeSecondsElapsed / 60) * perMinuteRate;
      const pausedCost = Math.ceil(pausedSecondsElapsed / 60) * pausedPerMinuteRate;
      const newTotalCost = activeCost + pausedCost;
      
      // Validate the calculated cost
      if (isNaN(newTotalCost) || !isFinite(newTotalCost)) {
        console.error('❌ Invalid cost calculated, using 0');
        setTotalCost(0);
      } else {
        setTotalCost(newTotalCost);
      }
      
      console.log('💰 Cost updated:', {
        activeSecondsElapsed,
        pausedSecondsElapsed,
        activeCost,
        pausedCost,
        totalCost: newTotalCost,
      });
    } catch (error) {
      console.error('❌ Error calculating cost:', error);
      setTotalCost(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSecondsElapsed, pausedSecondsElapsed]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      console.log('🔄 Component unmounting - cleaning up');
      try {
        // Clean up on unmount
        if (interval) {
          clearInterval(interval);
          console.log('✅ Timer interval cleared');
        }
        
        // Use setTimeout to ensure cleanup happens after current execution
        const cleanupTimeout = setTimeout(() => {
          try {
            console.log('🔄 Resetting ride store');
            resetRideStore();
            console.log('✅ Ride store reset');
          } catch (error) {
            console.error('❌ Error resetting ride store:', error);
          }
        }, 100);
        
        // Also set a fallback cleanup
        setTimeout(() => {
          if (cleanupTimeout) {
            clearTimeout(cleanupTimeout);
          }
        }, 1000);
      } catch (error) {
        console.error('❌ Error in cleanup effect:', error);
      }
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
