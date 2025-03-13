import React, {useEffect, useState} from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform, Text} from 'react-native';
import MapView, {Polyline, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import useLocationStore from '../store/locationStore';

// Assets
import ButtonWithIcon from '@/components/ButtonWithIcon';
import ScanIcon from '../assets/scanIcon.svg';

import {scooterHubs} from '../data/scooterHubs';
import UserLocationMarker from '../components/UserLocationMarker';
import NearestHubMarker from '../components/NearestHubMarker';
import ScanQrCodeComponent from "../components/ScanQrCodeComponent"; 
import { mapStyle } from '../utilis/mapStyle';
import locationStore from '../store/locationStore';
import { calculateHeading } from '../utilis/calculateHeading';
import globalStore from '@/globalStore/globalStore';

const RentScreen: React.FC = () => {
  const {latitude, longitude, setLocation} = useLocationStore();
  const openModal = globalStore.use.openModal();
  const [selectedHub, setSelectedHub] = useState<{ id: string | undefined; latitude: number; longitude: number } | null>(null);
  const [userHeading, setUserHeading] = useState<number>(0);
  const onRegionChangeComplete = (region: Region) => {
    locationStore.setState((state) => ({
      ...state,
      mapCenter: { 
        lat: region.latitude,
        lng: region.longitude,
      },
    }));
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
      getCurrentLocation();
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log('Updated location:', { latitude: lat, longitude: lng });
          setLocation(lat, lng); 
        },
        error => console.log('Error getting current location:', error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const UnlockModalContent: React.FC = () => {
    return <View><Text style={{ fontSize: 20 }}>Hello</Text></View>;
  };
  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        customMapStyle={mapStyle}
        key={'AIzaSyA4_-URnAPZCngJLIbQ9mhMuy-Lq1-iz-Y'}
        initialRegion={{
          latitude: latitude as number,
          longitude: longitude as number,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={(e) => e.stopPropagation()}
        >
        <UserLocationMarker latitude={latitude} longitude={longitude} heading={userHeading}/>

        {scooterHubs.map(hub => (
          <NearestHubMarker
          key={hub.id}
          latitude={hub.latitude}
          longitude={hub.longitude}
          name={hub.name}
          isSelected={Number(selectedHub?.id) === hub.id}
          onPress={() => {
            if (Number(selectedHub?.id) === hub.id) {
              setSelectedHub(null);
            } else {
              const heading = calculateHeading(latitude, longitude, hub.latitude, hub.longitude);
              setUserHeading(heading); 
              setSelectedHub({
                id: hub.id.toString(),
                latitude: hub.latitude,
                longitude: hub.longitude,
              });
            }
          }}
          />
        ))}
        {selectedHub && (
        <Polyline
        coordinates={[
          { latitude: latitude + 0.0001, longitude }, 
          { latitude: selectedHub.latitude, longitude: selectedHub.longitude },
        ]}
        strokeColor="#296AEB"
        strokeWidth={4}
        geodesic={true}
      />
          )}

      </MapView>

      <View style={styles.bottomContainer}>
        <ButtonWithIcon
          variant="primary"
          onPress={() => openModal(ScanQrCodeComponent)}
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
