// src/components/PrimaryButton.tsx
import React, {ReactNode} from 'react';
import {Text, ViewStyle, Pressable} from 'react-native';
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

const {typography, colors, spacing} = useThemeStore.getState().theme;

const ButtonText: React.FC<Props> = ({children, onPress, variant}) => {
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

  return (
    <Pressable
      onPress={onPress}
      style={[styles.pressableContainer, containerStyles[variant]]}>
      <ChildText variant={variant}>{children}</ChildText>
    </Pressable>
  );
};

type ChildTextProps = {
  children: ReactNode;
  variant: 'primary' | 'secondary';
};

const ChildText: React.FC<ChildTextProps> = ({children, variant}) => {
  return (
    <Text style={[styles.commonTextStyle, styles[variant]]}>{children}</Text>
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
  commonTextStyle: {
    ...typography.skButtonMedium,
  },
  primary: {
    color: colors.textPrimary,
  },
  secondary: {
    color: colors.textPrimary,
  },
});
