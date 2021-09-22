/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../utils/theme';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Title} from './Text';

type TopNavigationBarType = {
  title?: string;
  backButtonAction?: any;
  rightButtonAction?: any;
  rightButtonIcon?: any;
};

export const TopNavigationBar = (props: TopNavigationBarType) => {
  const {backButtonAction, rightButtonAction, title, rightButtonIcon} = props;
  return (
    <View style={styles.navBar}>
      <View>
        <TouchableOpacity onPress={backButtonAction} style={{zIndex: 9}}>
          <Icon
            style={{backgroundColor: COLORS.white, borderRadius: 20}}
            name="arrow-left"
            size={35}
            color="#000000"
          />
        </TouchableOpacity>
      </View>
      <View>
        <Title>{title}</Title>
      </View>
      <View>
        <TouchableOpacity onPress={rightButtonAction} style={{zIndex: 9}}>
          <Icon
            style={{backgroundColor: COLORS.white, borderRadius: 20}}
            name={rightButtonIcon}
            size={35}
            color="#000000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

TopNavigationBar.prototype = {
  title: PropTypes.string,
  backButtonAction: PropTypes.func,
};
const styles = StyleSheet.create({
  navBar: {
    zIndex: 999,
    top: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fafafa',
    // padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
