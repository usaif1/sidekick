import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '~/theme/Theme.context';
import { loadingStateFromSlice } from '~/redux/slices/loading/loadingSlice';
import { ILoaderWrapperProps } from './LoaderWrapper.types';

const LoaderWrapper: React.FC<ILoaderWrapperProps> = ({ children }) => {
    const isLoading = useSelector(loadingStateFromSlice);
    const { theme } = useTheme();

    return (
        <View style={styles.childrenContainer}>
            <View style={styles.childrenContainer}>{children}</View>
            {isLoading && (
                <View style={styles.loaderBlackOverlay}>
                    <View style={styles.loaderWhiteContainerView}>
                        <ActivityIndicator color={theme.color.primary} size={'large'} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default LoaderWrapper;

export const styles = StyleSheet.create({
    childrenContainer: {
        flex: 1
    },
    loaderBlackOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    loaderWhiteContainerView: {
        height: 130,
        width: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)'
    }
});
