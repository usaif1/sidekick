import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useLocationStore from '../store/locationStore';
import { scooterHubs } from '../data/scooterHubs';
import UserLocationMarker from '../components/UserLocationMarker';
import NearestHubMarker from '../components/NearestHubMarker';
import { mapStyle } from '../utilis/mapStyle';

const RentScreen: React.FC = () => {
  const { latitude, longitude, setLocation } = useLocationStore();
  const [selectedHub, setSelectedHub] = useState<{ id: string; latitude: number; longitude: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<{ latitude: number; longitude: number }>({
    latitude: latitude || 28.7041,
    longitude: longitude || 77.1025,
  });
  const mapRef = useRef<MapView>(null);

  const memoizedHubs = useMemo(() => scooterHubs, []);

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
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation(lat, lng);
          setMapCenter({ latitude: lat, longitude: lng });

          mapRef.current?.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        (error) => console.log('Error getting current location:', error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, [setLocation]);

  const onRegionChangeComplete = (region: Region) => {
    setMapCenter({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        zoomEnabled={true}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: latitude || 28.7041,
          longitude: longitude || 77.1025,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={onRegionChangeComplete} 
        onPress={(e) => e.stopPropagation()}
      >
        <UserLocationMarker />
        {/* {memoizedHubs.map((hub) => (
          <NearestHubMarker
            key={hub.id}
            latitude={hub.latitude}
            longitude={hub.longitude}
            name={hub.name}
            isSelected={selectedHub?.id === hub.id.toString()}
            onPress={(e) => {
              e.stopPropagation();
              setSelectedHub((prevHub) =>
                prevHub?.id === hub.id.toString()
                  ? null
                  : { id: hub.id.toString(), latitude: hub.latitude, longitude: hub.longitude }
              );
            }}
          />
        ))} */}

        {/* {selectedHub && (
          <Polyline
            coordinates={[
              { latitude: mapCenter.latitude, longitude: mapCenter.longitude }, 
              { latitude: selectedHub.latitude, longitude: selectedHub.longitude },
            ]}
            strokeColor="#296AEB"
            strokeWidth={4}
            geodesic={true}
          />
        )} */}
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

export default RentScreen;