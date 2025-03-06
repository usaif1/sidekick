import { Theme, ColorTheme } from './Theme.type';

const DEFAULT_DARK_COLOR_THEME: ColorTheme = {
    background: 'hsl(0, 0%, 100%)',
    primary: '#f78620',
    primaryGrey: 'hsl(0, 0%, 37%)',
    borderGrey: '#DBDBDB',
    secondaryDark: 'hsl(0, 0%, 0%)',
    textBlack: 'hsl(0, 0%, 7.06%)',
    secondary: ' hsl(48, 91%, 61%)',
    red: '#F11111',
    green: ' hsl(144, 68%, 48%)',
    lightGreen: '#8AB402',
    cream: '#FFF3EC',
    textGrey: 'hsl(0, 0%, 60%)',
    ratingYellow: 'hsl(48, 91%, 61%)',
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

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
