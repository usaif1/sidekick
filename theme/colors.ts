// imports
import {ColorPalette} from './theme.type';

export const lightColors: ColorPalette = {
  primary: {
    300: '#296AEB', // Cerulean
    500: '#18F27A', // Spring Green
  },
  secondary: {
    200: '#72FFB1', // Pale Green
    400: '#FCF0F0', // Pale Red
  },
  tertiary: {
    200: '#C3DBFF00', // Pale Blue
    400: '#296AEB', // Cerulean
  },
  neutral: {
    0: '#FFFFFF', // White
    100: '#F5F9FF', // Light Gray
    200: '#86A0CA', // Dark Gray
    900: '#2C2E49', // Black
  },
  semantic: {
    error: '#F84848', // Red
    success: '#18F27A', // Spring Green
    warning: '#FCF0F0', // Pale Red
  },
  gradients: {
    redFade: ['#FF0000', '#FFB6C1'], // Red-Fade
    blueFade: ['#2A9D8F', '#00FF7F'], // Blue-Fade
  },
};

export const darkColors: ColorPalette = {
  ...lightColors,
  neutral: {
    0: '#FFFFFF', // Black
    100: '#A9A9A9', // Dark Gray
    200: '#D3D3D3', // Light Gray
    900: '#FFFFFF', // White
  },
};
