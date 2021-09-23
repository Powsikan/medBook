/* eslint-disable prettier/prettier */
import * as React from 'react';
import {RefObject} from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef: RefObject<NavigationContainerRef> =
  React.createRef();

export const navigate = (name: string, params?: {}) => {
  navigationRef.current?.navigate(name, params);
};
