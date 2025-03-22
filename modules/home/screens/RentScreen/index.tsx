// dependencies
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// store
import useLocationStore from '../../store/locationStore';
import {useGlobalStore} from '@/globalStore';

// utils
import {scooterHubs} from '../../data/scooterHubs';
import {mapStyles} from '../../utilis/mapStyle';
import NearestHubMarker from '../../components/NearestHubMarker';

import ScanQrCodeComponent from '../../components/ScanQrCodeComponent';
import {HubLocation} from '../../types/mapTypes';
import UserLocationMarker from '../../components/UserLocationMarker';
import ActionButtons from './components';
import {useNavigation} from '@react-navigation/native';
import GlobalModal from '@/components/GlobalModal';
import DirectionsComponent from './components/DirectionsComponent';

const RentScreen: React.FC = () => {
  const navigation = useNavigation();

  const {setNavigator} = useGlobalStore();

  const latitude = useLocationStore(state => state.latitude);
  const longitude = useLocationStore(state => state.longitude);
  const setLocation = useLocationStore(state => state.setLocation);

  const {openModal, setModalComponent} = useGlobalStore();
  const [selectedHub, setSelectedHub] = useState<HubLocation>(null);
  const mapRef = useRef<MapView>(null);
  const [heading, setHeading] = useState<number>(0);

  const handleOpenModal = () => {
    setModalComponent(ScanQrCodeComponent);
    openModal();
  };

  useEffect(() => {
    setNavigator(navigation);

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
        error => console.log('Error getting current location:', error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    requestLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLocation]);

  // useEffect(async () => {
  //   const {polylineCoords: newPolylineCoords, heading: newHeading} = await updatePolylineAndFitMap(
  //     selectedHub,
  //     latitude,
  //     longitude,
  //     mapRef,
  //   );
  //   setPolylineCoords(newPolylineCoords);
  //   setHeading(newHeading);
  // }, [selectedHub, latitude, longitude]);

  return (
    <View style={styles.container}>
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
        {scooterHubs.map(hub => (
          <NearestHubMarker
            key={hub.id}
            latitude={hub.latitude}
            longitude={hub.longitude}
            name={hub.name}
            isSelected={selectedHub?.id === hub.id.toString()}
            onPress={e => {
              e.stopPropagation();
              setSelectedHub(prevHub =>
                prevHub?.id === hub.id.toString()
                  ? null
                  : {
                      id: hub.id.toString(),
                      latitude: hub.latitude,
                      longitude: hub.longitude,
                    },
              );
            }}
          />
        ))}

        {selectedHub && selectedHub.latitude && selectedHub.longitude && latitude && longitude &&  (
          <DirectionsComponent
            origin={{latitude, longitude}}
            destination={selectedHub}
            mapRef={mapRef as React.RefObject<MapView>}
            onHeadingChange={setHeading}
          />
        )}
      </MapView>

      {/* rent action buttons */}
      <ActionButtons
        containerStyles={styles.bottomContainer}
        handleOpenModal={handleOpenModal}
      />

      <GlobalModal />
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
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default RentScreen;
