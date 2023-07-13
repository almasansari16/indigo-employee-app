import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { wp } from '../../App';

const CustomModal = ({ visible, hideModal, children }) => {
    return (
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          {children}
        </Modal>
      </Portal>
    );
  };

  
  export default CustomModal
    
  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      margin: 20,
      borderRadius:wp(5)
    },
    closeButton: {
      marginTop: 10,
      width:wp(50),
      display:'flex',
      justifyContent:'center',
      alignSelf:'center',
      backgroundColor:'#000',
    },
  });