/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

// type CardType = {
//     children: any;
//     style?:any
// };

// @ts-ignore
export const Card = ({children, style}) => {
  return <View style={[styles.card, {...style}]}>{children}</View>;
};

Card.defaultProps = {
  style: {},
};

Card.prototype = {
  children: PropTypes.string,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    padding: 4,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 3,
    shadowOpacity: 0.26,
    elevation: 4,
    borderRadius: 10,
  },
});
