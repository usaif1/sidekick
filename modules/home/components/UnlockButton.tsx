import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Scan from '../assets/scanIcon.svg';

const UnlockButton = () => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        contentStyle={styles.buttonContent}
        style={styles.button}
        labelStyle={styles.label}
        icon={() => <Scan />}
      >
        Unlock
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#18F27A',
    borderRadius: 30,
    width: 220,
    height: 60,
    justifyContent: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#2C2E49',
    lineHeight: 24, 
  },
});

export default UnlockButton;
