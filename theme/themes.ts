import {darkColors, lightColors} from './colors';
import {TYPOGRAPHY} from './typography';
import {Theme} from './themes.type';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

export const lightTheme: Theme = {
  colors: lightColors,
  typography: {...TYPOGRAPHY},
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  padding: {
    horizontal: {
      xs_4: moderateScale(4),
      sm_8: moderateScale(8),
      sm_12: moderateScale(12),
      md_16: moderateScale(16),
      md_20: moderateScale(20),
      lg_24: moderateScale(24),
      xl_32: moderateScale(32),
    },
    vertical: {
      xs_4: moderateVerticalScale(4),
      sm_8: moderateVerticalScale(8),
      md_16: moderateVerticalScale(16),
      lg_24: moderateVerticalScale(24),
      lg_30: moderateVerticalScale(30),
      xl_32: moderateVerticalScale(32),
    },
  },
  margin: {
    horizontal: {
      xs_4: moderateScale(4),
      sm_8: moderateScale(8),
      sm_12: moderateScale(12),
      md_16: moderateScale(16),
      md_20: moderateScale(20),
      lg_24: moderateScale(24),
      xl_32: moderateScale(32),
      xxl_44: moderateScale(44),
    },
    vertical: {
      xs_4: moderateVerticalScale(4),
      sm_8: moderateVerticalScale(8),
      sm_12: moderateVerticalScale(12),
      md_16: moderateVerticalScale(16),
      lg_24: moderateVerticalScale(24),
      xl_32: moderateVerticalScale(32),
    },
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
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
};

// Dark theme variations
export const darkTheme: Theme = {
  ...lightTheme,
  colors: darkColors,
  typography: {
    ...lightTheme.typography,
  },
};
