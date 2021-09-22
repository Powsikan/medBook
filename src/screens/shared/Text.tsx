/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../utils/theme';

type TextType = {
  children: any;
  style?: any;
};

export const Header = (props: TextType) => {
  const {children} = props;
  return (
    <View>
      <Text style={styles.header}>{children}</Text>
    </View>
  );
};
export const SubHeader = (props: TextType) => {
  const {children, style} = props;
  return (
    <View
      style={[
        {alignItems: 'center', justifyContent: 'center', alignSelf: 'center'},
        style,
      ]}>
      <Text numberOfLines={2} style={styles.subHeader}>
        {children}
      </Text>
    </View>
  );
};
export const Title = (props: TextType) => {
  const {children} = props;
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};
export const SubTitle = (props: TextType) => {
  const {children, style} = props;
  return (
    <View style={style}>
      <Text style={styles.subTitle}>{children}</Text>
    </View>
  );
};

export const Body = (props: TextType) => {
  const {children} = props;
  return (
    <View>
      <Text style={styles.body}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 22,
    padding: 10,
    paddingLeft: 10,
    color: COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 17,
  },
  body: {
    fontSize: 16,
  },
});
