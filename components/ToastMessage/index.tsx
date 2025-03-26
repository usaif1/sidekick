import React, { useRef, useState } from 'react';
import { Animated, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useThemeStore } from '@/globalStore';

// Create a context to manage toast notifications
import { createContext, useContext } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

type ToastContextType = {
  show: (message: string, type?: ToastType, duration?: number) => void;
  hide: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { colors } = useThemeStore(state => state.theme);

  const show = (text: string, toastType: ToastType = 'info', duration: number = 3000) => {
    setMessage(text);
    setType(toastType);
    setVisible(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto hide after duration
    setTimeout(() => {
      hide();
    }, duration);
  };

  const hide = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  return (
    <ToastContext.Provider value={{ show, hide }}>
      {children}
      {visible && (
        <Animated.View
          style={[
            styles.container,
            styles[type],
            { opacity: fadeAnim },
          ]}>
          <Text style={styles.message}>{message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = ScaledSheet.create({
  container: {
    position: 'absolute',
    bottom: '40@vs',
    left: '16@s',
    right: '16@s',
    padding: '12@s',
    borderRadius: '8@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#F44336',
  },
  warning: {
    backgroundColor: '#FF9800',
  },
  info: {
    backgroundColor: '#2196F3',
  },
  message: {
    color: '#FFFFFF',
    fontSize: '14@ms',
    fontWeight: '600',
    textAlign: 'center',
  },
});

// Utility function to show toast messages
export const showToast = (toast: ToastContextType, message: string, type: ToastType = 'info', duration: number = 3000) => {
  toast.show(message, type, duration);
};

export default ToastProvider;