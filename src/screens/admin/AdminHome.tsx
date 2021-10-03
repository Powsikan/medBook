/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Service} from '../../API';
import {ServiceContext} from '../../contexts';
import {ScreenProp} from '../../type';
import {Card, Container, FloatAddButton, SubTitle, Title} from '../shared';

const AdminHome = ({navigation}: ScreenProp) => {
  const [services, setServices] = useState<Service[]>([]);
  const {onGetServices} = useContext(ServiceContext);

  useEffect(() => {
    const unSubcribe = navigation.addListener('focus', () => {
      getServices();
    });
    return unSubcribe;
  }, [navigation]);

  const getServices = () => {
    onGetServices({}).then(res => {
      setServices(res.services);
    });
  };
  return (
    <Container>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Services</Text>
      </View>
      {services && (
        <FlatList<Service>
          numColumns={1}
          data={services}
          renderItem={item => {
            return (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() =>
                  navigation.navigate('ServiceDetails', {
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
      <FloatAddButton
        onPress={() => {
          navigation.navigate('AddService');
        }}
      />
    </Container>
  );
};

export default AdminHome;

const styles = StyleSheet.create({});
