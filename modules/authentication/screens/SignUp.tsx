// dependencies
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, ImageBackground, Dimensions, TextInput} from 'react-native';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';

// store
import {useThemeStore} from '@/globalStore';

// components
import {Divider, LabelPrimary, ButtonText, CommonTextInput} from '@/components';

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
          <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
            Enter your Full Name
          </LabelPrimary>
          <Divider height={10} />
          <CommonTextInput placeholder="XXXXXXXXXX" />
        </View>
        <View style={{width: '100%'}}>
          <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
            Enter Email ID
            <LabelPrimary
              labelColor="textSecondary"
              customStyles={{fontStyle: 'italic'}}>
              {' '}
              (optional)
            </LabelPrimary>
          </LabelPrimary>
          <Divider height={10} />
          <CommonTextInput placeholder="XXXXXXXXXX" />
        </View>

        <View style={{width: '100%'}}>
          <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
            Enter Your Phone Number
          </LabelPrimary>
          <Divider height={10} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 2,
              width: '100%',
              height: verticalScale(48),
              borderColor: theme.colors.textSecondary,
              borderRadius: 20,
              paddingLeft: scale(18),
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
                fontSize: moderateScale(15.2),
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

const styles = ScaledSheet.create({
  background: {
    flex: 1,
  },
  contentContainer: {
    rowGap: '13@vs',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white', // Optional: Adds a dark overlay for text readability
    borderRadius: 20,
    alignItems: 'flex-start',
    paddingTop: 32,
    paddingHorizontal: 24,
    height: '375@vs',
  },
});

export default Signup;
