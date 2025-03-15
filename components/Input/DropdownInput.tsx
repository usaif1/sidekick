import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useThemeStore} from '@/globalStore';
import BaseInput, {BaseInputProps} from './BaseInput';

// Define dropdown option interface
export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownInputProps extends BaseInputProps {
  /**
   * Options for dropdown
   */
  dropdownOptions: DropdownOption[];

  /**
   * Callback when dropdown option is selected
   */
  onSelectDropdownOption?: (option: DropdownOption) => void;
}

const DropdownInput: React.FC<DropdownInputProps> = ({
  dropdownOptions = [],
  onSelectDropdownOption,
  onChangeText,
  testID = 'dropdown-input',
  ...restProps
}) => {
  // Access theme values
  const {colors} = useThemeStore(state => state.theme);
  
  // State for dropdown modal
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <BaseInput
        {...restProps}
        testID={testID}
        onFocus={() => setDropdownVisible(false)}
        renderSuffix={() => (
          <TouchableOpacity
            onPress={toggleDropdown}
            style={styles.dropdownIconContainer}
            testID={`${testID}-dropdown-icon`}
            accessibilityLabel="Toggle dropdown"
            accessibilityRole="button">
            <Icon name="chevron-down" size={16} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      />

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}>
          <View
            style={[
              styles.dropdownContainer,
              {
                top: 200, // This should be calculated based on input position
                backgroundColor: colors.white,
                borderRadius: 20,
                borderColor: colors.textSecondary,
              },
            ]}>
            <FlatList
              data={dropdownOptions}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {borderBottomColor: colors.lightGray},
                  ]}
                  onPress={() => handleSelectOption(item)}>
                  <Text style={{color: colors.textPrimary}}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dropdownIconContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
});

export default DropdownInput; 