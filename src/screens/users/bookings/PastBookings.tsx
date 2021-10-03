/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Booking} from '../../../API';
import {AuthContext, BookingContext} from '../../../contexts';
import {ScreenProp} from '../../../type';
import BookingCard from '../../common/components/BookingCard';
import {Container} from '../../shared';

const PastBookings = ({navigation}: ScreenProp) => {
  const {currentUser} = useContext(AuthContext);
  const {onGetBookings} = useContext(BookingContext);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [apiCallingEnd, setApiCallingEnd] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMyBookings();
    });
    return unsubscribe;
  }, [navigation]);

  const getMyBookings = async () => {
    setApiCallingEnd(false);
    const userid = currentUser?.attributes?.sub;
    await onGetBookings({
      filter: {
        and: [
          {userId: {eq: userid}},
          {
            or: [
              {status: {eq: 'USER_CANCEL'}},
              {status: {eq: 'ADMIN_DECLINE'}},
              {status: {eq: 'BOOKING_SUCCESS'}},
              {status: {eq: 'BOOKING_FAIL'}},
            ],
          },
        ],
      },
    })
      .then(res => {
        setBookings(res.bookings);
        console.log('find bookings as a user', res.bookings);
        setApiCallingEnd(true);
      })
      .catch(err => {
        setApiCallingEnd(true);
        console.log('error as user', err);
      });
  };
  return (
    <Container>
      {apiCallingEnd && bookings?.length === 0 && (
        <Text style={{alignItems: 'center', fontWeight: 'bold', padding: 80}}>
          Currently you don't have Past orders
        </Text>
      )}
      <FlatList
        data={bookings}
        renderItem={item => (
          <View key={item.item.refNo!}>
            <BookingCard
              serviceName={item.item.serviceName}
              date={item.item.date}
              slot={item.item.slot}
              price={item.item.bookingCharge}
              refNo={item.item.refNo!}
              status={item.item.status}
            />
          </View>
        )}
        keyExtractor={item => item.id!}
      />
    </Container>
  );
};

export default PastBookings;

const styles = StyleSheet.create({});
