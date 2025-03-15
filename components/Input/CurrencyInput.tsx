import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useThemeStore} from '@/globalStore';
import BaseInput, {BaseInputProps} from './BaseInput';

const CurrencyInput: React.FC<BaseInputProps> = ({
  title,
  titleStyle,
  inputStyle,
  testID = 'currency-input',
  ...restProps
}) => {
  // Access theme values
  const {colors, typography} = useThemeStore(state => state.theme);

  return (
    <BaseInput
      {...restProps}
      testID={testID}
      inputType="numeric"
      title={title}
      titleStyle={[
        {color: colors.highlight},
        titleStyle
      ]}
      inputStyle={[
        {textAlign: 'right', paddingLeft: 8},
        inputStyle
      ]}
      renderPrefix={() => (
        <View style={styles.currencyPrefixContainer}>
          <Text
            style={[
              styles.prefixText,
              {color: colors.highlight, fontSize: typography.skP2.fontSize},
            ]}>
            ₹
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
  currencyPrefixContainer: {
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

export default CurrencyInput; 