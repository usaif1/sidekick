// dependencies
import {View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';

// components
import {ReachedHub} from '../components';
import {ButtonText, Divider, H2, P2} from '@/components';

// store
import {useGlobalStore, useRideStore} from '@/globalStore';
import {useThemeStore} from '@/theme/store';

const {
  theme: {colors},
} = useThemeStore.getState();

const EndRide: React.FC = () => {
  const {closeModal, setModalComponent} = useGlobalStore();
  const {setIsPaused} = useRideStore();

  return (
    <View style={styles.endRideWrapper}>
      <View>
        <H2 customStyles={{textAlign: 'center'}}>
          End Your Ride?
        </H2>
        <P2 customStyles={{textAlign: 'center'}} textColor="textSecondary">
          You can resume your ride or end it here.
        </P2>
      </View>
      <Divider height={24} />
      <View style={styles.actionButtonContainer}>
        <ButtonText
          variant="primary"
          onPress={() => {
            setIsPaused(false);
            closeModal();
          }}>
          Resume Ride
        </ButtonText>
        <ButtonText
          variant="error"
          onPress={() => setModalComponent(ReachedHub)}>
          End Ride
        </ButtonText>
      </View>
    </View>
  );
};

export default EndRide;

const styles = ScaledSheet.create({
  endRideWrapper: {
    backgroundColor: colors.white,
    paddingTop: '41.6@vs',
    paddingHorizontal: '18@ms',
    width: '100%',
  },
  actionButtonContainer: {
    width: '100%',
    alignItems: 'center',
    rowGap: 12,
  },
});
