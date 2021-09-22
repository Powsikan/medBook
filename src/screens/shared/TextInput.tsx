/* eslint-disable prettier/prettier */
import React from 'react';
import {Platform, StyleSheet, TextInput as Input} from 'react-native';
import {COLORS} from '../../utils/theme';

export const TextInput = (props: any) => {
  return (
    <Input
      placeholderTextColor={COLORS.placeHolder}
      style={styles.textInput}
      autoCapitalize="none"
      maxLength={40}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: COLORS.black,
  },
});
