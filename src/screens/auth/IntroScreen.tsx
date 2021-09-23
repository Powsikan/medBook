/* eslint-disable prettier/prettier */
import React, {useContext, useEffect} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../contexts/';
import {COLORS} from '../../utils/theme';

const {height} = Dimensions.get('window');
const IntroScreen = (): JSX.Element => {
  const {localLogin} = useContext(AuthContext);

  useEffect(() => {
    localLogin();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={require('../../../assets/logo.png')}
          style={{height: height * 0.3, width: height * 0.3}}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.loadingTitle}>Loading Data for you</Text>
        <Text style={styles.loadingData}>Please Wait</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryDark,
  },
  loadingTitle: {
    fontSize: 15,
    color: COLORS.gray,
  },
  loadingData: {
    fontSize: 25,
    color: COLORS.white,
  },
});
export default IntroScreen;
