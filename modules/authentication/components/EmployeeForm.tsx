// dependencies
import {Text, View, Pressable} from 'react-native';
import React from 'react';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {BottomSheetTextInput, BottomSheetView} from '@gorhom/bottom-sheet';
import DropdownIcon from '@/modules/home/assets/dropdownIcon.svg';

// components
import {
  BottomSheetStyledInput,
  ButtonText,
  Divider,
  LabelPrimary,
} from '@/components';

// store
import {useThemeStore} from '@/globalStore';
import {authUtils} from '../utils';

const EmployeeForm: React.FC = () => {
  const {theme} = useThemeStore();

  return (
    <BottomSheetView style={styles.contentContainer}>
      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Select Institution
        </LabelPrimary>
        <Divider height={10} />
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 2,
            width: '100%',
            height: verticalScale(48),
            borderColor: theme.colors.textSecondary,
            borderRadius: 20,
            paddingHorizontal: scale(18),
          }}>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: moderateScale(15.2),
              fontWeight: '600',
            }}>
            XXXXXXXXXX
          </Text>
          <DropdownIcon />
        </Pressable>
      </View>

      <View style={{width: '100%'}}>
        <LabelPrimary customStyles={{paddingLeft: scale(18)}}>
          Enter Employee ID
        </LabelPrimary>
        <Divider height={10} />
        <BottomSheetStyledInput placeholder="XXXXXXXXXX" />
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
          <BottomSheetTextInput
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
          marginTop: 4,
          width: 220,
          alignSelf: 'center',
        }}>
        <ButtonText
          variant="primary"
          onPress={() => {
            authUtils.setBottomSheetView('otpEmployee');
          }}>
          Continue
        </ButtonText>
      </View>
    </BottomSheetView>
  );
};

export default EmployeeForm;

const styles = ScaledSheet.create({
  contentContainer: {
    rowGap: 16,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
});
