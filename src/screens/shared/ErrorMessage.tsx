/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../utils/theme';

export const ErrorMessage = (props: any) => {
  const {messege} = props;
  return (
    <View>
      <Animatable.View
        animation="fadeInLeft"
        duration={300}
        style={{
          height: 20,
          justifyContent: 'center',
        }}>
        <Text style={styles.errorMsg}>{messege}</Text>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMsg: {
    color: COLORS.error,
    fontSize: 14,
  },
});
