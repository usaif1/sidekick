import React from 'react';
import {View, ViewStyle, TextStyle} from 'react-native';
import {Controller, Control, FieldErrors} from 'react-hook-form';
import {ScaledSheet} from 'react-native-size-matters';
import BaseBottomInput from './BaseBottomInput';
import {InputVariant, DropdownOption} from './BaseInput';

type Props = {
  name: string;
  label: string;
  control: Control<any>;
  errors: FieldErrors;
  placeholder: string;
  required?: boolean;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  editable?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  variant?: InputVariant;
  dropdownOptions?: DropdownOption[];
  onSelectDropdownOption?: (option: DropdownOption) => void;
  countryCode?: string;
  inputType?: 'text' | 'numeric' | 'email' | 'password';
};

const CustomBottomFormInput: React.FC<Props> = ({
  name,
  label,
  control,
  errors,
  placeholder,
  required = false,
  inputStyle,
  containerStyle,
  editable = true,
  keyboardType = 'default',
  maxLength = 129,
  variant = 'default',
  dropdownOptions = [],
  onSelectDropdownOption,
  countryCode = '+91',
  inputType = 'text',
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, value, onBlur}}) => (
          <BaseBottomInput
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors[name]?.message as string}
            required={required}
            editable={editable}
            maxLength={maxLength}
            keyboardType={keyboardType as any}
            inputStyle={inputStyle}
            variant={variant}
            dropdownOptions={dropdownOptions}
            onSelectDropdownOption={onSelectDropdownOption}
            countryCode={countryCode}
            inputType={inputType}
            autoCapitalize={name === 'panNumber' || name === 'pan' ? 'characters' : 'none'}
            autoCorrect={false}
          />
        )}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  inputContainer: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
  },
});

export default CustomBottomFormInput; 