/* eslint-disable react/self-closing-comp */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AvailableTimeSlotInput, CreateServiceInput, Service} from '../../API';
import {ServiceContext} from '../../contexts';
import {ScreenProp} from '../../type';
import {COLORS} from '../../utils/theme';
import {Button, Container, FormInputText, Icon} from '../shared';
import SlotItem from './SlotItem';

const AddService = ({navigation}: ScreenProp) => {
  const [doctorName, setDoctorName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [serviceCharge, setServiceCharge] = useState('');
  const [slots, setSlots] = useState<AvailableTimeSlotInput[]>([
    {available: true, from: '', to: ''},
  ]);

  const {onCreateService} = useContext(ServiceContext);

  const addSlot = () => {
    const emptyBoxes = slots.filter(
      slot => slot?.from === '' || slot?.to === '',
    );

    const _slots = [...slots];
    _slots.push({
      available: true,
      from: '',
      to: '',
    });
    setSlots(_slots);
  };

  const onCreate = () => {
    const newService: CreateServiceInput = {
      doctorName: doctorName,
      serviceType: serviceType,
      serviceCharge: Number(serviceCharge),
      slots: slots,
      AvailableTimes: [],
      status: true,
    };
    onCreateService(newService).then(res => {
      navigation.goBack();
    });
  };

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
        keyboardType={'decimal-pad'}
      />
      <Text>Slots</Text>
      <ScrollView>
        <View style={styles.slotView}>
          {slots &&
            slots.map((obj, key) => {
              return (
                <SlotItem
                  key={key}
                  slot={obj}
                  id={key}
                  slots={slots}
                  setSlots={setSlots}
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
      <Button onPress={onCreate}>Create</Button>
    </Container>
  );
};

export default AddService;

const styles = StyleSheet.create({
  slotView: {},
});
