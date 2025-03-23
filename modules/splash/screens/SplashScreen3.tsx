// dependencies
import React from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';

// components
import ButtonText from '@/components/ButtonText';
import SideKickLogo from '../assets/splash_finish.svg';

// styles
import {splashStyles} from '../splashStyles';

// store
import {useGlobalStore, useAuthStore} from '@/globalStore';
import {splashStorage} from '@/globalStorage';

const SplashScreen3: React.FC = () => {
  const {setOnboarded} = useGlobalStore();
  const {stopLoading} = useAuthStore();

  return (
    <View style={splashStyles.layoutBackground}>
      <SideKickLogo />
      <View style={splashStyles.bottomButtonContainer}>
        <View style={{width: scale(179)}}>
          <ButtonText
            onPress={() => {
              stopLoading('loading-user');
              splashStorage.set('onboarded', true);
              setOnboarded(true);
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
