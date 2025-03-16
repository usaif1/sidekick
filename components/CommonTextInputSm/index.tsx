import { TextInput, TextInputProps, TextStyle } from 'react-native';
import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';

// store
import { useThemeStore } from '@/globalStore';

interface CommonTextInputSmProps extends TextInputProps {
  placeholder: string;
  customStyle?: TextStyle;
  secureTextEntry?: boolean;
}

const { theme } = useThemeStore.getState();

const CommonTextInputSm: React.FC<CommonTextInputSmProps> = ({
  placeholder,
  secureTextEntry = false,
  customStyle,
  ...rest
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      secureTextEntry={secureTextEntry}
      style={[styles.input, customStyle]}
      {...rest}
    />
  );
};

const styles = ScaledSheet.create({
  input: {
    borderWidth: 2,
    width: '100%',
    height: '32@vs', 
    borderColor: theme.colors.textSecondary,
    borderRadius: 12, 
    fontWeight: '600',
    fontSize: '14@s',  
    paddingVertical: 0, 
    paddingHorizontal: '12@s', 
  },
});

export default CommonTextInputSm;
