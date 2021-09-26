/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../../contexts';
import {ScreenProp} from '../../type';
import {COLORS} from '../../utils/theme';
import {Button, Container, FormInputText} from '../shared';
const {height} = Dimensions.get('window');

const SignUp = ({navigation}: ScreenProp) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const {signUp} = useContext(AuthContext);

  const onSignUp = () => {
    signUp(email, password, fullName, phoneNumber, gender).then(res => {
      navigation.navigate('ConfirmSignUp', {username: email});
    });
  };
  return (
    <Container>
      <ScrollView>
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
          <FormInputText
            onChangeText={setFullName}
            value={fullName}
            placeHolder="Full Name"
            numberOfLines={1}
            label="Full Name"
          />
          <FormInputText
            onChangeText={setphoneNumber}
            value={phoneNumber}
            placeHolder="Phone Number"
            numberOfLines={1}
            label="Phone Number"
            keyboardType={'phone-pad'}
          />
          <FormInputText
            onChangeText={setGender}
            value={gender}
            placeHolder="Gender"
            numberOfLines={1}
            label="Gender"
          />
          <View style={styles.create}>
            <Button onPress={onSignUp}>Sign Up</Button>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>Already have an account? </Text>
            <Text
              style={{color: COLORS.iosBlue, fontSize: 20}}
              onPress={() => navigation.navigate('SignIn')}>
              Sign In
            </Text>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  create: {
    marginLeft: 50,
    marginRight: 50,
  },
});
