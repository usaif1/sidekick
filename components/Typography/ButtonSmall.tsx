// dependencies
import {Pressable, Text, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {ScaledSheet} from 'react-native-size-matters';

// store
import {useThemeStore} from '@/theme/store';

// types
import {ColorSelector} from '@/theme/colors';

type Props = {
  children: ReactNode;
  textColor?: ColorSelector;
  customStyles?: TextStyle;
  onPress: () => void;
};

const {theme} = useThemeStore.getState();

const ButtonSmall: React.FC<Props> = ({
  children,
  textColor = 'textPrimary',
  customStyles,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <Text
        style={[
          styles.textStyle,
          {color: theme.colors[textColor]},
          customStyles,
        ]}>
        {children}
      </Text>
    </Pressable>
  );
};

export default ButtonSmall;

const styles = ScaledSheet.create({
  textStyle: {
    ...theme.typography.skButtonSmall,
  },
});
