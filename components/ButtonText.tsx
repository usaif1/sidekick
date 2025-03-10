// src/components/PrimaryButton.tsx
import React, {ReactNode} from 'react';
import {Text, ViewStyle, TextStyle, Pressable} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// store
import {useThemeStore} from '@/globalStore';

type Props = {
  children: ReactNode;
  onPress: () => void;
  variant: 'primary' | 'secondary';
};

type ContainerStyles = {
  primary: ViewStyle;
  secondary: ViewStyle;
};

type TextStyles = {
  primary: TextStyle;
  secondary: TextStyle;
};

const ButtonText: React.FC<Props> = ({children, onPress, variant}) => {
  const {colors, spacing} = useThemeStore(state => state.theme);

  const containerStyles: ContainerStyles = {
    primary: {
      backgroundColor: colors.primary,
      padding: spacing.md,
      borderRadius: 30,
    },
    secondary: {
      backgroundColor: colors.lightGray,
      padding: spacing.md,
      borderRadius: 30,
    },
  };

  const textStyles: TextStyles = {
    primary: {
      color: colors.textPrimary,
      fontSize: 16,
    },
    secondary: {
      color: colors.textPrimary,
      fontSize: 16,
    },
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.pressableContainer, containerStyles[variant]]}>
      <Text
        style={[
          textStyles[variant],
          {
            fontFamily: 'PlusJakartaSans-Bold',
          },
        ]}>
        {children}
      </Text>
    </Pressable>
  );
};

export default ButtonText;

const styles = ScaledSheet.create({
  pressableContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '48@vs',
  },
});
