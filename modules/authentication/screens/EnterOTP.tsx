import {CommonTextInput, Divider} from '@/components';
import ButtonText from '@/components/ButtonText';
import {useGlobalStore, useThemeStore} from '@/globalStore';
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
  const {theme} = useThemeStore();

  return (
    <ImageBackground
      source={require('../assets/Map.png')} // Path to your background image
      style={[styles.background, {width, height}]} // Set width and height dynamically
    >
      <View style={styles.contentContainer}>
        <View style={{width: '100%'}}>
          <Text style={styles.label}>Please Enter the OTP Received</Text>
          <Divider height={10} />
          <CommonTextInput
            placeholder="XXXX"
            customStyle={{
              textAlign: 'center',
            }}
          />
        </View>

        <View
          style={{
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: theme.colors.highlight,
              fontSize: 10,
              fontWeight: '600',
              textDecorationLine: 'underline',
              marginTop: 12,
            }}>
            Resend OTP
          </Text>
        </View>

        <View
          style={{
            marginTop: 20,
            width: 220,
            alignSelf: 'center',
          }}>
          <ButtonText
            variant="primary"
            onPress={() => {
              useGlobalStore.setState(prevState => ({
                ...prevState,
                loggedIn: true,
              }));
            }}>
            Continue
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
    height: Dimensions.get('window').height * 0.35,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Login;
