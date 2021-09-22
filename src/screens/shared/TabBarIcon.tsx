/* eslint-disable prettier/prettier */
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../utils/theme';
import * as React from 'react';

export const TabBarIcon = (name: string, focused: any) => {
  return (
    <MaterialCommunityIcons
      color={focused?.focused ? COLORS.primary : `${COLORS.primary}99`}
      name={name}
      size={30}
    />
  );
};
