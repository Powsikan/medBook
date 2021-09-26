/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BookingContext} from '../../contexts/BookingContext';
import {ScreenProp} from '../../type';
import {COLORS} from '../../utils/theme';
import BookingConfirmationItem from '../common/components/BookingConfirmationItem';
import {Container, Button} from '../shared';

const UserBookingConfirm = ({navigation, route}: ScreenProp) => {
  const {service, selectedDate, selectedSlotTime} = route?.params;

  const {onCreateBooking} = useContext(BookingContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onBooking = () => {};

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
