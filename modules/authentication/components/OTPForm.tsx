// dependencies
import {Text, View} from 'react-native';
import React from 'react';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {ScaledSheet} from 'react-native-size-matters';

// components
import {BottomSheetStyledInput, ButtonText, Divider} from '@/components';

// store
import {useGlobalStore, useThemeStore} from '@/globalStore';

const OTPForm: React.FC = () => {
  const {theme} = useThemeStore();

  return (
    <BottomSheetView>
      <View style={styles.contentContainer}>
        <View style={{width: '100%'}}>
          <Text style={styles.label}>Please Enter the OTP Received</Text>
          <Divider height={10} />
          <BottomSheetStyledInput
            placeholder="XXXX"
            customStyle={{
              textAlign: 'center',
              paddingLeft: 0,
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
    </BottomSheetView>
  );
};

export default OTPForm;

const styles = ScaledSheet.create({
  background: {
    flex: 1,
  },
  contentContainer: {
    rowGap: 16,
    width: '100%',
    backgroundColor: 'white', // Optional: Adds a dark overlay for text readability
    borderRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 24,
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
