import React from 'react';
import { Marker } from 'react-native-maps';
import HubMarkerIcon from '../assets/hubMarkerIcon.svg';
import NavigationPointerIcon from '../assets/navigationPointer.svg';

type Props = {
  latitude: number;
  longitude: number;
  name: string;
  isSelected: boolean;
  onPress: () => void;
};

const NearestHubMarker: React.FC<Props> = ({ latitude, longitude, name, isSelected, onPress }) => {
  return (
    <Marker coordinate={{ latitude, longitude }} title={name} onPress={onPress} anchor={{ x: 0.5, y: 0.5 }} >
      {isSelected ? <NavigationPointerIcon /> : <HubMarkerIcon />}
    </Marker>
  );
};

export default NearestHubMarker;
