export interface ColorTheme {
  background: string;
  backgroundSecondary?: string;
  primary: string;
  primaryGrey: string;
  secondaryDark: string;
  textBlack: string;
  secondary: string;
  red: string;
  lightRed: string;
  borderGrey: string;
  green: string;
  lightGreen: string;
  cream: string;
  textGrey: string;
  shadowColor?: string;
  ratingYellow: string;
  darkGrey: string;
  grey: string;
  lightGrey: string;
  black: string;
  blue: string;
  lightBlue: string;
  white: string;
}

export interface SpacingTheme {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface BorderRadiusTheme {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface FontSizeTheme {
  xs: number;
  sm: number;
  base: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface Theme {
  id: string;
  color: ColorTheme;
  spacing?: SpacingTheme;
  borderRadius?: BorderRadiusTheme;
  fontSize?: FontSizeTheme;
}

// If you want to keep the enum-based approach, replace FB with SK
export enum SKColorPalette {
  // general use colors
  primary = '#f78620',
  secondary = '#0E2F34',
  accent = '#72FFB1',
  complementary = '#62A88E',
  neutral = '#2C2E49',
  error = '#F84848',
  faded = 'rgba(0, 0, 0, 0.13)',
  amber = '#FFBF1A',

  // named colors
  lightGreen = '#72FFB1',
  deepTeal = '#006446',
  white = '#FFFFFF',
  lightGray = '#F5F9FF',
  darkGray = '#646898',
  mediumGray = '#86A0CA',
  black = '#2C2E49',
  input = '#F9FAFB',
  inputAlternate = '#FAFAF9',
  inputBorder = '#E5E7EB',
  inputBorderAlternate = '#EBEBE6',
  disabledInputText = '#9CA3AF',
  slate = 'rgba(107, 114, 128, 1)',
  steelBlue = '#6B7280',
  redGradient = '#F84848',
  lightRed = '#FCF0F0',
  lightYellow = '#FFF2CC',
  blue = '#296AEB',
  lightBlue = '#C3DBFF00',

  //   backgrounds
  bgPrimary = '#F5F9FF',
  bgSecondary = '#F5F9FF',
  sky = 'rgba(150, 217, 255, 0.4)',
  subtleBlack = 'rgba(0, 0, 0, 0.05)',
  pastelGreen = '#ECFDF5',
  shellPink = '#FEE2E2',
  seaShell = 'rgba(244, 238, 222, 0.1)',
  disabledBG = '#C0C4CA',
  softBlue = '#F8FAFC',

  //   borders
  borderPrimary = 'rgba(229, 231, 235, 1)',
  borderSecondary = '#D9D9D9',
  borderYellow = '#deb887',

  // gradient
  gradientPrimaryStart = 'rgba(244, 238, 222, 0.29)',
  gradientPrimaryEnd = 'rgba(144, 152, 163, 0)',

  // text
  placeHolderPrimary = 'rgba(156, 163, 175, 1)',
}

// Typographic styles
export type Colors =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'lightGray'
  | 'mediumGray'
  | 'darkGray'
  | 'white'
  | 'faded'
  | 'complementary'
  | 'error'
  | 'slate'
  | 'accent'
  | 'disabledInputText'
  | 'amber'
  | 'steelBlue'
  | 'redGradient'
  | 'lightRed'
  | 'lightYellow'
  | 'placeHolderPrimary'
  | 'blue'
  | 'lightBlue';

export enum FontSizeEnum {
  'xxs' = '8@s',
  'xs' = '10@s',
  'sm' = '12@s',
  'base' = '14@s',
  'lg' = '18@s',
  'xl' = '22@s',
  '2xl' = '26@s',
  '3xl' = '30@s',
  '4xl' = '34@s',
}

export type FontSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl';

export enum SKColors {
  primary = SKColorPalette.primary,
  secondary = SKColorPalette.secondary,
  neutral = SKColorPalette.neutral,
  white = SKColorPalette.white,
  lightGray = SKColorPalette.lightGray,
  darkGray = SKColorPalette.darkGray,
  faded = SKColorPalette.faded,
  complementary = SKColorPalette.complementary,
  mediumGray = SKColorPalette.mediumGray,
  error = SKColorPalette.error,
  slate = SKColorPalette.slate,
  accent = SKColorPalette.accent,
  steelBlue = SKColorPalette.steelBlue,
  disabledInputText = SKColorPalette.disabledInputText,
  amber = SKColorPalette.amber,
  redGradient = SKColorPalette.redGradient,
  lightRed = SKColorPalette.lightRed,
  lightYellow = SKColorPalette.lightYellow,
  blue = SKColorPalette.blue,
  lightBlue = SKColorPalette.lightBlue,

  // placeholders
  placeHolderPrimary = SKColorPalette.placeHolderPrimary,
}

export enum SKBackground {
  primary = SKColorPalette.bgPrimary,
  secondary = SKColorPalette.bgSecondary,
  darkGreen = SKColorPalette.secondary,
  white = SKColorPalette.white,
  sky = SKColorPalette.sky,
  subtleBlack = SKColorPalette.subtleBlack,
  pastelGreen = SKColorPalette.pastelGreen,
  shellPink = SKColorPalette.shellPink,
  seaShell = SKColorPalette.seaShell,
  input = SKColorPalette.input,
  inputAlternate = SKColorPalette.inputAlternate,
  active = SKColorPalette.primary,
  accent = SKColorPalette.accent,
  deepTeal = SKColorPalette.deepTeal,
  complementary = SKColorPalette.complementary,
  disabled = SKColorPalette.disabledBG,
  softBlue = SKColorPalette.softBlue,
  lightYellow = SKColorPalette.lightYellow,
  error = SKColorPalette.error,
}

export enum SKBorders {
  primary = SKColorPalette.borderPrimary,
  secondary = SKColorPalette.borderSecondary,
  darkGreen = SKColorPalette.secondary,
  input = SKColorPalette.inputBorder,
  inputAlternate = SKColorPalette.inputBorderAlternate,
  forestGreen = SKColorPalette.primary,
  disabledInputText = SKColorPalette.disabledInputText,
  borderYellow = SKColorPalette.borderYellow,
  error = SKColorPalette.error,
  complementary = SKColorPalette.complementary,
}