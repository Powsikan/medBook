import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../utils/theme';
import {AvailableTimeSlot} from '../../../API';
import {TwoButtonAlert} from '../../shared/twarui';
import {statusEnum} from '../../../utils/statusEnum';

type BookingType = {
  refNo?: string;
  serviceName: string;
  date: number | string;
  slot: AvailableTimeSlot | undefined;
  status?: string;
  price?: number;
};
const BookingCard = ({
  refNo,
  serviceName,
  date,
  slot,
  status,
  price,
}: BookingType) => {
  const gettingDate = new Date().toLocaleDateString();
  const currentDate = [
    `20${gettingDate.split('/')[2]}`,
    gettingDate.split('/')[0],
    gettingDate.split('/')[1],
  ].join('-');

  return (
    <View style={styles.bookingCard}>
      <View style={{paddingLeft: 20, paddingBottom: 30}}>
        <Text style={styles.ref}>Ref No : {refNo}</Text>
      </View>
      <View style={{alignItems: 'flex-end', marginTop: 20}}>
        <Text style={styles.serviceName}>{serviceName}</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', paddingTop: 10}}>
        <View style={{flex: 5, marginLeft: 10}}>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.serviceTimeView}>
          <Text style={styles.serviceTime}>
            {slot?.from
              ?.split(' ')[0]
              .split(':')[0]
              .concat(`:${slot?.from?.split(' ')[0].split(':')[1]}`)}
            -
            {slot?.to
              ?.split(' ')[0]
              .split(':')[0]
              .concat(`:${slot?.from?.split(' ')[0].split(':')[1]}`)}
          </Text>
        </View>
      </View>
      {/*{status && (*/}
      {/*  <View>*/}
      {/*    <Text style={styles.success}>{status}</Text>*/}
      {/*  </View>*/}
      {/*)}*/}
      {status === 'MANAGER_ACCEPTED' &&
      currentDate == date &&
      Number(slot!.from!.toString().split(':')[0]) * 60 +
        Number(slot!.from!.toString().split(':')[1]) <=
        Number(new Date().getHours()) * 60 +
          Number(new Date().getMinutes()) +
          30 ? (
        <View>
          <Text style={styles.success}>Waiting To Start</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.success}>{statusEnum[status]}</Text>
        </View>
      )}

      <View style={styles.priceView}>
        <Text style={{color: COLORS.iosBlue, fontWeight: 'bold', fontSize: 16}}>
          Rs {price}.00
        </Text>
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  ref: {
    fontSize: 12,
    color: COLORS.primaryLight,
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  date: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  serviceName: {
    color: COLORS.primary,
    fontSize: 15,
    marginRight: 20,
  },
  serviceTime: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    marginRight: 15,
  },
  success: {
    color: COLORS.white,
    fontSize: 18,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    backgroundColor: COLORS.backgroundTwo,
    alignSelf: 'flex-start',
  },
  priceView: {
    alignItems: 'center',
    marginTop: 20,
  },
  bookingCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    borderWidth: 0.3,
    marginTop: 10,
  },
  serviceTimeView: {
    flex: 5,
    alignItems: 'flex-end',
    padding: 5,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 8,
  },
});
