// dependencies
import {TextStyle, ViewStyle} from 'react-native';

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
};

export type Theme = {
  colors: ColorPalette;
  typography: {
    heading: TextStyle;
    subheading: TextStyle;
    body: TextStyle;
    fontSize: FontSizeEnum;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
    xxxxl: number;
  };
  shadows: {
    sm: ViewStyle;
    md: ViewStyle;
  };
};
