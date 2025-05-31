import React, {useEffect, useState} from 'react';
import {Marker} from 'react-native-maps';
import {Alert, Linking, Platform} from 'react-native';
import HubMarkerIcon from '../assets/hubMarkerIcon.svg';
import NavigationPointerIcon from '../assets/navigationPointer.svg';
import useLocationStore from '../store/locationStore';

type Props = {
  latitude: number;
  longitude: number;
  name: string;
  isSelected: boolean;
  onPress: (e: any) => void;
};

const NearestHubMarker: React.FC<Props> = ({
  latitude,
  longitude,
  name,
  isSelected,
  onPress,
}) => {
  const [trackChanges, setTrackChanges] = useState(true);
  const userLatitude = useLocationStore(state => state.latitude);
  const userLongitude = useLocationStore(state => state.longitude);
  const hasUserLocation = useLocationStore(state => state.hasUserLocation);

  // Debug logging
  console.log('🏷️ Hub marker:', { name, latitude, longitude, isSelected });

  useEffect(() => {
    setTrackChanges(true);
    const timer = setTimeout(() => {
      setTrackChanges(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isSelected]);

  const openGoogleMaps = () => {
    console.log('🎯 Opening Google Maps for hub:', name);
    
    const destination = `${latitude},${longitude}`;
    const origin = hasUserLocation ? `${userLatitude},${userLongitude}` : '';
    
    // Web-based Google Maps URL as fallback
    const webUrl = `https://www.google.com/maps/dir/${origin ? `${origin}/` : ''}${destination}`;
    
    if (Platform.OS === 'android') {
      // Android: Try geo URL first
      const geoUrl = `geo:${destination}?q=${destination}`;
      
      Linking.openURL(geoUrl)
        .catch(() => {
          // If geo fails, try web
          Linking.openURL(webUrl)
            .catch(() => {
              Alert.alert('Error', 'Unable to open maps. Please install Google Maps or check your internet connection.');
            });
        });
    } else {
      // iOS: Try Apple Maps
      const appleMapsUrl = `http://maps.apple.com/?daddr=${destination}${origin ? `&saddr=${origin}` : ''}`;
      
      Linking.openURL(appleMapsUrl)
        .catch(() => {
          // If Apple Maps fails, try web
          Linking.openURL(webUrl)
            .catch(() => {
              Alert.alert('Error', 'Unable to open maps. Please check your internet connection.');
            });
        });
    }
  };

  const handleMarkerPress = (e: any) => {
    onPress(e); // Call the original onPress for marker selection
    openGoogleMaps(); // Also open Google Maps
  };

  return (
    <Marker
      coordinate={{latitude, longitude}}
      onPress={handleMarkerPress}
      anchor={{x: 0.5, y: 0.5}}
      tracksViewChanges={trackChanges}>
      {isSelected ? <NavigationPointerIcon /> : <HubMarkerIcon />}
    </Marker>
  );
};

export default NearestHubMarker;
