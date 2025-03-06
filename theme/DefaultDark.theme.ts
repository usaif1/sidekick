import { Theme, ColorTheme } from './Theme.type';

/**
 * Default dark theme color palette
 * Contains all the color values used throughout the application in dark mode
 */
const DEFAULT_DARK_COLOR_THEME: ColorTheme = {
    background: '#2C2E49',       // Updated to black color
    backgroundSecondary: '#1E1F33', // Darker version of black for secondary backgrounds
    primary: '#f78620',         // Keeping original primary color
    primaryGrey: '#86A0CA',     // Updated to grey
    borderGrey: '#646898',      // Updated to darkGrey for borders
    secondaryDark: '#1A1B2E',   // Darker variant of black
    textBlack: '#F5F9FF',       // Using lightGrey for text in dark mode (inverted)
    secondary: '#296AEB',       // Updated to blue
    red: '#F84848',             // Updated red
    lightRed: '#FCF0F0',        // Added lightRed
    green: '#18F27A',           // Updated green
    lightGreen: '#72FFB1',      // Updated lightGreen
    cream: '#FFF3EC',           // Keeping original cream color
    textGrey: '#86A0CA',        // Updated to grey for text
    darkGrey: '#646898',        // Added darkGrey
    grey: '#86A0CA',            // Added grey
    lightGrey: '#F5F9FF',       // Added lightGrey
    black: '#2C2E49',           // Added black
    blue: '#296AEB',            // Added blue
    lightBlue: '#C3DBFF00',     // Added lightBlue
    ratingYellow: '#FFBF1A',    // Keeping original rating yellow
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

/**
 * Complete dark theme configuration including spacing, border radius, and font sizes
 */
export const DEFAULT_DARK_THEME: Theme = {
    id: DEFAULT_DARK_THEME_ID,
    color: DEFAULT_DARK_COLOR_THEME,

    // Spacing scale (in pixels)
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48
    },
    
    // Border Radius scale
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        full: 9999
    },
    
    // Font Sizes scale
    fontSize: {
        xs: 10,
        sm: 12,
        base: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32
    }
};