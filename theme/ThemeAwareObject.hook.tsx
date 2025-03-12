import React from 'react';
import { Theme } from './Theme.type';
import { useTheme } from './Theme.context';

type Generator<T extends object> = (theme: Theme) => T;

export const useThemeAwareObject = <T extends object>(fn: Generator<T>) => {
    const { theme } = useTheme();

    const ThemeAwareObject = React.useMemo(() => fn(theme), [fn, theme]);
    return ThemeAwareObject;
};
