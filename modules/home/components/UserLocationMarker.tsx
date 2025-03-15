import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserPointerIcon from '../assets/userPointer.svg';

const UserLocationMarker: React.FC = () => {
  return (
    <View style={styles.markerContainer}>
    <UserPointerIcon width={32} height={32} />
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -16}, {translateY: -32}],
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserLocationMarker;
