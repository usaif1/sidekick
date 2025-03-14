// dependencies
import { Text, TextStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { ScaledSheet } from 'react-native-size-matters';

// store
import { useThemeStore } from '@/globalStore';

// types
import { ColorSelector } from '@/theme/colors';

type Props = {
  children: ReactNode;
  headingColor?: ColorSelector;
  customStyles?: TextStyle;
};

const { theme } = useThemeStore.getState();

const HeadingSecondary: React.FC<Props> = ({
  children,
  headingColor = 'textPrimary',
  customStyles,
}) => {
  return (
    <Text
      style={[
        styles.headingSecondary,
        { color: theme.colors[headingColor], ...customStyles },
      ]}
    >
      {children}
    </Text>
  );
};

const styles = ScaledSheet.create({
  headingSecondary: {
    ...theme.typography.skH2, 
    paddingLeft: '20@s', 
  },
});

export default HeadingSecondary;
