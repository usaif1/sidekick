import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import NearestHubIcon from '../assets/nearestHubIcon.svg';

const NearestHubButton = () => {
  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        contentStyle={styles.buttonContent}
        style={styles.button}
        labelStyle={styles.label}
        icon={() => <View style={styles.iconContainer}><NearestHubIcon /></View>}
      >
        Nearest Hub
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderColor: '#86A0CA',
    borderWidth: 1,
    borderRadius: 23,
    width: 138,
    height: 32,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#296AEB', 
    lineHeight: 12, 
  },
});

export default NearestHubButton;
