// dependencies
import React from 'react';
import {View} from 'react-native';

// components
import ButtonText from '@/components/ButtonText';

// assets
import SideKickLogo from '../assets/splash_finish.svg';
import {useGlobalStore, useThemeStore} from '@/globalStore';

const SplashScreen1: React.FC = () => {
  const {theme} = useThemeStore();

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
              useGlobalStore.setState(prevState => ({
                ...prevState,
                firsTime: false,
              }));
            }}
            variant="secondary">
            Continue to ride
          </ButtonText>
        </View>
      </View>
    </View>
  );
};

export default SplashScreen1;
