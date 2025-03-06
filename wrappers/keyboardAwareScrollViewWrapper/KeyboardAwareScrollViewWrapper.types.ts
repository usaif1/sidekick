import React from 'react';
import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

export interface IKeyboardAwareScrollViewWrapperProps extends KeyboardAwareScrollViewProps {
    children: React.ReactNode;
}
