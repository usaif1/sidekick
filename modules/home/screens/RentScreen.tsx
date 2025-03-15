import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import useLocationStore from "../store/locationStore";
import { scooterHubs } from "../data/scooterHubs";
import { mapStyles } from "../utilis/mapStyle";
import NearestHubMarker from "../components/NearestHubMarker";
import ButtonWithIcon from "@/components/ButtonWithIcon";
import ScanIcon from "../assets/scanIcon.svg";
import globalStore from "@/globalStore/globalStore";
import ScanQrCodeComponent from "../components/ScanQrCodeComponent";
import { HubLocation, PolylineCoordinates } from "../types/mapTypes";
import { updatePolylineAndFitMap } from "../utilis/updatePolylineAndFitMap";
import UserLocationMarker from "../components/UserLocationMarker";
import RideDetailsBottomSheet from "@/modules/rides/components/RideDetailsBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

const RentScreen: React.FC = () => {
  const latitude = useLocationStore(state => state.latitude);
  const longitude = useLocationStore(state => state.longitude);
  const setLocation = useLocationStore(state => state.setLocation);

  const openModal = globalStore.use.openModal();
  const [selectedHub, setSelectedHub] = useState<HubLocation>(null);
  const mapRef = useRef<MapView>(null);
  const [polylineCoords, setPolylineCoords] = useState<PolylineCoordinates>([]);
  const [heading, setHeading] = useState<number>(0);
  const rideDetailsBottomSheetRef = useRef<BottomSheet>(null);

  const handleOpenModal = () => {
    openModal(ScanQrCodeComponent);
  };

  const handleOpenRideDetails = () => {
    rideDetailsBottomSheetRef.current?.expand();
  };

  const handleCloseRideDetails = () => {
    rideDetailsBottomSheetRef.current?.close();
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission denied");
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
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }
        },
        (error) => console.log("Error getting current location:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, [setLocation]);
  
  useEffect(() => {
    const { polylineCoords, heading } = updatePolylineAndFitMap(selectedHub, latitude, longitude, mapRef);
    setPolylineCoords(polylineCoords); 
    setHeading(heading); 
  }, [selectedHub, latitude, longitude]);

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
        }}
      >
        {latitude && longitude && (
          <UserLocationMarker latitude={latitude} longitude={longitude} heading={heading} />
        )}
        {scooterHubs.map((hub) => (
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
        ))}

        {polylineCoords.length > 0 && (
          <Polyline coordinates={polylineCoords} strokeWidth={4} strokeColor="#296AEB" />
        )}
      </MapView>
      <View style={styles.bottomContainer}>
        <ButtonWithIcon 
          variant="primary" 
          onPress={handleOpenRideDetails} 
          IconComponent={ScanIcon}
        >
          Unlock
        </ButtonWithIcon>
      </View>
      
      <RideDetailsBottomSheet
        ref={rideDetailsBottomSheetRef}
        onClose={handleCloseRideDetails}
        rideData={{
          id: 'ride-123',
          from: 'Current Location',
          to: selectedHub ? `Hub: ${scooterHubs.find(hub => hub.id.toString() === selectedHub.id)?.name || 'Selected Hub'}` : 'Destination Hub',
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          price: '150',
          distance: polylineCoords.length > 0 ? '2.5 km' : '0 km',
          duration: '15 mins',
          driverName: 'You',
          driverRating: 5.0,
          vehicleType: 'Electric Scooter',
          vehicleNumber: 'SC-1234',
        }}
      />
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
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

export default RentScreen;
