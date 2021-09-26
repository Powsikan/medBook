/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import DateSliderItem from './DateSliderItem';
import TimeSlotItem from './TimeSlotItem';

type scheduleBookingOptionType = {
  selectedDate: number;
  setSelectedDate: ({date: string, month: string}) => void;
  selectedSlotTime: string;
  setSelectedSlotTime: (time: string) => void;
  availableDays: string[];
  availableTimeSlots: string[];
};
const ScheduleBookingOption = ({
  selectedDate,
  setSelectedDate,
  selectedSlotTime,
  setSelectedSlotTime,
  availableDays,
  availableTimeSlots,
}: scheduleBookingOptionType) => {
  const gettingDate = new Date().toLocaleDateString().split('/')[1];
  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <FlatList
          horizontal
          data={availableDays}
          renderItem={item => (
            <DateSliderItem
              date={item.item.date}
              month={item.item.month}
              onPress={() => {
                setSelectedDate(item.item);
                setSelectedSlotTime('');
              }}
              selectedDate={selectedDate}
            />
          )}
        />
      </View>
      <ScrollView style={{height: '67%', marginBottom: 0, paddingBottom: 0}}>
        {/*<View style={styles.timeViews}>*/}
        <FlatList
          data={availableTimeSlots}
          renderItem={item => (
            // <TimeSlotItem
            //   serviceTime={item.item.serviceTime}
            //   availableSlot={item.item.availableSlot}
            //   serviceAvailable={item.item.serviceAvailable}
            //   onPress={() => setSelectedSlotTime(item.item.serviceTime)}
            //   selectedTime={selectedSlotTime}
            // />
            <TimeSlotItem
              selectedTime={selectedSlotTime}
              serviceTime={`${item?.item?.from
                ?.toString()
                .split(':')[0]
                .concat(
                  `:${item?.item?.from?.toString().split(':')[1]}`,
                )}-${item?.item?.to
                ?.toString()
                .split(':')[0]
                .concat(`:${item?.item?.to?.toString().split(':')[1]}`)}`}
              slot={item.item}
              onPress={() => setSelectedSlotTime(item.item)}
              checkTimeAvailable={
                selectedDate == Number(gettingDate) ? true : false
              }
              type="BOOKING"
            />
          )}
        />
        {/*</View>*/}
      </ScrollView>
    </View>
  );
};

export default ScheduleBookingOption;

const styles = StyleSheet.create({
  timeViews: {
    marginTop: 20,
  },
});
