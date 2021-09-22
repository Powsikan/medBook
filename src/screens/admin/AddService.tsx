/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {Button, Container, FormInputText, Icon} from '../shared';

import SlotItem from './SlotItem';

const AddService = () => {
  const [doctorName, setDoctorName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [slots, setSlots] = useState<{}[]>([
    {available: true, from: '', to: ''},
  ]);

  const addSlot = () => {
    console.log;
  };

  const OnUpdate = () => {};

  return (
    <Container>
      <FormInputText
        onChangeText={setDoctorName}
        value={doctorName}
        placeHolder="Doctor Name"
        label="Doctor Name"
      />
      <FormInputText
        onChangeText={setServiceType}
        value={serviceType}
        placeHolder="Service Type"
        label="Service Type"
      />
      <FormInputText
        onChangeText={setServiceCharge}
        value={serviceCharge}
        placeHolder="Service Charge"
        label="Service Charge"
      />
      <ScrollView>
        <View>
          {slots &&
            slots.map((obj, key) => {
              return (
                <SlotItem
                  key={key}
                  slot={obj}
                  id={key}
                  slots={slots}
                  setSlots={setSlots}
                  showValidationError={showValidationError}
                />
              );
            })}
        </View>
        <View>
          <Button
            onPress={() => {
              addSlot();
            }}>
            <Icon name={'plus'} size={30} color={COLORS.primary} />
          </Button>
        </View>
      </ScrollView>
      <Button onPress={OnUpdate}>Update</Button>
    </Container>
  );
};

export default AddService;

const styles = StyleSheet.create({});
