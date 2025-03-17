import React from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import globalStore from '@/globalStore/globalStore';
import Close from '@/assets/cross.svg';

const GlobalModal: React.FC = () => {
  const isModalOpen = globalStore.use.isModalOpen();
  const ModalComponent = globalStore.use.ModalComponent();
  const closeModal = globalStore.use.closeModal();

  return (
    <Modal
      isVisible={isModalOpen}
      coverScreen={true}
      statusBarTranslucent
      deviceHeight={Dimensions.get('screen').height}
      style={{zIndex: 9999, flex: 1}}
      backdropOpacity={0.5}
      useNativeDriver // Add this
      hideModalContentWhileAnimating // Add this
      avoidKeyboard // Helps with Android keyboard
      renderToHardwareTextureAndroid
      animationIn="slideInUp"
      animationInTiming={350}
      animationOutTiming={100}
      backdropTransitionOutTiming={100}
      backdropTransitionInTiming={300}
      animationOut="slideOutDown"
      onBackdropPress={closeModal}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Close width={24} height={24} />
        </TouchableOpacity>
        {ModalComponent && <ModalComponent />}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    maxHeight: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#86A0CA',
    borderStyle: 'solid',
    position: 'relative',
    zIndex: 99,
    elevation: 24, // Android
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
    zIndex: 99,
  },
});

export default GlobalModal;
