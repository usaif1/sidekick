// dependencies
import {View, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import useLocationStore from '@/modules/home/store/locationStore';
import {HubLocation, PolylineCoordinates} from '@/modules/home/types/mapTypes';
import Geolocation from '@react-native-community/geolocation';
import {updatePolylineAndFitMap} from '@/modules/home/utilis/updatePolylineAndFitMap';
import {mapStyles} from '@/modules/home/utilis/mapStyle';
import {scooterHubs} from '@/modules/home/data/scooterHubs';

// components
import requestLocationPermission from '@/components/LocationPermission';
import UserLocationMarker from '@/modules/home/components/UserLocationMarker';
import NearestHubMarker from '@/modules/home/components/NearestHubMarker';
import {RideDetails} from '../components';
import {useGlobalStore} from '@/globalStore';
import {GlobalModal} from '@/components';

const RideScreen: React.FC = () => {
  const latitude = useLocationStore(state => state.latitude);
  const longitude = useLocationStore(state => state.longitude);
  const setLocation = useLocationStore(state => state.setLocation);

  const [selectedHub, setSelectedHub] = useState<HubLocation>(null);
  const mapRef = useRef<MapView>(null);
  const [polylineCoords, setPolylineCoords] = useState<PolylineCoordinates>([]);
  const [heading, setHeading] = useState<number>(0);

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

  useEffect(() => {
    getCurrentLocation();
    requestLocationPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const {polylineCoords, heading} = updatePolylineAndFitMap(
      selectedHub,
      latitude,
      longitude,
      mapRef,
    );
    setPolylineCoords(polylineCoords);
    setHeading(heading);
  }, [selectedHub, latitude, longitude]);

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

        {polylineCoords.length > 0 && (
          <Polyline
            coordinates={polylineCoords}
            strokeWidth={4}
            strokeColor="#296AEB"
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
