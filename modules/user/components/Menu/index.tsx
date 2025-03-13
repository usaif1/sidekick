import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useThemeStore} from '@/globalStore';
import Icon from 'react-native-vector-icons/Feather';
import Switch from '@/components/Switch';

interface MenuItem {
  /**
   * Icon name from the icon library
   */
  icon: string;
  /**
   * Label text for the menu item
   */
  label: string;
  /**
   * Type of control for the menu item
   */
  controlType?: 'none' | 'switch';
  /**
   * Whether the switch is toggled on (only for switch control type)
   */
  isToggled?: boolean;
  /**
   * Function to call when menu item is pressed
   */
  onPress: () => void;
  /**
   * Function to call when switch is toggled (only for switch control type)
   */
  onToggle?: (value: boolean) => void;
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

interface MenuProps {
  /**
   * Array of menu items to display
   */
  items: MenuItem[];
  /**
   * Custom styles to override default container styles
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

/**
 * Menu component displays a list of actionable items with icons and optional controls
 */
const Menu: React.FC<MenuProps> = ({items, style, testID = 'menu'}) => {
  const {colors, spacing} = useThemeStore(state => state.theme);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.white,
        },
        style,
      ]}
      testID={testID}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.menuItem,
            {paddingVertical: spacing.md, paddingHorizontal: spacing.md},
            index < items.length - 1 && styles.borderBottom,
            index < items.length - 1 && {borderBottomColor: colors.lightGray},
          ]}
          onPress={item.onPress}
          testID={item.testID || `menu-item-${index}`}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          disabled={item.controlType === 'switch'} // Disable press on the entire row for switch items
        >
          <View style={styles.leftContent}>
            <Icon
              name={item.icon}
              size={20}
              color={colors.textPrimary}
              style={styles.icon}
            />
            <Text style={[styles.label, {color: colors.textPrimary}]}>
              {item.label}
            </Text>
          </View>

          {item.controlType === 'switch' && (
            <Switch
              isOn={item.isToggled}
              onToggle={item.onToggle}
              size="small"
              testID={`${item.testID || `menu-item-${index}`}-switch`}
              accessibilityLabel={`Toggle ${item.label}`}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
});

export default Menu;
