// imports
import {darkColors, lightColors} from './colors';
import {Theme} from './theme.type';

export const lightTheme: Theme = {
  colors: lightColors,
  typography: {
    heading: {
      fontSize: 24,
      fontWeight: '700',
      color: lightColors.textPrimary,
    },
    subheading: {
      fontSize: 18,
      fontWeight: '500',
      color: lightColors.textSecondary,
    },
    body: {
      fontSize: 16,
      color: lightColors.textPrimary,
    },
    fontSize: {
      xs: 10,
      sm: 12,
      base: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
    xxxxl: 56,
  },
  shadows: {
    sm: {
      shadowColor: lightColors.textPrimary,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: lightColors.textPrimary,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
  },
};

// Dark theme variations
export const darkTheme: Theme = {
  ...lightTheme,
  colors: darkColors,
  typography: {
    ...lightTheme.typography,
    heading: {...lightTheme.typography.heading, color: darkColors.textPrimary},
    body: {...lightTheme.typography.body, color: darkColors.textSecondary},
  },
};
