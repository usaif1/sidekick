// dependencies
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
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
import DirectionsComponent from '@/modules/home/screens/RentScreen/components/DirectionsComponent';
import {RideDetails} from '../components';
import {GlobalModal} from '@/components';

const RideScreen: React.FC = () => {
  const latitude = useLocationStore(state => state.latitude);
  const longitude = useLocationStore(state => state.longitude);
  const setLocation = useLocationStore(state => state.setLocation);

  const {selectedHub, setSelectedHub, hubs} = useRideStore();

  const mapRef = useRef<MapView>(null);
  const {
    setTimerInterval,
    interval,

    setTotalCost,
    isPaused,
    perMinuteRate,
    secondsElapsed,
    setIsPaused,
    setSecondsElapsed,
  } = useRideStore();

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
    if (!isPaused) {
      const newInterval = setInterval(() => {
        setSecondsElapsed((prev: number) => prev + 1); // ✅ correctly using prev value
      }, 1000);

      setTimerInterval(newInterval);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  useEffect(() => {
    setTotalCost(Math.ceil(secondsElapsed / 60) * perMinuteRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsElapsed]);

  useEffect(() => {
    return () => {
      // Small delay to allow the above to register
      setTimeout(() => {
        setIsPaused(false);
        setSecondsElapsed(0);
        setTotalCost(0);
      }, 100); // 👈 allows re-triggering RideDetails timer
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [heading, setHeading] = useState<number>(0);

  const handleSelectNearestHub = useCallback(() => {
    if (!latitude || !longitude || hubs.length === 0) {
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
  }, [latitude, longitude, hubs]);

  useEffect(() => {
    if (latitude && longitude && hubs.length > 0) {
      handleSelectNearestHub();
    }
  }, [latitude, longitude, hubs, handleSelectNearestHub]);

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
        {latitude && longitude && (
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
        {selectedHub &&
          selectedHub.latitude &&
          selectedHub.longitude &&
          latitude &&
          longitude && (
            <DirectionsComponent
              origin={{latitude, longitude}}
              destination={selectedHub}
              mapRef={mapRef as React.RefObject<MapView>}
              onHeadingChange={setHeading}
            />
          )}
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
