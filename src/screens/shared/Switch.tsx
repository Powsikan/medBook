/* eslint-disable prettier/prettier */
import React, {useLayoutEffect, useState} from 'react';
import {Switch as SwitchComponent, View} from 'react-native';
import {COLORS} from '../../utils/theme';

type SwitchType = {
  initialState: boolean;
  onChange: any;
  workingDependsOnValue?: boolean;
};

export const Switch = (props: SwitchType) => {
  const {initialState, onChange, workingDependsOnValue} = props;

  const [isEnabled, setIsEnabled] = useState(initialState);
  const toggleSwitch = () => {
    if (!workingDependsOnValue) {
      setIsEnabled(!isEnabled);
    }
    onChange(!isEnabled);
  };

  useLayoutEffect(() => {
    setIsEnabled(initialState);
  }, [initialState]);

  return (
    <View>
      <SwitchComponent
        trackColor={{false: '#767577', true: COLORS.placeHolder}}
        thumbColor={isEnabled ? COLORS.secondary : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};
