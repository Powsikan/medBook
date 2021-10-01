/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-animatable';
import {AuthContext} from '../../contexts';
import {ScreenProp} from '../../type';
import {COLORS} from '../../utils/theme';
import {Button, Container, FormInputText} from '../shared';
const {height} = Dimensions.get('window');

const SignIn = ({navigation}: ScreenProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AuthContext);

  const onSignIn = () => {
    signIn(email, password);
  };
  return (
    <Container>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../../assets/logo.png')}
          style={{height: height * 0.3, width: height * 0.3}}
        />
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FormInputText
          onChangeText={setEmail}
          value={email}
          placeHolder="Email"
          numberOfLines={1}
          label="Email"
          keyboardType={'email-address'}
        />
        <FormInputText
          onChangeText={setPassword}
          value={password}
          placeHolder="Password"
          numberOfLines={1}
          label="Password"
          secureTextEntry={true}
        />
        <View style={styles.create}>
          <Button onPress={onSignIn}>Sign In</Button>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontSize: 20}}>Don't have an account? </Text>
          <Text
            style={{color: COLORS.iosBlue, fontSize: 20}}
            onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  create: {
    marginLeft: 50,
    marginRight: 50,
    width: '50%',
  },
});
