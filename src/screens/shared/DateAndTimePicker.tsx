/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Platform, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils/theme';

type TimePickerType = {
  mode: string;
  onChange: (selected: Date) => void;
  showValueField?: boolean;
  value?: string | null;
  placeholder?: string | null;
  label?: string | null;
};

export const DateAndTimePicker = (props: TimePickerType) => {
  const {mode, onChange, showValueField, value, placeholder, label} = props;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(Platform.OS === 'ios' ? true : false);

  const onTimeChange = (event: Event, selectedDate?: Date) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onChange(currentDate);
  };

  return (
    <View style={styles.main}>
      {show && (
        <View style={{width: '40%'}}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onTimeChange}
          />
        </View>
      )}
      {showValueField && Platform.OS != 'ios' && (
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={styles.valueHere}>
          <View style={styles.mainView}>
            {label !== '' && (
              <View style={styles.label}>
                <Text style={styles.labelText}> {label}</Text>
              </View>
            )}
            <View style={styles.value}>
              <Text>{value ? value : placeholder}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.icon}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Icon
            name={
              mode === 'time' ? 'clock-time-eight-outline' : 'calendar-outline'
            }
            size={40}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueHere: {
    flex: 5,
    backgroundColor: COLORS.gray,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 10,
    alignContent: 'center',
    paddingLeft: 30,
  },
  icon: {
    flex: 1,
  },
  mainView: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    paddingHorizontal: 5,
    flex: 1,
  },
  value: {
    flex: 3,
  },
  labelText: {
    color: COLORS.secondary,
  },
});
