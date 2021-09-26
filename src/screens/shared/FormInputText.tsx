/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS} from '../../utils/theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

type FormInputTextType = {
  placeHolder?: string;
  label?: string;
  value?: string;
  errorMessage?: string;
  editable?: boolean;
  multiline?: boolean;
  clearButtonMode?: 'never' | 'always' | 'unless-editing' | 'while-editing';
  borderRadius?: number;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
  numberOfLines?: number;
  keyboardType?:
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  onChangeText?: (text: string) => void;
  returnKeyType?:
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'none'
    | 'previous'
    | 'default'
    | 'emergency-call'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo';
  placeholderTextColor?: string;
  onEndEditing?: () => void;
  onFocus?: () => void;
  secureTextEntry?: boolean;
  textContentType?:
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode';
};

export const FormInputText = (props: FormInputTextType) => {
  const {
    clearButtonMode,
    editable,
    borderRadius,
    label,
    keyboardType,
    placeHolder,
    numberOfLines,
    multiline,
    onChangeText,
    returnKeyType,
    errorMessage,
    value,
    autoFocus,
    onSubmitEditing,
    placeholderTextColor,
    onEndEditing,
    onFocus,
    secureTextEntry,
    textContentType,
  } = props;
  const [labelName, setLabelName] = useState('');

  return (
    <View
      style={[
        styles.inputView,
        {
          borderRadius: borderRadius ? borderRadius : 15,
          paddingTop: labelName && label ? 7 : 0,
          height: numberOfLines ? numberOfLines * hp(3.5) + hp(3) : hp(7),
          justifyContent: numberOfLines ? 'flex-start' : 'center',
        },
      ]}>
      {labelName ? <Text style={styles.hiddenText}>{label}</Text> : null}
      <TextInput
        onSubmitEditing={onSubmitEditing}
        autoFocus={autoFocus}
        value={value}
        style={[styles.inputText, {paddingTop: numberOfLines ? 10 : 0}]}
        placeholder={placeHolder}
        clearButtonMode={clearButtonMode}
        autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        keyboardType={keyboardType}
        onChangeText={(text: any) => {
          setLabelName(text);
          if (onChangeText) {
            onChangeText(text);
          }
        }}
        autoCapitalize="none"
        returnKeyType={returnKeyType}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : '#9EA0A4'
        }
        onEndEditing={onEndEditing}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    paddingHorizontal: 15,
    color: COLORS.secondary,
    fontSize: hp(2.7),
  },
  errorMessage: {
    position: 'absolute',
    bottom: 3,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    color: COLORS.error,
  },
  inputView: {
    marginVertical: 5,
    backgroundColor: COLORS.gray,
    width: '100%',
  },
  hiddenText: {
    color: COLORS.primary,
    fontSize: 10,
    paddingHorizontal: 15,
    position: 'absolute',
    top: 4,
  },
});
