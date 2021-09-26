/* eslint-disable prettier/prettier */

import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Container, Spinner, TextInput} from '../shared';
import {COLORS} from '../../utils/theme';
import {ScreenProp} from '../../type';
import {AuthContext} from '../../contexts';

export default function ConfirmSignUp({navigation, route}: ScreenProp) {
  const {confirmSignUp} = useContext(AuthContext);
  const _username = route?.params?.username;
  console.log('email in confirm signup', _username);
  const [username, setUsername] = useState(_username);
  const [authCode, setAuthCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onConfirmSignUp = () => {
    setIsLoading(true);
    confirmSignUp(username, authCode).then(() => {
      navigation.navigate('SignIn');
      setIsLoading(false);
    });
  };
  return (
    <Container>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Sign Up</Text>
        <View style={styles.textView}>
          <TextInput
            style={styles.textInput}
            value={authCode}
            onChangeText={(text: string) => setAuthCode(text)}
            leftIcon="numeric"
            placeholder="Enter verification code"
            keyboardType="numeric"
          />
        </View>
        <Button onPress={() => onConfirmSignUp()}>Confirm Sign Up</Button>
        {isLoading && <Spinner />}
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  textView: {
    width: '80%',
    marginVertical: 10,
    paddingVertical: 3,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 15,
  },
  textInput: {
    fontSize: 18,
    color: '#101010',
    paddingVertical: 10,
  },
});
