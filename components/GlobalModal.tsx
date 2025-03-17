import React from 'react';
import Modal from 'react-native-modal';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import globalStore from '@/globalStore/globalStore';
import Close from '@/assets/cross.svg';

const GlobalModal: React.FC = () => {
  const isModalOpen = globalStore.use.isModalOpen();
  const ModalComponent = globalStore.use.ModalComponent();
  const closeModal = globalStore.use.closeModal();

  return (
    <Modal
      isVisible={isModalOpen}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={1000}
      backdropOpacity={0.5}
      animationIn="slideInUp"
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
    minHeight: '40%',
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#86A0CA',
    borderStyle: 'solid',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
});

export default GlobalModal;
