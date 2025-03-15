import React, { forwardRef, useCallback, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet';
import { StyleProp, StyleSheet, View, ViewStyle, Keyboard, Platform } from 'react-native';
import { useKeyboardHeight } from '@/hooks/useKeyboardHeight';
import { useThemeStore } from '@/globalStore';
import { H2 } from '@/components'; // Assuming you have H2 component

export interface BottomSheetMethods {
  snapToIndex: (index: number) => void;
  snapToPosition: (position: number) => void;
  expand: () => void;
  collapse: () => void;
  close: () => void;
  forceClose: () => void;
  onChange: (index: number) => void;
}

interface BaseBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  initialSnapIndex?: number;
  headerTitle?: string;
  modalStyles?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  headerBackgroundColor?: string;
  onClose?: () => void;
  onOpen?: () => void;
  onChange?: (index: number) => void;
  enablePanDownToClose?: boolean;
  enableContentPanningGesture?: boolean;
  enableHandlePanningGesture?: boolean;
  keyboardBehavior?: 'interactive' | 'extend' | 'fillParent';
  keyboardBlurBehavior?: 'none' | 'restore';
}

const BaseBottomSheet = forwardRef<BottomSheet, BaseBottomSheetProps>(
  (
    {
      children,
      snapPoints: propSnapPoints,
      initialSnapIndex = 0,
      headerTitle,
      modalStyles,
      contentContainerStyle,
      headerBackgroundColor,
      onClose,
      onOpen,
      onChange,
      enablePanDownToClose = true,
      enableContentPanningGesture = true,
      enableHandlePanningGesture = true,
      keyboardBehavior = 'interactive',
      keyboardBlurBehavior = 'restore',
    },
    ref
  ) => {
    // Get theme from theme store
    const { theme } = useThemeStore();
    const keyboardHeight = useKeyboardHeight();
    
    // Set up snap points
    const finalSnapPoints = useMemo(() => {
      const initialSnapPoints = propSnapPoints || ['25%', '50%', '90%'];
      
      // If keyboard is open and we're using the 'extend' behavior, add keyboard height to the last snap point
      if (keyboardHeight > 0 && keyboardBehavior === 'extend') {
        return initialSnapPoints.map((point, index) => {
          if (index === initialSnapPoints.length - 1) {
            if (typeof point === 'string') {
              // If it's a percentage, we need to calculate the new percentage
              if (point.endsWith('%')) {
                const percentage = parseInt(point, 10);
                return `${Math.min(percentage + 15, 98)}%`; // Add 15% but cap at 98%
              }
              return point;
            }
            // If it's a number, add keyboard height
            return point + keyboardHeight;
          }
          return point;
        });
      }
      
      return initialSnapPoints;
    }, [propSnapPoints, keyboardHeight, keyboardBehavior]);
    
    // Handle sheet changes
    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index < 0) {
          Keyboard.dismiss();
          onClose?.();
        } else {
          onOpen?.();
        }
      },
      [onClose, onOpen]
    );
    
    // Render backdrop
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
        />
      ),
      []
    );
    
    // Handle component
    const renderHandle = useCallback(() => {
      return (
        <View style={[styles.handleContainer, { backgroundColor: theme.colors.white }]}>
          <View style={[styles.handle, { backgroundColor: theme.colors.textSecondary }]} />
        </View>
      );
    }, [theme]);
    
    return (
      <BottomSheet
        ref={ref}
        index={initialSnapIndex}
        snapPoints={finalSnapPoints}
        handleComponent={renderHandle}
        backdropComponent={renderBackdrop}
        onChange={onChange || handleSheetChanges}
        enablePanDownToClose={enablePanDownToClose}
        enableContentPanningGesture={enableContentPanningGesture}
        enableHandlePanningGesture={enableHandlePanningGesture}
        keyboardBehavior={keyboardBehavior}
        keyboardBlurBehavior={keyboardBlurBehavior}
        android_keyboardInputMode="adjustResize"
        style={styles.bottomSheet}
        backgroundStyle={{ backgroundColor: theme.colors.white }}
      >
        <BottomSheetView 
          style={[
            styles.contentContainer, 
            { backgroundColor: theme.colors.white },
            modalStyles
          ]} 
        >
          {headerTitle && (
            <View 
              style={[
                styles.headerContainer, 
                { 
                  borderBottomColor: theme.colors.textSecondary,
                  backgroundColor: headerBackgroundColor || theme.colors.white 
                }
              ]}
            >
              <H2>{headerTitle}</H2>
            </View>
          )}
          <View style={[styles.childrenContainer, contentContainerStyle]}>
            {children}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

// Create a wrapper component for BottomSheetScrollView
export const BottomSheetContent = forwardRef<typeof BottomSheetScrollView, {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  bounces?: boolean;
}>(
  (
    { 
      children, 
      contentContainerStyle, 
      style, 
      showsVerticalScrollIndicator = false, 
      bounces = true 
    }, 
    ref
  ) => {
    const { theme } = useThemeStore();
    
    return (
      <BottomSheetScrollView
        ref={ref as any}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        contentContainerStyle={contentContainerStyle}
        style={[{ backgroundColor: theme.colors.white }, style]}
        bounces={bounces}
      >
        {children}
      </BottomSheetScrollView>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
  },
  childrenContainer: {
    flex: 1,
  },
  handleContainer: {
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
});

export default BaseBottomSheet; 