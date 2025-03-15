import React, {useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  KeyboardTypeOptions,
} from 'react-native';
import {useThemeStore} from '@/globalStore';

// Extend the TextInputProps with our custom props
export interface BaseInputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Input label/title displayed above the input
   */
  title?: string;

  /**
   * Custom container style
   */
  containerStyle?: ViewStyle;

  /**
   * Custom input style
   */
  inputStyle?: TextStyle;

  /**
   * Custom label/title style
   */
  titleStyle?: TextStyle;

  /**
   * Error message to display below the input
   */
  error?: string;

  /**
   * Whether the input is required
   */
  required?: boolean;

  /**
   * Type of input (text, numeric, etc.)
   */
  inputType?: 'text' | 'numeric' | 'email' | 'password';

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * Base Input component that other input variants will extend
 */
const BaseInput: React.FC<BaseInputProps> = ({
  title,
  containerStyle,
  inputStyle,
  titleStyle,
  error,
  required = false,
  inputType = 'text',
  placeholder = '',
  value,
  onChangeText,
  testID = 'base-input',
  ...restProps
}) => {
  // Access theme values
  const {colors, spacing, typography} = useThemeStore(state => state.theme);

  // Reference to the input for focusing
  const inputRef = useRef<TextInput>(null);

  // Determine keyboard type based on inputType
  const getKeyboardType = (): KeyboardTypeOptions => {
    switch (inputType) {
      case 'numeric':
        return 'numeric';
      case 'email':
        return 'email-address';
      case 'password':
        return 'default'; // Password doesn't have a specific keyboard type
      default:
        return 'default';
    }
  };

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {/* Title/Label */}
      {title && (
        <Text
          style={[
            styles.title,
            {
              color: colors.textPrimary,
              fontSize: typography.skP2.fontSize,
              fontWeight: '500',
            },
            titleStyle,
          ]}>
          {title}
          {required && <Text style={{color: colors.error}}> *</Text>}
        </Text>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? colors.error : colors.textSecondary,
            borderRadius: 20,
            backgroundColor: colors.white,
          },
        ]}>
        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              fontSize: typography.skP2.fontSize,
              paddingLeft: spacing.md,
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          secureTextEntry={inputType === 'password'}
          {...restProps}
        />
      </View>

      {/* Error Message */}
      {error && (
        <Text
          style={[
            styles.errorText,
            {
              color: colors.error,
              fontSize: typography.skP3.fontSize,
            },
          ]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 10,
    marginLeft: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    height: 64,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 14,
  },
});

export default BaseInput; 