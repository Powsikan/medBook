import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../utils/theme';

type DaySliderItemType = {
  day?: string;
  value?: string;
  onPress?: () => void;
  selectedDay?: string | null;
};

const DaySliderItem = ({
  day,
  value,
  onPress,
  selectedDay,
}: DaySliderItemType) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.dateView,
          {
            backgroundColor:
              value === selectedDay ? COLORS.secondary : COLORS.white,
          },
        ]}>
        <Text
          style={{
            color: value === selectedDay ? COLORS.white : COLORS.primary,
            fontSize: 15,
          }}>
          {day}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DaySliderItem;

const styles = StyleSheet.create({
  dateView: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 10,
    margin: 5,
  },
  day: {
    marginTop: 5,
    fontSize: 14,
  },
});
