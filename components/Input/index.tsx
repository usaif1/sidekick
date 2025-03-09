// src/components/Input/Input.tsx
import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
  Modal,
  FlatList,
  KeyboardTypeOptions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useThemeStore } from '@/globalStore';

// Define the variant types our input supports
type InputVariant = 'default' | 'dropdown' | 'phone';

// Define dropdown option interface for dropdown variant
interface DropdownOption {
  label: string;
  value: string;
}

// Extend the TextInputProps with our custom props
interface InputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Input label/title displayed above the input
   */
  title?: string;
  
  /**
   * Variant of the input to display
   */
  variant?: InputVariant;
  
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
   * Options for dropdown variant
   */
  dropdownOptions?: DropdownOption[];
  
  /**
   * Callback when dropdown option is selected
   */
  onSelectDropdownOption?: (option: DropdownOption) => void;
  
  /**
   * Country code for phone variant (default: +91)
   */
  countryCode?: string;
  
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
 * Custom Input component with multiple variants: default, dropdown, and phone
 */
const Input: React.FC<InputProps> = ({
  title,
  variant = 'default',
  containerStyle,
  inputStyle,
  titleStyle,
  error,
  required = false,
  dropdownOptions = [],
  onSelectDropdownOption,
  countryCode = '+91',
  inputType = 'text',
  placeholder = '',
  value,
  onChangeText,
  testID = 'custom-input',
  ...restProps
}) => {
  // Access theme values
  const { colors, spacing, borderRadius, typography } = useThemeStore(state => state.theme);
  
  // State for dropdown modal
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
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
  
  // Handle dropdown option selection
  const handleSelectOption = (option: DropdownOption) => {
    if (onSelectDropdownOption) {
      onSelectDropdownOption(option);
      if (onChangeText) {
        onChangeText(option.value);
      }
    }
    setDropdownVisible(false);
  };
  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    if (variant === 'dropdown') {
      setDropdownVisible(!dropdownVisible);
    }
  };
  
  // Render dropdown icon
  const renderDropdownIcon = () => {
    if (variant === 'dropdown') {
      return (
        <TouchableOpacity
          onPress={toggleDropdown}
          style={styles.dropdownIconContainer}
          testID={`${testID}-dropdown-icon`}
          accessibilityLabel="Toggle dropdown"
          accessibilityRole="button"
        >
          <Icon name="chevron-down" size={16} color={colors.neutral[600]} />
        </TouchableOpacity>
      );
    }
    return null;
  };
  
  // Render country code prefix for phone variant
  const renderPhonePrefix = () => {
    if (variant === 'phone') {
      return (
        <View style={styles.phonePrefixContainer}>
          <Text style={[styles.prefixText, { color: colors.neutral[700] }]}>
            {countryCode}
          </Text>
          <View
            style={[styles.divider, { backgroundColor: colors.neutral[300] }]}
          />
        </View>
      );
    }
    return null;
  };
  
  // Render dropdown modal
  const renderDropdownModal = () => {
    if (variant !== 'dropdown') return null;
    
    return (
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View
            style={[
              styles.dropdownContainer,
              {
                top: 200, // This should be calculated based on input position
                backgroundColor: colors.neutral[0],
                borderRadius: borderRadius.md,
                borderColor: colors.neutral[300],
              },
            ]}
          >
            <FlatList
              data={dropdownOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    { borderBottomColor: colors.neutral[200] },
                  ]}
                  onPress={() => handleSelectOption(item)}
                >
                  <Text style={{ color: colors.neutral[900] }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };
  
  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {/* Title/Label */}
      {title && (
        <Text
          style={[
            styles.title,
            {
              color: colors.neutral[800],
              fontSize: typography.fontSize.sm,
              fontWeight: '500',
            },
            titleStyle,
          ]}
        >
          {title}
          {required && <Text style={{ color: colors.error[500] }}> *</Text>}
        </Text>
      )}
      
      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? colors.error[500] : colors.neutral[300],
            borderRadius: borderRadius.md,
            backgroundColor: colors.neutral[0],
          },
        ]}
      >
        {/* Phone Prefix */}
        {renderPhonePrefix()}
        
        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              color: colors.neutral[900],
              fontSize: typography.fontSize.base,
              paddingLeft: variant === 'phone' ? spacing.xs : spacing.md,
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.neutral[500]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={getKeyboardType()}
          secureTextEntry={inputType === 'password'}
          onFocus={() => variant === 'dropdown' && setDropdownVisible(false)}
          {...restProps}
        />
        
        {/* Dropdown Icon */}
        {renderDropdownIcon()}
      </View>
      
      {/* Error Message */}
      {error && (
        <Text
          style={[
            styles.errorText,
            {
              color: colors.error[500],
              fontSize: typography.fontSize.xs,
            },
          ]}
        >
          {error}
        </Text>
      )}
      
      {/* Dropdown Modal */}
      {renderDropdownModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: 48,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingRight: 16,
  },
  dropdownIconContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    width: 1,
    height: 24,
    marginRight: 8,
  },
  errorText: {
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    maxHeight: 200,
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
});

export default Input;