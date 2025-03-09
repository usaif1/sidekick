import ButtonText from '@/components/ButtonText';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const Login = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/Map.png')} // Path to your background image
      style={[styles.background, {width, height}]} // Set width and height dynamically
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Please Sign In to Continue</Text>
        <View style={{height: 32}} />
        <View style={{width: '100%', rowGap: 12}}>
          <ButtonText
            onPress={() => {
              navigation.navigate('signup');
            }}
            variant="primary">
            New User
          </ButtonText>
          <ButtonText onPress={() => {}} variant="secondary">
            Already a User
          </ButtonText>
          <ButtonText onPress={() => {}} variant="secondary">
            Employee
          </ButtonText>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white', // Optional: Adds a dark overlay for text readability
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 24,
    height: Dimensions.get('window').height * 0.5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
  },
});

export default Login;
