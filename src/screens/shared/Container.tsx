/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../utils/theme';
import PropTypes from 'prop-types';

type ContainerType = {
  children?: any;
  style?: any;
};

export const Container = (props: ContainerType) => {
  const {children, style} = props;
  return <View style={[styles.container, {...style}]}>{children}</View>;
};

Container.prototype = {
  children: PropTypes.string,
  style: PropTypes.object,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    margin: 10,
    flex: 1,
  },
});
