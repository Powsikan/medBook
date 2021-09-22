/* eslint-disable prettier/prettier */
import React from 'react';
import {Icon} from './Icon';
import {StyleSheet, TouchableOpacity} from 'react-native';

type IconType = {
  onPress?: () => void | undefined;
};

export const FloatAddButton = (props: IconType) => {
  const {onPress} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.floatAdd}>
      <Icon name="plus-circle" size="extra-large" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatAdd: {
    position: 'absolute',
    right: 30,
    bottom: 20,
  },
});
