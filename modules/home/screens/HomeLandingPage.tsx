import React, { useEffect } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import useLocationStore from '../store/locationStore';

import UserPointerIcon from '../assets/userPointer.svg';

const HomeLandingPage = () => {
  const { latitude, longitude, setLocation } = useLocationStore();

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
      getCurrentLocation();
    };

    const getCurrentLocation = () => {
      Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation(latitude, longitude);
        },
        error => console.log(error),
        { enableHighAccuracy: true, distanceFilter: 1, interval: 1000 }
      );
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={false}
        followsUserLocation={true}
        region={{
          latitude: latitude ?? 12.9716, 
          longitude: longitude ?? 77.5946, 
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {latitude !== null && longitude !== null && (
          <Marker coordinate={{ latitude, longitude }}>
            <UserPointerIcon width={32} height={32} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeLandingPage;
