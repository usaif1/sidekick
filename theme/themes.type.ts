// dependencies
import {ViewStyle, TextStyle} from 'react-native';

export type ColorPalette = {
  primary: string; // Spring Green
  secondary: string; // Pale Green
  highlight: string; //Cerulean
  error: string; //red
  alert: string; // pale red
  textPrimary: string; //black
  textSecondary: string; //dark gray
  lightGray: string; //light gray
  redFade: string; // Red Gradient or Accent color
  blueFade: string; // Blue Gradient or Accent color
  white: string;
  appBaseBg: string;
};

type CustomTextStyle = {
  fontSize: number | undefined;
  lineHeight?: number | undefined;
  fontFamily: string;
  fontWeight: TextStyle['fontWeight'];
};

export type Theme = {
  colors: ColorPalette;
  typography: {
    skH1: CustomTextStyle;
    skH2: CustomTextStyle;
    skH3: CustomTextStyle;
    skP1: CustomTextStyle;
    skP2: CustomTextStyle;
    skP3: CustomTextStyle;
    skButtonLarge: CustomTextStyle;
    skButtonMedium: CustomTextStyle;
    skButtonSmall: CustomTextStyle;
    skButtonTiny: CustomTextStyle;
    skB1: CustomTextStyle;
    skB2: CustomTextStyle;
    skLabel: CustomTextStyle;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  padding: {
    horizontal: {
      xs_4: number;
      sm_8: number;
      sm_12: number;
      md_16: number;
      md_20: number;
      lg_24: number;
      xl_32: number;
    };
    vertical: {
      xs_4: number;
      sm_8: number;
      md_16: number;
      lg_24: number;
      lg_30: number;
      xl_32: number;
    };
  };
  margin: {
    horizontal: {
      xs_4: number;
      sm_8: number;
      sm_12: number;
      md_16: number;
      md_20: number;
      lg_24: number;
      xl_32: number;
      xxl_44: number;
    };
    vertical: {
      xs_4: number;
      sm_8: number;
      sm_12: number;
      md_16: number;
      lg_24: number;
      xl_32: number;
    };
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    round: number;
  };
  shadows: {
    sm: ViewStyle;
    md: ViewStyle;
  };
};
