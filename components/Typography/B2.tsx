import {Text, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {useThemeStore} from '@/theme/store';
import {ColorSelector} from '@/theme/colors';

type Props = {
  children: ReactNode;
  textColor?: ColorSelector;
  customStyles?: TextStyle;
};

const B2: React.FC<Props> = ({
  children,
  textColor = 'textPrimary',
  customStyles,
}) => {
  // Get fresh theme data inside component
  const {theme} = useThemeStore();

  return (
    <Text
      style={[
        theme.typography.skB2, // Dynamic typography from theme
        {color: theme.colors[textColor]},
        customStyles, // Custom styles come last for proper override
      ]}>
      {children}
    </Text>
  );
};

export default B2;
