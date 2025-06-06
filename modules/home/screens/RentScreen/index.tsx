// dependencies
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';

// store
import useLocationStore from '../../store/locationStore';
import {useAuthStore, useGlobalStore, useWalletStore} from '@/globalStore';
import useRideStore from '@/modules/ride/store';

// services
import {RideService, UserService, LocationService, WalletService} from '@/globalService';
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
  const navigation = useNavigation();
  const {closeBottomSheet} = useGlobalStore();

  const {latitude, longitude, hasUserLocation, isLocationLoading} = useLocationStore();
  const {stopLoading} = useAuthStore();
  const {openModal, setModalComponent} = useGlobalStore();
  const {selectedHub, setSelectedHub, hubs} = useRideStore();
  const {userWallet} = useWalletStore();
  const mapRef = useRef<MapView>(null);
  const [heading, setHeading] = useState<number>(0);

  // Debug: Log hub count
  console.log('🏠 RentScreen: Current hubs count:', hubs.length);

  const handleOpenModal = async () => {
    // Check wallet balance first
    console.log('🏦 Checking wallet balance:', userWallet?.balance);
    
    if (!userWallet || userWallet.balance <= 0) {
      console.log('❌ Insufficient balance. Redirecting to add funds.');
      // Direct navigation to add funds screen without alert
      // @ts-ignore
      navigation.navigate('walletNavigator', {screen: 'AddFundsScreen'});
      return;
    }

    console.log('✅ Sufficient balance. Proceeding to scanner.');

    // 1. Location (used for BLE scanning pre-Android 12)
    const locationPermission = await checkAndRequestPermission(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      'Location',
    );
    if (!locationPermission) return;

    // 2. Camera
    // const cameraPermission = await checkAndRequestPermission(
    //   Platform.OS === 'ios'
    //     ? PERMISSIONS.IOS.CAMERA
    //     : PERMISSIONS.ANDROID.CAMERA,
    //   'Camera',
    // );
    // if (!cameraPermission) return;

    // 3. Bluetooth (only needed for Android 12+ and iOS)
    // if (Platform.OS === 'android' && Platform.Version >= 31) {
    //   const bluetoothScanPermission = await checkAndRequestPermission(
    //     PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    //     'Bluetooth Scan',
    //   );
    //   const bluetoothConnectPermission = await checkAndRequestPermission(
    //     PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    //     'Bluetooth Connect',
    //   );
    //   if (!bluetoothScanPermission || !bluetoothConnectPermission) return;
    // }

    // if (Platform.OS === 'ios') {
    //   const bluetoothPermission = await checkAndRequestPermission(
    //     PERMISSIONS.IOS.BLUETOOTH,
    //     'Bluetooth',
    //   );
    //   if (!bluetoothPermission) return;
    // }

    setModalComponent(ScanQrCodeComponent);
    openModal();
  };

  useEffect(() => {
    authUtils.setBottomSheetView('welcome');
    
    // Fetch hubs with logging
    console.log('🏠 RentScreen: Fetching hubs...');
    RideService.fetchAllHubs()
      .then((fetchedHubs: any) => {
        console.log('✅ RentScreen: Hubs fetched successfully:', fetchedHubs.length);
      })
      .catch((error: any) => {
        console.error('❌ RentScreen: Error fetching hubs:', error);
      });
    
    UserService.fetchUserDetails();
    WalletService.fetchUserWallet();
    stopLoading('otp-verification');
    
    // Handle location - only fetch if we don't have user location yet
    const handleLocationAfterLogin = async () => {
      try {
        // Check location store directly to get current state
        const locationState = useLocationStore.getState();
        
        if (locationState.hasUserLocation && locationState.latitude && locationState.longitude) {
          // We already have location, just animate to it
          console.log('Using existing location:', {
            latitude: locationState.latitude, 
            longitude: locationState.longitude
          });
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: locationState.latitude,
              longitude: locationState.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        } else {
          // No location yet, fetch it for the first time
          console.log('Fetching location for the first time...');
          const coordinates = await LocationService.handleLocationOnLogin(mapRef);
          console.log('Location fetched and handled:', coordinates);
        }
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
      // Refresh wallet data when screen comes into focus
      WalletService.fetchUserWallet();
      
      // If we have existing location, animate to it when returning to screen
      const locationState = useLocationStore.getState();
      if (locationState.hasUserLocation && locationState.latitude && locationState.longitude && mapRef.current) {
        console.log('Returning to screen - animating to existing location');
        mapRef.current.animateToRegion({
          latitude: locationState.latitude,
          longitude: locationState.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
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
