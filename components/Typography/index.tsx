import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import {useThemeStore} from '@/globalStore';
export {default as H1} from './H1';
export {default as H2} from './H2';
export {default as H3} from './H3';
export {default as P1} from './P1';
export {default as P2} from './P2';
export {default as P3} from './P3';
export {default as B2} from './B2';

interface TypographyProps {
  /**
   * Text content to display
   */
  children: React.ReactNode;
  /**
   * Custom styles to override defaults
   */
  style?: TextStyle;
  /**
   * Number of lines to show (optional)
   */
  numberOfLines?: number;
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

/**
 * Heading - Large prominent text for titles and headers
 */
export const Heading: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
  testID = 'heading',
}) => {
  const {colors, typography} = useThemeStore(state => state.theme);

  return (
    <Text
      style={[
        styles.heading,
        {color: colors.textPrimary, fontSize: typography.skH2.fontSize},
        style,
      ]}
      numberOfLines={numberOfLines}
      testID={testID}>
      {children}
    </Text>
  );
};

/**
 * Subtitle - Secondary text often paired with headings
 */
export const Subtitle: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
  testID = 'subtitle',
}) => {
  const {colors, typography} = useThemeStore(state => state.theme);

  return (
    <Text
      style={[
        styles.subtitle,
        {color: colors.textPrimary, fontSize: typography.skP1.fontSize},
        style,
      ]}
      numberOfLines={numberOfLines}
      testID={testID}>
      {children}
    </Text>
  );
};

/**
 * StatLabel - Bold text for highlighting statistics or metrics
 */
export const StatLabel: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
  testID = 'stat-label',
}) => {
  const {colors, typography} = useThemeStore(state => state.theme);

  return (
    <Text
      style={[
        styles.statLabel,
        {color: colors.textSecondary, fontSize: typography.skP2.fontSize},
        style,
      ]}
      numberOfLines={numberOfLines}
      testID={testID}>
      {children}
    </Text>
  );
};

/**
 * StatValue - Smaller text for describing statistics
 */
export const StatValue: React.FC<TypographyProps> = ({
  children,
  style,
  numberOfLines,
  testID = 'stat-value',
}) => {
  const {colors, typography} = useThemeStore(state => state.theme);

  return (
    <Text
      style={[
        styles.statValue,
        {color: colors.textPrimary, fontSize: typography.skH1.fontSize},
        style,
      ]}
      numberOfLines={numberOfLines}
      testID={testID}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: '700',
    letterSpacing: 0.25,
  },
  subtitle: {
    fontWeight: '400',
    letterSpacing: 0.15,
  },
  statLabel: {
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  statValue: {
    fontWeight: '900',
    letterSpacing: 0.1,
  },
});
