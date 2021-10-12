/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Booking} from '../../../API';
import {BookingContext} from '../../../contexts';
import {ScreenProp} from '../../../type';
import UpComingBookingItem from './UpComingBookingItem';

const UpCommingBookings = ({navigation}: ScreenProp) => {
  const {onGetBookings} = useContext(BookingContext);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [apiCallingEnd, setApiCallingEnd] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBookings();
    });

    return unsubscribe;
  }, [navigation]);

  const getBookings = async () => {
    await onGetBookings({
      filter: {
        status: {eq: 'MANAGER_ACCEPTED'},
      },
    })
      .then(res => {
        console.log('upcomming bookings response', res);
        setBookings(res.bookings);
        setApiCallingEnd(true);
      })
      .catch(() => {
        setApiCallingEnd(true);
      });
  };

  const onGetUpdatebookings = async () => {
    await onGetBookings({
      filter: {
        status: {eq: 'MANAGER_ACCEPTED'},
      },
    }).then(res => {
      setBookings(res.bookings);
    });
  };

  return (
    <View style={{flex: 1, margin: 10}}>
      {apiCallingEnd && bookings?.length === 0 && (
        <Text style={{alignItems: 'center', fontWeight: 'bold', padding: 80}}>
          Currently you don't have upcomming bookings.
        </Text>
      )}
      {bookings && (
        <FlatList
          data={bookings}
          renderItem={({item: booking}) => (
            <UpComingBookingItem
              onUpdate={onGetUpdatebookings}
              booking={booking}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default UpCommingBookings;

const styles = StyleSheet.create({});
