/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Icon} from './Icon';

const {width, height} = Dimensions.get('window');
type ModalType = {
  children?: any;
  onClose?: any;
};

export const Modal = (props: ModalType) => {
  const {children, onClose} = props;

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{width: '100%', alignItems: 'flex-end'}}>
          <Icon name="close-circle" size="large" onPress={() => onClose()} />
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    position: 'absolute',
    backgroundColor: '#00000099',
    width: width,
    height: height,
    flex: 1,
    paddingBottom: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
