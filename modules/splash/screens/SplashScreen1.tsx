// dependencies

import React from 'react';
import {View} from 'react-native';

// components
import ButtonText from '@/components/ButtonText';

// assets
import SideKickLogo from '../assets/sidekick_logo.svg';
import {useThemeStore} from '@/globalStore';
import {useNavigation} from '@react-navigation/native';

const SplashScreen1: React.FC = () => {
  const {theme} = useThemeStore();

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary[500],
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SideKickLogo />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 40,
          left: 0,
          alignItems: 'center',
        }}>
        <View style={{width: 220}}>
          <ButtonText
            onPress={() => {
              navigation.navigate('screen2');
            }}
            variant="secondary">
            Get started
          </ButtonText>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen1;
