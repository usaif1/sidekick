import React, {useEffect} from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import useLocationStore from '../store/locationStore';

// Assets
import UserPointerIcon from '../assets/userPointer.svg';
import ButtonWithIcon from '@/components/ButtonWithIcon';
import ScanIcon from '../assets/scanIcon.svg';

import {scooterHubs} from '../data/scooterHubs';
import UserLocationMarker from '../components/UserLocationMarker';
import NearestHubMarker from '../components/NearestHubMarker';

const RentScreen: React.FC = () => {
  const {latitude, longitude, setLocation} = useLocationStore();

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
      getCurrentLocation();
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('Current location:', {latitude: lat, longitude: lng});
          setLocation(lat, lng);
        },
        error => console.log('Error getting current location:', error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );

      Geolocation.watchPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('Updated location:', {latitude: lat, longitude: lng});
          setLocation(lat, lng);
        },
        error => console.log('Error watching location:', error),
        {enableHighAccuracy: true, distanceFilter: 1, interval: 1000},
      );
    };

    requestLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        key={'AIzaSyA4_-URnAPZCngJLIbQ9mhMuy-Lq1-iz-Y'}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}>
        <UserLocationMarker latitude={latitude} longitude={longitude} />

        {scooterHubs.map(hub => (
          <NearestHubMarker
            key={hub.id}
            latitude={hub.latitude}
            longitude={hub.longitude}
            name={hub.name}
          />
        ))}
      </MapView>

      <View style={styles.bottomContainer}>
        <ButtonWithIcon
          variant="primary"
          onPress={() => console.log('Unlock Pressed')}
          IconComponent={ScanIcon}>
          Unlock
        </ButtonWithIcon>
      </View>
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
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default RentScreen;
