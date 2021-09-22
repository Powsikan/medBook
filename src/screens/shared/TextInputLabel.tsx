/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../utils/theme';
import {Res} from './Responsive';

export const TextInputLabel = (props: any) => {
  return <Text style={styles.text_label}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text_label: {
    color: COLORS.secondary,
    fontSize: 16,
    marginTop: Res * 5,
  },
});
