/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AvailableTimeSlotInput, UpdateServiceInput} from '../../API';
import {ServiceContext} from '../../contexts';
import {ScreenProp} from '../../type';
import {COLORS} from '../../utils/theme';
import {Button, Container, FormInputText, Icon} from '../shared';
import SlotItem from './SlotItem';

const UpdateService = ({navigation, route}: ScreenProp) => {
  const service = route?.params?.service;

  const [doctorName, setDoctorName] = useState(service.doctorName);
  const [serviceType, setServiceType] = useState(service.serviceType);
  const [serviceCharge, setServiceCharge] = useState(
    service.serviceCharge.toString(),
  );
  const [slots, setSlots] = useState<AvailableTimeSlotInput[]>(service.slots);

  const {onUpdateService} = useContext(ServiceContext);

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

  const onUpdate = () => {
    const updateService: UpdateServiceInput = {
      id: service.id,
      doctorName: doctorName,
      serviceType: serviceType,
      serviceCharge: Number(serviceCharge),
      slots: slots,
      AvailableTimes: [],
      status: service.status,
    };
    onUpdateService(updateService).then(res => {
      navigation.navigate('Home');
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
      <Button onPress={onUpdate}>Update</Button>
    </Container>
  );
};

export default UpdateService;

const styles = StyleSheet.create({});
