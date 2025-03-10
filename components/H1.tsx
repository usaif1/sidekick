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
  customStyles?: TextStyle;
};

const {theme} = useThemeStore.getState();

const HeadingPrimary: React.FC<Props> = ({
  children,
  headingColor = 'textPrimary',
  customStyles,
}) => {
  return (
    <Text
      style={[
        styles.headingPrimary,
        {color: theme.colors[headingColor], ...customStyles},
      ]}>
      {children}
    </Text>
  );
};

const styles = ScaledSheet.create({
  headingPrimary: {
    ...theme.typography.skH1,
    paddingLeft: '20@s',
  },
});

export default HeadingPrimary;
