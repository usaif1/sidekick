import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Modal} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useThemeStore} from '@/globalStore';

interface LocationLoadingModalProps {
  visible: boolean;
}

const LocationLoadingModal: React.FC<LocationLoadingModalProps> = ({visible}) => {
  const {theme} = useThemeStore();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            style={styles.loader}
          />
          <Text style={[styles.title, {color: theme.colors.textPrimary}]}>
            Fetching your location
          </Text>
          <Text style={[styles.subtitle, {color: theme.colors.textSecondary}]}>
            Please wait
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: moderateScale(16),
    padding: scale(24),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: scale(200),
  },
  loader: {
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default LocationLoadingModal; 