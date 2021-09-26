import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../utils/theme";

type bookingConfirmationItemType = {
  serviceName: string;
  date: string | number;
  serviceTime: string | number;
};
const BookingConfirmationItem = ({
  serviceName,
  date,
  serviceTime,
}: bookingConfirmationItemType) => {
  return (
    <View style={styles.bookingConfirmaiton}>
      <View style={styles.sNameView}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: COLORS.primary}}>
          {serviceName}
        </Text>
      </View>
      <View style={styles.dateView}>
        <Text
          style={{fontWeight: 'bold', fontSize: 20, color: COLORS.secondary}}>
          {date}
        </Text>
      </View>
      <View style={styles.timeView}>
        <Text style={{fontSize: 20, color: COLORS.white}}>{serviceTime}</Text>
      </View>
    </View>
  );
};

export default BookingConfirmationItem;

const styles = StyleSheet.create({
  bookingConfirmaiton: {
    borderRadius: 15,
    backgroundColor: COLORS.gray,
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 20,
    padding: 30,
    marginLeft: 40,
    marginRight: 40,
    alignItems: 'center',
  },
  sNameView: {
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    color: COLORS.primary,
    paddingRight: 15,
    paddingLeft: 15,
  },
  dateView: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 6,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: COLORS.white,
  },
  timeView: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 6,
    borderColor: COLORS.white,
    borderWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: COLORS.secondary,
  },
});
