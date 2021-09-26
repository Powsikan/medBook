/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../../contexts';
import {Button, Container} from '../shared';

const UserProfile = () => {
  const {currentUser, signOut} = useContext(AuthContext);
  return (
    <Container>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>Name: {currentUser?.attributes?.name}</Text>
        <Text>Email: {currentUser?.attributes?.email}</Text>
        <Text>Phone Number: {currentUser?.attributes?.phone_number}</Text>
      </View>
      <View style={{flex: 1}}>
        <Button onPress={signOut}>Sign out</Button>
      </View>
    </Container>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
