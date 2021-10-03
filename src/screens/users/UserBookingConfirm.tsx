/* eslint-disable prettier/prettier */
import {log} from 'console';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CreateBookingInput, Service, UpdateServiceInput} from '../../API';
import {AuthContext, ServiceContext} from '../../contexts';
import {BookingContext} from '../../contexts/BookingContext';
import {ScreenProp} from '../../type';
import {refNoGenerator} from '../../utils/refNoGenerator';
import {COLORS} from '../../utils/theme';
import BookingConfirmationItem from '../common/components/BookingConfirmationItem';
import {Container, Button} from '../shared';

const UserBookingConfirm = ({navigation, route}: ScreenProp) => {
  const {service, selectedDate, selectedSlotTime} = route?.params;

  const {onCreateBooking} = useContext(BookingContext);
  const {onUpdateService} = useContext(ServiceContext);
  const {currentUser} = useContext(AuthContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onBooking = () => {
    setButtonDisabled(true);
    const newBooking: CreateBookingInput = {
      refNo: refNoGenerator(),
      userId: currentUser?.attributes?.sub,
      serviceId: service.id,
      serviceName: service.doctorName,
      date: `${new Date().getUTCFullYear()}-${selectedDate.month}-${
        selectedDate.date
      }`,
      slot: selectedSlotTime,
      bookingCharge: service.serviceCharge,
      status: 'CREATED',
    };
    console.log({newBooking});
    onCreateBooking(newBooking)
      .then(res => {
        const _service: UpdateServiceInput = service;
        _service.AvailableTimes?.map(async time => {
          if (
            time!.date ==
            `${new Date().getUTCFullYear()}-${selectedDate.month}-${
              selectedDate.date
            }`
          ) {
            await time!.slots?.map(slot => {
              if (slot === selectedSlotTime) {
                slot!.available = false;
              }
            });
          }
        });
        onUpdateService(_service).then(res => {
          setButtonDisabled(false);
          navigation.navigate('Home');
        });
      })
      .catch(e => setButtonDisabled(false));
  };

  return (
    <Container>
      <View>
        <BookingConfirmationItem
          serviceName={service?.doctorName}
          date={`${new Date().getUTCFullYear()}-${selectedDate.month}-${
            selectedDate.date
          }`}
          serviceTime={`${selectedSlotTime?.from
            .toString()
            .split(':')[0]
            .concat(
              `:${selectedSlotTime?.from?.toString().split(':')[1]}`,
            )} - ${selectedSlotTime?.to
            .toString()
            .split(':')[0]
            .concat(`:${selectedSlotTime?.to?.toString().split(':')[1]}`)}`}
        />
      </View>
      <View style={styles.priceView}>
        <Text style={styles.price}>Rs {service?.serviceCharge}</Text>
      </View>
      <View style={styles.button}>
        <Button disabled={buttonDisabled} onPress={() => onBooking()}>
          Book
        </Button>
      </View>
    </Container>
  );
};

export default UserBookingConfirm;

const styles = StyleSheet.create({
  shopName: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  symbol: {
    color: COLORS.white,
  },

  price: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  priceView: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginRight: 30,
    marginLeft: 30,
  },
});
