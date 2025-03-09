import React from 'react';
import { Marker } from 'react-native-maps';
import HubMarkerIcon from '../assets/hubMarkerIcon.svg';

type Props = {
  latitude: number;
  longitude: number;
  name: string;
  HubIcon?: React.FC; 
};

const NearestHubMarker: React.FC<Props> = ({ latitude, longitude, name, HubIcon }) => {
  return (
    <Marker coordinate={{ latitude, longitude }} title={name}>
      <HubMarkerIcon />
    </Marker>
  );
};

export default NearestHubMarker;
