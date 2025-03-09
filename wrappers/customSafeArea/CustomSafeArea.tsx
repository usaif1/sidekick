import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ICustomSafeAreaProps } from './CustomSafeArea.types';
import { useScreenInsets } from '@/hooks/useScreenInsets';

import THEME from '@/theme/Sizes.theme';

const CustomSafeArea: React.FC<ICustomSafeAreaProps> = ({
    children,
    withPadding,
    customClassStyles = 'bg-white',
    hideTop,
    hideBottom
}) => {
    const { insetsTop, insetsBottom } = useScreenInsets();
    const styles = getStyles(hideTop ? 0 : insetsTop, hideBottom ? 0 : insetsBottom, withPadding);
    return (
        <View className={customClassStyles} style={styles.container}>
            {children}
        </View>
    );
};

export default CustomSafeArea;

const getStyles = (insetsTop: number, insetsBottom: number, withPadding?: boolean) => {
    const styles = StyleSheet.create({
        container: {
            paddingTop: insetsTop,
            paddingBottom: insetsBottom,
            flex: 1,
            paddingHorizontal: withPadding ? THEME.padding.horizontal.lg_24 : 0
        }
    });
    return styles;
};
