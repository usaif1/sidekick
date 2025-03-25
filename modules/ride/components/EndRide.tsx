// dependencies
import {Dimensions, FlatList, Pressable, View} from 'react-native';
import React from 'react';
import {ScaledSheet} from 'react-native-size-matters';

// components
import {ReachedHub} from '../components';
import {ButtonText, Divider, H2, H3, P2} from '@/components';

// store
import {useGlobalStore, useRideStore} from '@/globalStore';
import {useThemeStore} from '@/theme/store';
import {SelectedHub} from '../store';

const {
  theme: {colors},
} = useThemeStore.getState();

const nearestHubs = [
  {
    id: 'car_parking',
    label: 'Car Parking',
    distance: '23m',
  },
  {
    id: 'gate2',
    label: 'Gate 2',
    distance: '125m',
  },
  {
    id: 'gate3',
    label: 'Gate 5',
    distance: '144m',
  },
  {
    id: 'gate4',
    label: 'Car Parking',
    distance: '23m',
  },
  {
    id: 'gate5',
    label: 'Gate 2',
    distance: '125m',
  },
  {
    id: 'gate6',
    label: 'Gate 5',
    distance: '144m',
  },
];

type NearestHubCardProps = {
  hub: SelectedHub;
  selectedHub: SelectedHub;
  setSelectedHub: (hub: SelectedHub) => void;
};

const NearestHubCard: React.FC<NearestHubCardProps> = ({
  hub,
  selectedHub,
  setSelectedHub,
}) => {
  return (
    <Pressable
      onPress={() => {
        setSelectedHub(hub);
      }}
      style={[
        styles.nearestCardContainer,
        {
          borderWidth: selectedHub.id === hub.id ? 2 : 0,
        },
      ]}>
      <H3>{hub.label}</H3>
      <H3 textColor="highlight">{hub.distance}</H3>
    </Pressable>
  );
};

const EndRide: React.FC = () => {
  const {selectedHub, setSelectedHub} = useRideStore();

  const {closeModal, setModalComponent} = useGlobalStore();

  const onEndRide = () => {
    setModalComponent(ReachedHub);
  };

  return (
    <View style={styles.endRideWrapper}>
      <View>
        <H2 customStyles={{textAlign: 'center'}}>Nearest Hub is 23m away!</H2>
        <P2 customStyles={{textAlign: 'center'}} textColor="textSecondary">
          Please select the nearest hub to continue.
        </P2>
      </View>
      <Divider height={16} />
      <View style={{maxHeight: Dimensions.get('window').height * 0.25}}>
        <FlatList
          data={nearestHubs}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <NearestHubCard
              hub={item}
              selectedHub={selectedHub}
              setSelectedHub={setSelectedHub}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <Divider height={16} />
      <View style={styles.actionButtonContainer}>
        <ButtonText variant="primary" onPress={closeModal}>
          Resume Ride
        </ButtonText>
        <ButtonText variant="error" onPress={onEndRide}>
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
    width: '100%',
  },
  nearestCardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18@ms',
    borderRadius: 20,
    borderColor: colors.primary,
  },
  actionButtonContainer: {
    width: '100%',
    alignItems: 'center',
    rowGap: 12,
    paddingHorizontal: '18@ms',
  },
});
