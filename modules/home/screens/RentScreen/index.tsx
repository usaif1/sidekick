// dependencies
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// store
import useLocationStore from '../../store/locationStore';
import {useAuthStore, useGlobalStore} from '@/globalStore';
import useRideStore from '@/modules/ride/store';

// services
import {RideService, UserService, LocationService} from '@/globalService';
import {mapStyles} from '../../utilis/mapStyle';
import {authUtils} from '@/modules/authentication/utils';
import {findNearestHub} from '../../utilis/distanceUtils';

// components
import ScanQrCodeComponent from '../../components/ScanQrCodeComponent';
import UserLocationMarker from '../../components/UserLocationMarker';
import LocationLoadingModal from '../../components/LocationLoadingModal';
import ActionButtons from './components';
import {useFocusEffect} from '@react-navigation/native';
import GlobalModal from '@/components/GlobalModal';
import HubMarkers from '../../components/HubMarkers';
import {checkAndRequestPermission} from '@/utils/permissionsHelper';
import {PERMISSIONS} from 'react-native-permissions';

const RentScreen: React.FC = () => {
  const {closeBottomSheet} = useGlobalStore();

  const {latitude, longitude, hasUserLocation, isLocationLoading} = useLocationStore();
  const {stopLoading} = useAuthStore();
  const {openModal, setModalComponent} = useGlobalStore();
  const {selectedHub, setSelectedHub, hubs} = useRideStore();
  const mapRef = useRef<MapView>(null);
  const [heading, setHeading] = useState<number>(0);

  const handleOpenModal = async () => {
    // 1. Location (used for BLE scanning pre-Android 12)
    const locationPermission = await checkAndRequestPermission(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      'Location',
    );
    if (!locationPermission) return;

    // 2. Camera
    const cameraPermission = await checkAndRequestPermission(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
      'Camera',
    );
    if (!cameraPermission) return;

    // 3. Bluetooth (only needed for Android 12+ and iOS)
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      const bluetoothScanPermission = await checkAndRequestPermission(
        PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        'Bluetooth Scan',
      );
      const bluetoothConnectPermission = await checkAndRequestPermission(
        PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        'Bluetooth Connect',
      );
      if (!bluetoothScanPermission || !bluetoothConnectPermission) return;
    }

    if (Platform.OS === 'ios') {
      const bluetoothPermission = await checkAndRequestPermission(
        PERMISSIONS.IOS.BLUETOOTH,
        'Bluetooth',
      );
      if (!bluetoothPermission) return;
    }

    setModalComponent(ScanQrCodeComponent);
    openModal();
  };

  const getCurrentLocation = async () => {
    try {
      const coordinates = await LocationService.getCurrentLocationAndUpdateStore();
      if (coordinates && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
      return coordinates;
    } catch (error) {
      console.log('Error getting current location:', error);
      return null;
    }
  };

  useEffect(() => {
    authUtils.setBottomSheetView('welcome');
    RideService.fetchAllHubs();
    UserService.fetchUserDetails();
    stopLoading('otp-verification');
    
    // Handle location when user reaches home screen after login
    const handleLocationAfterLogin = async () => {
      try {
        // Use the comprehensive location service with map animation
        const coordinates = await LocationService.handleLocationOnLogin(mapRef);
        console.log('Location handled after reaching home screen:', coordinates);
      } catch (error) {
        console.error('Error handling location after login:', error);
      }
    };
    
    // Call location handling after a short delay to ensure the screen is mounted
    setTimeout(() => {
      handleLocationAfterLogin();
    }, 500);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for location changes and animate map to user location
  useEffect(() => {
    if (hasUserLocation && latitude && longitude && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [hasUserLocation, latitude, longitude]);

  useFocusEffect(
    useCallback(() => {
      closeBottomSheet();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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

  useEffect(() => {
    // fetchCameraDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      {/* rent action buttons */}
      <ActionButtons
        containerStyles={styles.bottomContainer}
        handleOpenModal={handleOpenModal}
        onSelectNearestHub={handleSelectNearestHub}
      />

      <GlobalModal />
      
      {/* Location loading modal */}
      <LocationLoadingModal visible={isLocationLoading} />
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
