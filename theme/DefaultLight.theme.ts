import { ColorTheme, Theme } from './Theme.type';

/**
 * Default light theme color palette
 * Contains all the color values used throughout the application in light mode
 */
const DEFAULT_LIGHT_COLOR_THEME: ColorTheme = {
    background: '#F5F9FF',       // Updated to lightGrey background
    backgroundSecondary: '#E8EFF9', // Slightly darker version of lightGrey
    primary: '#f78620',          // Keeping original primary color
    primaryGrey: '#646898',      // Updated to darkGrey
    secondaryDark: '#2C2E49',    // Updated to black
    borderGrey: '#86A0CA',       // Updated to grey
    textBlack: '#2C2E49',        // Updated to black
    secondary: '#296AEB',        // Updated to blue
    red: '#F84848',              // Updated red
    lightRed: '#FCF0F0',         // Added lightRed
    green: '#18F27A',            // Updated green
    lightGreen: '#72FFB1',       // Updated lightGreen
    cream: '#FFF3EC',            // Keeping original cream color
    textGrey: '#646898',         // Updated to darkGrey for text
    shadowColor: 'rgba(44, 46, 73, 0.1)', // Using black with transparency
    darkGrey: '#646898',         // Added darkGrey
    grey: '#86A0CA',             // Added grey
    lightGrey: '#F5F9FF',        // Added lightGrey
    black: '#2C2E49',            // Added black
    blue: '#296AEB',             // Added blue
    lightBlue: '#C3DBFF00',      // Added lightBlue
    ratingYellow: '#FFBF1A',     // Keeping original rating yellow
    white: '#FFFFFF'
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';

/**
 * Complete light theme configuration including spacing, border radius, and font sizes
 */
export const DEFAULT_LIGHT_THEME: Theme = {
    id: DEFAULT_LIGHT_THEME_ID,
    color: DEFAULT_LIGHT_COLOR_THEME,
    
    // Spacing scale (in pixels)
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    // Border Radius scale
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        full: 9999,
    },
    // Font Sizes scale
    fontSize: {
        xs: 10,
        sm: 12,
        base: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
    },
};