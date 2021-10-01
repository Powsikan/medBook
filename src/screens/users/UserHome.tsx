/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Service} from '../../API';
import {ServiceContext} from '../../contexts';
import {ScreenProp} from '../../type';
import {Card, Container, SubTitle, Title} from '../shared';

const UserHome = ({navigation}: ScreenProp) => {
  const [services, setServices] = useState<Service[]>([]);
  const {onGetServices} = useContext(ServiceContext);

  useEffect(() => {
    const unSubcribe = navigation.addListener('focus', () => {
      getServices();
    });
    return unSubcribe;
  }, [navigation]);

  const getServices = () => {
    onGetServices({filter: {status: {eq: true}}}).then(res => {
      setServices(res.services);
    });
  };
  return (
    <Container>
      <View style={{padding: 20}}></View>
      {services && (
        <FlatList<Service>
          numColumns={1}
          data={services}
          renderItem={item => {
            return (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() =>
                  navigation.navigate('UserBookingOptions', {
                    service: item.item,
                  })
                }>
                <Card>
                  <View style={{padding: 20}}>
                    <View style={{padding: 20}}>
                      <Title>{item.item?.doctorName}</Title>
                    </View>

                    <View style={{padding: 20}}>
                      <SubTitle>{item.item?.serviceType}</SubTitle>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
          initialNumToRender={2}
        />
      )}
    </Container>
  );
};

export default UserHome;

const styles = StyleSheet.create({});
