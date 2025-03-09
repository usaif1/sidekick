// imports
import {ColorPalette} from './theme.type';

export const lightColors: ColorPalette = {
  primary: {
    300: '#2A9D8F', // Cerulean
    500: '#00FF7F', // Spring Green
  },
  secondary: {
    200: '#98FB98', // Pale Green
    400: '#FFB6C1', // Pale Red
  },
  neutral: {
    0: '#FFFFFF', // White
    100: '#D3D3D3', // Light Gray
    200: '#A9A9A9', // Dark Gray
    900: '#000000', // Black
  },
  semantic: {
    error: '#FF0000', // Red
    success: '#00FF7F', // Spring Green
    warning: '#FFB6C1', // Pale Red
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
