import React from 'react';
import {Modal, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const DeletePopup = ({removeBookModal, setRemoveBookModal, removeFunction}) => {
  const onCancelPress = () => {
    setRemoveBookModal(false);
  };

  const onRemovePress = () => {
    removeFunction();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={removeBookModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Do you want remove this book?</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={onRemovePress}
              style={styles.removeButton}>
              <Text>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCancelPress}
              style={styles.cancelButton}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: '#ff00DD',
    padding: 10,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default DeletePopup;
