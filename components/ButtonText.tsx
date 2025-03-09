// src/components/PrimaryButton.tsx
import React, {ReactNode} from 'react';
import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';
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
      backgroundColor: colors.primary[500],
      padding: spacing.md,
      borderRadius: 30,
    },
    secondary: {
      backgroundColor: colors.neutral[0],
      padding: spacing.md,
      borderRadius: 30,
    },
  };

  const textStyles: TextStyles = {
    primary: {
      color: colors.neutral[900],
      fontWeight: '600',
      fontSize: 16,
    },
    secondary: {
      color: colors.neutral[900],
      fontWeight: '600',
      fontSize: 16,
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyles[variant],
      ]}>
      <Text style={textStyles[variant]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;
