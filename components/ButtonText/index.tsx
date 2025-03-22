// src/components/PrimaryButton.tsx
import React, {ReactNode} from 'react';
import {Text, ViewStyle, Pressable} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

// store
import {useThemeStore} from '@/globalStore';

type Props = {
  children: ReactNode;
  onPress: () => void;
  variant: 'primary' | 'secondary' | 'highlight' | 'error';
  customStyle?: ViewStyle;
};

type ContainerStyles = {
  primary: ViewStyle;
  secondary: ViewStyle;
  highlight: ViewStyle;
  error: ViewStyle;
};

const {typography, colors} = useThemeStore.getState().theme;

const ButtonText: React.FC<Props> = ({
  children,
  onPress,
  variant,
  customStyle,
}) => {
  const containerStyles: ContainerStyles = {
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.lightGray,
    },
    highlight: {
      backgroundColor: colors.highlight,
    },
    error: {
      backgroundColor: colors.alert,
    },
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pressableContainer,
        containerStyles[variant],
        {...customStyle},
      ]}>
      <ChildText variant={variant}>{children}</ChildText>
    </Pressable>
  );
};

type ChildTextProps = {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'highlight' | 'error';
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
    borderRadius: 30,
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
  highlight: {
    color: colors.white,
  },
  error: {
    color: colors.error,
  },
});
