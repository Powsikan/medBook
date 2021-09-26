/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../utils/theme';

type DateSliderItemType = {
  date?: number;
  month?: string;
  onPress?: () => void;
  selectedDate?: number | null;
};

const DateSliderItem = ({
  date,
  month,
  onPress,
  selectedDate,
}: DateSliderItemType) => {
  const getMonth = month => {
    switch (month) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
      default:
        return null;
    }
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.dateView,
          {
            backgroundColor:
              date === selectedDate ? COLORS.secondary : COLORS.white,
          },
        ]}>
        <Text
          style={{
            color: date === selectedDate ? COLORS.white : COLORS.primary,
            fontSize: 30,
          }}>
          {date}
        </Text>
        <Text
          style={[
            styles.day,
            {color: date === selectedDate ? COLORS.white : COLORS.black},
          ]}>
          {getMonth(month)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DateSliderItem;

const styles = StyleSheet.create({
  dateView: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 5,
  },
  day: {
    marginTop: 5,
    fontSize: 14,
  },
});
