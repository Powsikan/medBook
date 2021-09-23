/* eslint-disable prettier/prettier */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DateAndTimePicker, Switch} from '../shared';
import React from 'react';
import {COLORS} from '../../utils/theme';
import {AvailableTimeSlotInput} from '../../API';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type SlotItemType = {
  slot: AvailableTimeSlotInput;
  id: number;
  slots: AvailableTimeSlotInput[];
  setSlots: (slot: AvailableTimeSlotInput[]) => void;
  showValidationError?: boolean;
};

const SlotItem = ({
  slot,
  id,
  slots,
  setSlots,
  showValidationError,
}: SlotItemType) => {
  const setFromTime = (time?: string) => {
    const _slots = [...slots];
    _slots[id]!.from = time!.split(' ')[0];
    setSlots(_slots);
  };
  const setToTime = (time?: string) => {
    const _slots = [...slots];
    _slots[id]!.to = time!.split(' ')[0];
    setSlots(_slots);
  };
  const onDelete = () => {
    const _slots = [...slots];
    _slots.splice(id, 1);
    setSlots(_slots);
  };

  const handleAvailable = () => {
    const _slots = [...slots];
    _slots[id].available = !_slots[id].available;
    setSlots(_slots);
  };

  return (
    <View style={styles.slotContainer}>
      <View style={styles.closeIcon}>
        <TouchableOpacity
          onPress={() => {
            onDelete();
          }}>
          <Icon name={'delete'} size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
      <View style={styles.TimeSlots}>
        <View style={[styles.time, {marginTop: 5}]}>
          <DateAndTimePicker
            mode="time"
            onChange={date => setFromTime(date.toTimeString())}
            showValueField={true}
            value={
              slot?.from
                ? slot?.from
                    .split(' ')[0]
                    .split(':')[0]
                    .concat(`:${slot?.from?.split(' ')[0].split(':')[1]}`)
                : ''
            }
            placeholder="Time"
            label="From"
          />
        </View>
        <View style={styles.validationView}>
          <Text style={styles.validationError}>
            {showValidationError && slot?.from?.split(' ')[0] === ''
              ? 'Required'
              : null}
          </Text>
        </View>
        <View style={styles.time}>
          <DateAndTimePicker
            mode="time"
            onChange={date => setToTime(date.toTimeString())}
            showValueField={true}
            value={
              slot?.to
                ? slot?.to
                    .split(' ')[0]
                    .split(':')[0]
                    .concat(`:${slot?.to?.split(' ')[0].split(':')[1]}`)
                : ''
            }
            placeholder="Time"
            label="To"
          />
        </View>
        <View style={styles.validationView}>
          <Text style={styles.validationError}>
            {showValidationError && slot?.to?.split(' ')[0] === ''
              ? 'Required'
              : null}
          </Text>
        </View>
        <View style={styles.switchView}>
          <View>
            <Text style={styles.availableText}>Available</Text>
          </View>
          <View>
            <Switch
              initialState={slot.available!}
              onChange={() => handleAvailable()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
export default SlotItem;
const styles = StyleSheet.create({
  time: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    flex: 2,
  },
  inputTime: {
    flex: 2,
    display: 'flex',
  },
  slotContainer: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLORS.primary,
    padding: 5,
    margin: 5,
  },
  closeIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  validationError: {
    color: COLORS.error,
  },
  validationView: {
    display: 'flex',
    alignItems: 'center',
  },
  TimeSlots: {
    paddingHorizontal: 20,
  },
  switchView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  availableText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});
