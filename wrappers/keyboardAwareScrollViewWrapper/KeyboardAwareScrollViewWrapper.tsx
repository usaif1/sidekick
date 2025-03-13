import { StyleSheet } from 'react-native';
import React from 'react';
import { IKeyboardAwareScrollViewWrapperProps } from './KeyboardAwareScrollViewWrapper.types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollViewWrapper: React.FC<IKeyboardAwareScrollViewWrapperProps> = ({
    children,
    ...scrollViewProps
}) => {
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            enableResetScrollToCoords={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
            {...scrollViewProps}
        >
            {children}
        </KeyboardAwareScrollView>
    );
};

export default KeyboardAwareScrollViewWrapper;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    }
});
