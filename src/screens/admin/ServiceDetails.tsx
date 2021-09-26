/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {ServiceContext} from '../../contexts';
import {ScreenProp} from '../../type';
import {COLORS} from '../../utils/theme';
import {
  Button,
  Card,
  Container,
  Icon,
  SubTitle,
  Switch,
  Title,
} from '../shared';

const ServiceDetails = ({navigation, route}: ScreenProp) => {
  const service = route?.params?.service;
  const {onUpdateService} = useContext(ServiceContext);

  const onStatusUpdate = () => {
    const _service = service;
    _service.status = !_service.status;
    onUpdateService(_service).then();
  };

  navigation.setOptions({
    headerRight: () => (
      <View style={styles.icons}>
        <Icon
          style={{
            marginRight: 10,
            color: Platform.OS === 'ios' ? COLORS.iosBlue : COLORS.black,
          }}
          onPress={() =>
            navigation.navigate('ServiceUpdate', {service: service})
          }
          name="square-edit-outline"
        />
      </View>
    ),
  });

  return (
    <Container>
      <Card>
        <Title>Doctor Name: {service.doctorName}</Title>
        <SubTitle>Service Type: {service.serviceType}</SubTitle>
        <SubTitle>Service Charge: Rs.{service.serviceCharge}</SubTitle>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text>Status</Text>
          <Switch initialState={service.status} onChange={onStatusUpdate} />
        </View>
      </Card>
      <View>
        <Button onPress={() => navigation.navigate('ServiceSchedule')}>
          Schedule
        </Button>
      </View>
    </Container>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
  },
});
