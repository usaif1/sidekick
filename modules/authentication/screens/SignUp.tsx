// dependencies
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TextInput,
} from 'react-native';

// store
import {useThemeStore} from '@/globalStore';

// components
import {LabelPrimary} from '@/components';
import ButtonText from '@/components/ButtonText';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const Signup: React.FC = () => {
  const {theme} = useThemeStore();

  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/Map.png')} // Path to your background image
      style={[styles.background, {width, height}]} // Set width and height dynamically
    >
      <View style={styles.contentContainer}>
        <View style={{width: '100%'}}>
          <LabelPrimary>Enter your Full Name</LabelPrimary>
          <TextInput
            placeholder="XXXXXXXXXX"
            style={{
              borderWidth: 2,
              width: '100%',
              height: 60,
              borderColor: theme.colors.lightGray,
              borderRadius: 20,
              marginTop: 12,
              paddingLeft: 20,
              fontWeight: '600',
              fontSize: 16,
            }}
          />
        </View>
        <View style={{width: '100%'}}>
          <LabelPrimary>
            Enter Email ID
            <LabelPrimary
              labelColor="textSecondary"
              customStyles={{fontStyle: 'italic'}}>
              {' '}
              (optional)
            </LabelPrimary>
          </LabelPrimary>
          <TextInput
            placeholder="XXXXXXXXXX"
            style={{
              borderWidth: 2,
              width: '100%',
              height: 60,
              borderColor: theme.colors.lightGray,
              borderRadius: 20,
              marginTop: 12,
              paddingLeft: 20,
              fontWeight: '600',
              fontSize: 16,
            }}
          />
        </View>

        <View style={{width: '100%'}}>
          <LabelPrimary>Enter Your Phone Number</LabelPrimary>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 2,
              width: '100%',
              height: 60,
              borderColor: theme.colors.lightGray,
              borderRadius: 20,
              marginTop: 12,
              paddingLeft: 20,
              columnGap: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 10,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: theme.colors.highlight,
                  fontSize: 16,
                  fontFamily: 'PlusJakartaSans-Bold',
                }}>
                +91{' '}
              </Text>
              <View style={{width: 1, height: 20, backgroundColor: 'black'}} />
            </View>
            <TextInput
              placeholder="XXXXXXXXXX"
              placeholderTextColor={theme.colors.textSecondary}
              style={{
                fontWeight: '600',
                paddingVertical: 0,
              }}
            />
          </View>
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
              //@ts-ignore
              navigation.navigate('otp');
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
    rowGap: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white', // Optional: Adds a dark overlay for text readability
    borderRadius: 20,
    alignItems: 'flex-start',
    paddingTop: 32,
    paddingHorizontal: 24,
    height: Dimensions.get('window').height * 0.58,
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
    fontSize: 18,
    paddingLeft: 20,
  },
});

export default Signup;
