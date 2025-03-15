import React from "react";
import { Marker } from "react-native-maps";
import UserPointerIcon from "../assets/userPointer.svg";

interface UserLocationMarkerProps {
  latitude: number;
  longitude: number;
  heading: number;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ latitude, longitude, heading }) => {
  return (
    <Marker
      coordinate={{ latitude, longitude }}
      rotation={heading} 
      anchor={{ x: 0.5, y: 0.5 }} 
    >
      <UserPointerIcon width={32} height={32} />
    </Marker>
  );
};

export default UserLocationMarker;
