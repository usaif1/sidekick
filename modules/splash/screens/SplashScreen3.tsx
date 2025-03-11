// dependencies
import React from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';

// components
import ButtonText from '@/components/ButtonText';
import SideKickLogo from '../assets/splash_finish.svg';

// assets
import {useGlobalStore} from '@/globalStore';

// styles
import {splashStyles} from '../splashStyles';

const SplashScreen3: React.FC = () => {
  return (
    <View style={splashStyles.layoutBackground}>
      <SideKickLogo />
      <View style={splashStyles.bottomButtonContainer}>
        <View style={{width: scale(179)}}>
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

export default SplashScreen3;
