import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import MapView, {Polyline, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import useLocationStore from '../store/locationStore';

// Assets

// import ButtonWithIcon from '@/components/ButtonWithIcon';
// import ScanIcon from '../assets/scanIcon.svg';

import {scooterHubs} from '../data/scooterHubs';
import UserLocationMarker from '../components/UserLocationMarker';
import NearestHubMarker from '../components/NearestHubMarker';
// import ScanQrCodeComponent from "../components/ScanQrCodeComponent"; 
import { mapStyle } from '../utilis/mapStyle';
// import { calculateHeading } from '../utilis/calculateHeading';
// import globalStore from '@/globalStore/globalStore';

const RentScreen: React.FC = () => {
  const {latitude, longitude, setLocation} = useLocationStore();
  // const openModal = globalStore.use.openModal();
  const [selectedHub, setSelectedHub] = useState<{ id: string | undefined; latitude: number; longitude: number } | null>(null);
  const mapRef = useRef<MapView>(null); 
  const [mapCenter, setMapCenter] = useState<{ latitude: number; longitude: number }>({
    latitude: latitude || 28.7041,
    longitude: longitude || 77.1025,
  });
  const onRegionChangeComplete = (region: Region) => {
    setMapCenter({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

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
      // getCurrentLocation();
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('Updated location:', { latitude: lat, longitude: lng });

          setLocation(lat, lng);
          setMapCenter({
            latitude: lat,
            longitude: lng,
          });

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

    getCurrentLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const UnlockModalContent: React.FC = () => {
  //   return <View><Text style={{ fontSize: 20 }}>Hello</Text></View>;
  // };
  

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        zoomEnabled={true}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        customMapStyle={mapStyle}
        key={'AIzaSyA4_-URnAPZCngJLIbQ9mhMuy-Lq1-iz-Y'}
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
        {scooterHubs.map((hub) => (
          <NearestHubMarker
          key={hub.id}
          latitude={hub.latitude}
          longitude={hub.longitude}
          name={hub.name}
          isSelected={Number(selectedHub?.id) === hub.id}
          onPress={(e) => {
            e.stopPropagation(); 
            setSelectedHub((prevHub) =>
              prevHub?.id === hub.id.toString() ? null : { id: hub.id.toString(), latitude: hub.latitude, longitude: hub.longitude });}}
            />
          ))}

        {selectedHub && (
          <Polyline
            coordinates={[
              { latitude: mapCenter.latitude, longitude: mapCenter.longitude }, 
              { latitude: selectedHub.latitude, longitude: selectedHub.longitude }, 
            ]}
            strokeColor="#296AEB"
            strokeWidth={4}
            geodesic={true}
          />
        )}
      </MapView>

      {/* <View style={styles.bottomContainer}>
        <ButtonWithIcon
          variant="primary"
          onPress={() => openModal(ScanQrCodeComponent)}
          IconComponent={ScanIcon}>
          Unlock
        </ButtonWithIcon>
      </View> */}
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
