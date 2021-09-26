/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Service} from '../../API';
import {ServiceContext} from '../../contexts';
import {ScreenProp} from '../../type';
import {COLORS} from '../../utils/theme';
import ScheduleBookingOption from '../common/components/ScheduleBookingOption';
import {Button, Container} from '../shared';

const UserBookingOptions = ({navigation, route}: ScreenProp) => {
  const [service, setService] = useState<Service>(route.params?.service);
  const [selectedDate, setSelectedDate] = useState({date: '', month: ''});
  const [selectedSlotTime, setSelectedSlotTime] = useState('');
  const [scheduledDates, setScheduledDates] = useState<string[]>([]);
  const {onGetService} = useContext(ServiceContext);
  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    const unSubcribe = navigation.addListener('focus', () => {
      getDates();
      onGetService(service.id).then(ser => {
        setService(ser);
      });
    });
    return unSubcribe;
  }, [navigation]);

  const getDates = async () => {
    await onGetService(service.id)
      .then(res => {
        setShowEmpty(true);
        setScheduledDates(res.AvailableTimes);
        setSelectedDate({
          date: res.AvailableTimes.filter(date => date !== null)[0].split(
            '-',
          )[2],
          month: res.AvailableTimes.filter(date => date !== null)[0].split(
            '-',
          )[1],
        });
      })
      .catch(() => setShowEmpty(true));
  };

  return (
    <Container>
      <View style={styles.serviceNameView}>
        <Text style={styles.serviceNameText}>{service.doctorName}</Text>
      </View>
      <View style={styles.bookingOption}>
        <ScheduleBookingOption
          selectedDate={selectedDate.date}
          setSelectedDate={setSelectedDate}
          selectedSlotTime={selectedSlotTime}
          setSelectedSlotTime={setSelectedSlotTime}
          availableDays={scheduledDates
            .filter(date => date !== null)
            .map(sDate => {
              return {
                date: sDate.split('-')[2],
                month: sDate.split('-')[1],
              };
            })}
          availableTimeSlots={service.slots}
        />
      </View>
      {showEmpty && scheduledDates.length === 0 && (
        <View style={styles.emptyView}>
          <Text style={styles.emptyText}>Service Not Available</Text>
        </View>
      )}
      {scheduledDates.length > 0 && (
        <View style={styles.confirm}>
          <Button
            onPress={() =>
              navigation.navigate('UserBookingConfirmation', {
                service: service,
                selectedDate: selectedDate,
                selectedSlotTime: selectedSlotTime,
              })
            }
            disabled={!selectedSlotTime}>
            Confirm
          </Button>
        </View>
      )}
    </Container>
  );
};

export default UserBookingOptions;

const styles = StyleSheet.create({
  serviceNameView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 0.5,
  },
  serviceNameText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
    textTransform: 'uppercase',
  },
  bookingOption: {
    // marginTop: 20,
    display: 'flex',

    flex: 6,
  },
  confirm: {
    justifyContent: 'flex-end',
    marginBottom: 0,
    marginLeft: 40,
    marginRight: 40,
    flex: 1,
  },
  emptyView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -200,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
