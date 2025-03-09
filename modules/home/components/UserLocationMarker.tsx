import React from 'react';
import { Marker } from 'react-native-maps';
import UserPointerIcon from '../assets/userPointer.svg';

type Props = {
  latitude: number;
  longitude: number;
};

const UserLocationMarker: React.FC<Props> = ({ latitude, longitude }) => {
  return (
    <Marker coordinate={{ latitude, longitude }}>
      <UserPointerIcon width={32} height={32} />
    </Marker>
  );
};

export default UserLocationMarker;
