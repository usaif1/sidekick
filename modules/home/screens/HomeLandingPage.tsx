import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomeLandingPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Landing Page</Text>
      <Button mode="contained" onPress={() => console.log('Button Pressed')}>
        Click Me
      </Button>
    </View>
  );
};

export default HomeLandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
