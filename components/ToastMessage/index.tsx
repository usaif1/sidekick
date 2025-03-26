// src/components/ToastMessage/index.ts
import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ScaledSheet } from 'react-native-size-matters';
import { useThemeStore } from '@/theme/store';

type ToastVariant = 'success' | 'error' | 'info';

interface ToastMessageProps {
  type?: ToastVariant;
  text1?: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
}

const { colors, typography } = useThemeStore.getState().theme;

// Custom toast styles
const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toastContainer, styles.success]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.text1, typography.skP1]}
      text2Style={[styles.text2, typography.skP2]}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.toastContainer, styles.error]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.text1, typography.skP1]}
      text2Style={[styles.text2, typography.skP2]}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toastContainer, styles.info]}
      contentContainerStyle={styles.contentContainer}
      text1Style={[styles.text1, typography.skP1]}
      text2Style={[styles.text2, typography.skP2]}
    />
  ),
};

// Function to show toast
export const showToast = ({
  type = 'success',
  text1 = '',
  text2 = '',
  position = 'top',
  visibilityTime = 4000,
  autoHide = true,
  topOffset = 40,
  bottomOffset = 40,
  onShow,
  onHide,
  onPress,
}: ToastMessageProps) => {
  Toast.show({
    type: type,
    text1,
    text2,
    position,
    visibilityTime,
    autoHide,
    topOffset,
    bottomOffset,
    onShow,
    onHide,
    onPress,
  });
};

// Function to hide toast
export const hideToast = () => {
  Toast.hide();
};

// Toast component with custom config
const ToastMessage = () => {
  return <Toast config={toastConfig} />;
};

export default ToastMessage;

const styles = ScaledSheet.create({
  toastContainer: {
    borderLeftWidth: 0,
    borderRadius: 8,
    shadowColor: colors.textSecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text1: {
    color: colors.textPrimary,
    marginBottom: 4,
  },
  text2: {
    color: colors.textPrimary,
  },
  success: {
    backgroundColor: colors.primary,
  },
  error: {
    backgroundColor: colors.error,
  },
  info: {
    backgroundColor: colors.highlight,
  },
});
