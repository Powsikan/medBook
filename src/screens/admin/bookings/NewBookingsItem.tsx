/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BookingContext} from '../../../contexts';
import {COLORS} from '../../../utils/theme';
import {TwoButtonAlert} from '../../shared';

const NewBookingsItem = props => {
  const {onUpdateBooking} = useContext(BookingContext);
  const {refNo, date, slot, bookingCharge, serviceName} = props.booking;
  const {onUpdate, booking} = props;

  const onChangeBookingStatus = async (
    statusReq: 'MANAGER_DECLINE' | 'MANAGER_ACCEPTED',
  ) => {
    const _booking = booking;
    _booking.status = statusReq;
    await onUpdateBooking(_booking)
      .then(() => onUpdate())
      .catch(() => console.log('error part is working'));
  };

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
              .concat(`:${slot?.from?.split(' ')[0].split(':')[1]}`)}{' '}
            -{' '}
          </Text>
          <Text style={styles.serviceTime}>
            {slot?.to
              ?.split(' ')[0]
              .split(':')[0]
              .concat(`:${slot?.to?.split(' ')[0].split(':')[1]}`)}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={[styles.acceptButton, {backgroundColor: COLORS.error}]}
          onPress={() => {
            TwoButtonAlert({
              title: 'Confirm To Decline',
              onOkPress: () => onChangeBookingStatus('MANAGER_DECLINE'),
            });
          }}>
          <Text style={styles.acceptButtonText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.acceptButton, {backgroundColor: COLORS.success}]}
          onPress={() => {
            TwoButtonAlert({
              title: 'Confirm To Accept',
              onOkPress: () => onChangeBookingStatus('MANAGER_ACCEPTED'),
            });
          }}>
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceView}>
        <Text style={{color: COLORS.iosBlue, fontWeight: 'bold', fontSize: 16}}>
          Rs {bookingCharge}.00
        </Text>
      </View>
    </View>
  );
};

export default NewBookingsItem;

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
    flexDirection: 'row',
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 8,
  },
  acceptButton: {
    shadowOpacity: 0.4,
    margin: 20,
    borderRadius: 10,
    height: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
  },
  acceptButtonText: {
    color: COLORS.white,
    fontSize: 24,
  },
  orderView: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    borderWidth: 3,
  },
  rowCenterView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  companyView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    zIndex: 10,
  },
});
