// // src/theme/theme.ts
// export type ColorPalette = {
//   primary: string;
//   secondary: string;
//   background: string;
//   surface: string;
//   error: string;
//   text: string;
//   textSecondary: string;
//   border: string;
// };

// export type Spacing = {
//   xs: number;
//   sm: number;
//   md: number;
//   lg: number;
//   xl: number;
// };

// export type Typography = {
//   heading: {
//     fontSize: number;
//     lineHeight: number;
//     fontWeight:
//       | 'normal'
//       | 'bold'
//       | '100'
//       | '200'
//       | '300'
//       | '400'
//       | '500'
//       | '600'
//       | '700'
//       | '800'
//       | '900';
//   };
//   body: {
//     fontSize: number;
//     lineHeight: number;
//   };
// };

// export type Theme = {
//   colors: ColorPalette;
//   spacing: Spacing;
//   typography: Typography;
//   radius: {
//     sm: number;
//     md: number;
//     lg: number;
//   };
// };

// export const lightTheme: Theme = {
//   colors: {
//     primary: '#18F27A',
//     secondary: '#F5F9FF',
//     background: '#FFFFFF',
//     surface: '#FFFFFF',
//     error: '#B3261E',
//     text: '#000000',
//     textSecondary: '#49454F',
//     border: '#79747E',
//   },
//   spacing: {
//     xs: 4,
//     sm: 8,
//     md: 16,
//     lg: 24,
//     xl: 32,
//   },
//   typography: {
//     heading: {
//       fontSize: 22,
//       lineHeight: 28,
//       fontWeight: '500',
//     },
//     body: {
//       fontSize: 16,
//       lineHeight: 24,
//     },
//   },
//   radius: {
//     sm: 4,
//     md: 8,
//     lg: 16,
//   },
// };

// export const darkTheme: Theme = {
//   colors: {
//     primary: '#D0BCFF',
//     secondary: '#CCC2DC',
//     background: '#141218',
//     surface: '#1D1B20',
//     error: '#F2B8B5',
//     text: '#E6E1E5',
//     textSecondary: '#CAC4D0',
//     border: '#938F99',
//   },
//   spacing: {...lightTheme.spacing},
//   typography: {...lightTheme.typography},
//   radius: {...lightTheme.radius},
// };

// src/theme/index.ts
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
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
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
    heading: {...lightTheme.typography.heading, color: darkColors.textPrimary},
    body: {...lightTheme.typography.body, color: darkColors.textSecondary},
  },
};
