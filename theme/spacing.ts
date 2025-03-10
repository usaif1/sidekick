// DesignSystem/Spacing.js
import {moderateScale} from 'react-native-size-matters';

// Base spacing unit (adjust to your design's baseline)
const BASE_SPACING = 4; // 4px in your design (e.g., iPhone 15)

// Responsive spacing scale
const SPACING = {
  xxxs: moderateScale(BASE_SPACING * 0.5), // 2px (scaled)
  xxs: moderateScale(BASE_SPACING * 1), // 4px (scaled)
  xs: moderateScale(BASE_SPACING * 2), // 8px (scaled)
  s: moderateScale(BASE_SPACING * 3), // 12px (scaled)
  m: moderateScale(BASE_SPACING * 4), // 16px (scaled)
  l: moderateScale(BASE_SPACING * 6), // 24px (scaled)
  xl: moderateScale(BASE_SPACING * 8), // 32px (scaled)
  xxl: moderateScale(BASE_SPACING * 12), // 48px (scaled)
};

export default SPACING;
