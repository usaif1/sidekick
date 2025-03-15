import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useThemeStore} from '@/globalStore';
import BaseInput, {BaseInputProps} from './BaseInput';

interface PhoneInputProps extends BaseInputProps {
  /**
   * Country code for phone variant (default: +91)
   */
  countryCode?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode = '+91',
  inputStyle,
  testID = 'phone-input',
  ...restProps
}) => {
  // Access theme values
  const {colors, typography} = useThemeStore(state => state.theme);

  return (
    <BaseInput
      {...restProps}
      testID={testID}
      inputType="numeric"
      inputStyle={[{paddingLeft: 8}, inputStyle]}
      renderPrefix={() => (
        <View style={styles.phonePrefixContainer}>
          <Text
            style={[
              styles.prefixText,
              {color: colors.highlight, fontSize: typography.skP2.fontSize},
            ]}>
            {countryCode}
          </Text>
          <View
            style={[styles.divider, {backgroundColor: colors.textSecondary}]}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  phonePrefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  prefixText: {
    fontWeight: '500',
    marginRight: 8,
  },
  divider: {
    width: 2,
    height: 20,
    marginRight: 6,
  },
});

export default PhoneInput; 