// dependencies
import {Text, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {ScaledSheet} from 'react-native-size-matters';

// store
import {useThemeStore} from '@/globalStore';

// types
import {ColorSelector} from '@/theme/colors';

type Props = {
  children: ReactNode;
  headingColor?: ColorSelector;
  weight?: TextStyle['fontWeight'];
  customStyles?: TextStyle;
};

const {theme} = useThemeStore.getState();

const TextBase: React.FC<Props> = ({
  children,
  headingColor = 'textPrimary',
  customStyles,
  weight = '500',
}) => {
  return (
    <Text
      style={[
        styles.textBase,
        {
          ...customStyles,
          color: theme.colors[headingColor],
          fontWeight: weight,
        },
      ]}>
      {children}
    </Text>
  );
};

const styles = ScaledSheet.create({
  textBase: {
    ...theme.typography.skP1,
    paddingLeft: '20@s',
  },
});

export default TextBase;
