// src/components/Avatar/Avatar.tsx
import React from 'react';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import { useThemeStore } from '@/globalStore';

// Define strong TypeScript interfaces
interface AvatarProps {
  /**
   * The full name to extract initials from
   */
  fullName?: string;
  /**
   * Optional children to render instead of initials
   */
  children?: React.ReactNode;
  /**
   * Visual variant of the avatar
   */
  variant?: 'rounded' | 'outlined' | 'squared';
  /**
   * Size variant of the avatar
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional callback when avatar is pressed
   */
  onPress?: () => void;
  /**
   * Custom styles to override default container styles
   */
  style?: ViewStyle;
  /**
   * Custom styles to override default text styles
   */
  textStyle?: TextStyle;
  /**
   * Optional test ID for testing
   */
  testID?: string;
  /**
   * Optional accessibility label
   */
  accessibilityLabel?: string;
}

/**
 * Avatar component displays user initials or custom content in a styled container
 */
const Avatar: React.FC<AvatarProps> = ({
  fullName = '',
  children,
  variant = 'rounded',
  size = 'medium',
  onPress,
  style,
  textStyle,
  testID = 'avatar',
  accessibilityLabel,
}) => {
  // Access theme values from the store
  const { colors, spacing, borderRadius, typography } = useThemeStore(state => state.theme);
  
  // Calculate initials from fullName
  const getInitials = (name: string): string => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return '';
    }
    
    const parts = name.trim().split(' ').filter(part => part.length > 0);
    
    // Handle different name formats
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Define variant styles as a mapping
  const variantStyles: Record<string, ViewStyle> = {
    rounded: {
      borderRadius: 999, // Fully rounded
      backgroundColor: colors.primary[500],
      borderWidth: 0,
    },
    outlined: {
      borderRadius: 999,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.primary[500],
    },
    squared: {
      borderRadius: borderRadius.md,
      backgroundColor: colors.primary[500],
      borderWidth: 0,
    }
  };

  // Define size styles as a mapping
  const sizeStyles: Record<string, ViewStyle & { fontSize: number }> = {
    small: {
      width: spacing.xl,
      height: spacing.xl,
      fontSize: typography.fontSize.sm,
    },
    medium: {
      width: spacing.xxl,
      height: spacing.xxl,
      fontSize: typography.fontSize.base,
    },
    large: {
      width: spacing.xxxl,
      height: spacing.xxxl,
      fontSize: typography.fontSize.xl,
    },
  };

  // Define text variant styles
  const textVariantStyles: Record<string, TextStyle> = {
    rounded: {
      color: colors.neutral[0], // Light text on dark background
    },
    outlined: {
      color: colors.primary[500], // Matching the border color
    },
    squared: {
      color: colors.neutral[0],
    },
  };

  // Compute the content to display
  const content = children || getInitials(fullName);
  
  // Build the accessibility label if not provided
  const computedAccessibilityLabel = accessibilityLabel || 
    (fullName ? `Avatar for ${fullName}` : 'Avatar');

  // Compose the styles
  const containerStyle = [
    styles.base,
    variantStyles[variant],
    { 
      width: sizeStyles[size].width, 
      height: sizeStyles[size].height 
    },
    style, // Allow custom overrides
  ];

  // Text styles combination
  const combinedTextStyle = [
    styles.text,
    textVariantStyles[variant],
    { fontSize: sizeStyles[size].fontSize },
    textStyle, // Allow custom overrides
  ];

  // Render as touchable if onPress is provided, otherwise as a View
  return onPress ? (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      testID={testID}
      accessibilityLabel={computedAccessibilityLabel}
      accessible={true}
      accessibilityRole="button"
    >
      <Text style={combinedTextStyle}>{content}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={containerStyle}
      testID={testID}
      accessibilityLabel={computedAccessibilityLabel}
      accessible={true}
      accessibilityRole="image"
    >
      <Text style={combinedTextStyle}>{content}</Text>
    </TouchableOpacity>
  );
};

// Base styles that apply to all variants
const styles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

export default Avatar;