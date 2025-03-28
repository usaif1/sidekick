// dependencies
import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import ButtonText from '@/components/ButtonText';

// assets
import SideKickLogo from '../assets/sidekick_logo.svg';

// styles
import {splashStyles} from '../splashStyles';

const SplashScreen1: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={splashStyles.layoutBackground}>
      <SideKickLogo />
      <View style={splashStyles.bottomButtonContainer}>
        <View style={{width: 220}}>
          <ButtonText
            onPress={() => {
              // @ts-ignore
              navigation.replace('splash2');
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
