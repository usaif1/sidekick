import React, {useState, useRef} from 'react';
import {
  View,
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
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import {useThemeStore} from '@/globalStore';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {InputVariant, DropdownOption} from './BaseInput';

// Extend the TextInputProps with our custom props
export interface BaseBottomInputProps extends Omit<TextInputProps, 'style'> {
  /**
   * Input label/title displayed above the input
   */
  label?: string;

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
  labelStyle?: TextStyle;

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
 * Base Bottom Input component optimized for bottom sheets
 */
const BaseBottomInput: React.FC<BaseBottomInputProps> = ({
  label,
  variant = 'default',
  containerStyle,
  inputStyle,
  labelStyle,
  error,
  required = false,
  dropdownOptions = [],
  onSelectDropdownOption,
  countryCode = '+91',
  inputType = 'text',
  placeholder = '',
  value,
  onChangeText,
  testID = 'base-bottom-input',
  ...restProps
}) => {
  // Access theme values
  const {colors} = useThemeStore(state => state.theme);

  // State for dropdown modal
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Reference to the input for focusing
  const inputRef = useRef<any>(null);

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
          accessibilityRole="button">
          <Icon name="chevron-down" size={16} color={colors.textPrimary} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  // Render currency prefix for currency variant
  const renderCurrencyPrefix = () => {
    if (variant === 'currency') {
      return (
        <View style={styles.prefixContainer}>
          <Text style={[styles.prefixText, {color: colors.highlight}]}>
            ₹
          </Text>
          <View style={[styles.divider, {backgroundColor: colors.textPrimary}]} />
        </View>
      );
    }
    return null;
  };

  // Render phone prefix for phone variant
  const renderPhonePrefix = () => {
    if (variant === 'phone') {
      return (
        <View style={styles.countryCodeContainer}>
          <Text style={[styles.countryCode, {color: colors.highlight}]}>
            {countryCode}{' '}
          </Text>
          <View style={[styles.divider, {backgroundColor: colors.textPrimary}]} />
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
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}>
          <View style={[styles.dropdownContainer, {backgroundColor: colors.white}]}>
            <FlatList
              data={dropdownOptions}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[styles.dropdownItem, {borderBottomColor: colors.lightGray}]}
                  onPress={() => handleSelectOption(item)}>
                  <Text style={{color: colors.textPrimary}}>{item.label}</Text>
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
      {/* Label */}
      {label && (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              styles.label,
              {color: colors.textPrimary},
              labelStyle,
            ]}>
            {label}
          </Text>
          {required && <Text style={{color: colors.error, marginLeft: ms(2)}}>*</Text>}
        </View>
      )}

      {/* Input Container */}
      {variant === 'phone' ? (
        <View
          style={[
            styles.phoneInputContainer,
            {borderColor: error ? colors.error : colors.textSecondary},
            inputStyle,
          ]}>
          {renderPhonePrefix()}
          <BottomSheetTextInput
            ref={inputRef}
            style={styles.phoneInput}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            value={value}
            onChangeText={onChangeText}
            keyboardType={getKeyboardType()}
            secureTextEntry={inputType === 'password'}
            {...restProps}
          />
        </View>
      ) : (
        <View
          style={[
            styles.textInputContainer,
            {borderColor: error ? colors.error : colors.textSecondary},
            inputStyle,
          ]}>
          {renderCurrencyPrefix()}
          <BottomSheetTextInput
            ref={inputRef}
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            value={value}
            onChangeText={onChangeText}
            keyboardType={getKeyboardType()}
            secureTextEntry={inputType === 'password'}
            onFocus={() => variant === 'dropdown' && setDropdownVisible(false)}
            {...restProps}
          />
          {renderDropdownIcon()}
        </View>
      )}

      {/* Error Message */}
      {error && (
        <Text style={[styles.errorText, {color: colors.error}]}>
          {error}
        </Text>
      )}

      {/* Dropdown Modal */}
      {renderDropdownModal()}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    marginBottom: '8@vs',
  },
  label: {
    marginBottom: '5@ms',
    fontWeight: '500',
    fontSize: '14@ms',
    paddingLeft: '18@s',
  },
  textInputContainer: {
    borderWidth: 2,
    borderRadius: 20,
    height: '48@vs',
    paddingHorizontal: '18@s',
    justifyContent: 'center',
  },
  textInput: {
    fontWeight: '600',
    paddingVertical: 0,
    fontSize: '15.2@ms',
    height: '40@vs',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    width: '100%',
    height: '48@vs',
    borderRadius: 20,
    paddingLeft: '18@s',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },
  countryCode: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  divider: {
    width: 1,
    height: 20,
  },
  phoneInput: {
    flex: 1,
    fontWeight: '600',
    paddingVertical: 0,
    fontSize: '15.2@ms',
    marginLeft: '10@s',
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '8@s',
  },
  prefixText: {
    fontWeight: '500',
    marginRight: '8@ms',
    fontSize: '14@ms',
  },
  dropdownIconContainer: {
    padding: '8@ms',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: '10@s',
  },
  errorText: {
    marginTop: '4@ms',
    fontSize: '12@ms',
    paddingLeft: '18@s',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    left: '20@ms',
    right: '20@ms',
    maxHeight: '200@ms',
    borderWidth: 1,
    borderRadius: '8@ms',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: '12@ms',
    borderBottomWidth: 1,
  },
});

export default BaseBottomInput; 