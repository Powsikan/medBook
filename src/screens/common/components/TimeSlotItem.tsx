/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../utils/theme';
import {Switch} from '../../shared';
import {AvailableTimeSlot} from '../../../API';

type TimeSlotItemType = {
  serviceTime?: number | string;
  selectedTime?: number | string | null;
  onPress?: () => void | null;
  serviceAvailable?: boolean;
  switchUpdate?: () => void;
  slot?: AvailableTimeSlot;
  checkTimeAvailable?: boolean;
  type?: 'BOOKING' | 'SCHEDULE' | null;
};

const TimeSlotItem = ({
  switchUpdate,
  serviceTime,
  selectedTime,
  onPress,
  serviceAvailable,
  slot,
  checkTimeAvailable,
  type,
}: TimeSlotItemType) => {
  const checkTimeIsEnd = () => {
    console.log('split times', serviceTime?.toString().split(':')[2]);
    if (
      (Number(new Date().getHours()) ==
        Number(serviceTime?.toString().split(':')[1].split('-')[1]) &&
        Number(new Date().getMinutes()) >=
          Number(serviceTime?.toString().split(':')[2])) ||
      Number(new Date().getHours()) >
        Number(serviceTime?.toString().split(':')[1].split('-')[1])
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <TouchableOpacity
      onPress={
        checkTimeAvailable
          ? checkTimeIsEnd()
            ? null
            : onPress
          : type == 'BOOKING'
          ? onPress
          : null
      }>
      <View
        style={[
          styles.timeSlot,
          {
            backgroundColor:
              selectedTime != undefined && selectedTime == slot
                ? COLORS.secondary
                : COLORS.white,
            opacity: checkTimeAvailable
              ? checkTimeIsEnd()
                ? 0.3
                : 1
              : type == 'BOOKING'
              ? 1
              : 0.3,
          },
        ]}>
        <View style={styles.TimeView}>
          <Text
            style={[
              styles.font,
              {
                color:
                  selectedTime != undefined && selectedTime == slot
                    ? COLORS.white
                    : COLORS.primary,
              },
            ]}>
            {serviceTime}
          </Text>
        </View>
        <View
          style={[
            styles.availableServiceView,
            {
              backgroundColor:
                selectedTime != undefined && selectedTime == slot
                  ? COLORS.white
                  : COLORS.gray,
            },
          ]}>
          {/* <Text>{availableSlot}</Text> */}
        </View>
        {serviceAvailable !== undefined && (
          <View style={styles.switch}>
            <Switch initialState={serviceAvailable} onChange={switchUpdate} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default TimeSlotItem;

const styles = StyleSheet.create({
  timeSlot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 35,
    borderRadius: 15,
    marginVertical: 10,
  },
  TimeView: {
    flex: 8,
    paddingLeft: 30,
  },
  availableServiceView: {
    flex: 1,
    marginRight: 35,
    borderRadius: 6,
    borderColor: COLORS.black,
    borderWidth: 1,
    color: COLORS.black,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  switch: {
    flex: 1,
  },
  font: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
