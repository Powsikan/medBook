/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import UserHome from '../screens/users/UserHome';
import UserProfile from '../screens/common/UserProfile';

import {COLORS} from '../utils/theme';
import {TabBarIcon} from '../screens/shared';
import {ScreenProp} from '../type';
import UserBookingConfirmation from '../screens/users/UserBookingConfirm';
import UserBookingOptions from '../screens/users/UserBookingOptions';
import PastBookings from '../screens/users/bookings/PastBookings';
import OnGoingBookings from '../screens/users/bookings/OnGoingBookings';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const UserRoutes = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName="UserTabRoutes"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="UserTabRoutes"
        options={{title: 'home'}}
        component={UserTabRoutes}
      />
    </Stack.Navigator>
  );
};
export default UserRoutes;

function HomeStackScreen(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={UserHome}
      />
      <Stack.Screen
        name="UserBookingOptions"
        options={{headerBackTitle: 'back', title: 'User Booking Options'}}
        component={UserBookingOptions}
      />
      <Stack.Screen
        name="UserBookingConfirmation"
        options={{headerBackTitle: 'back', title: 'User Booking Confirmation'}}
        component={UserBookingConfirmation}
      />
    </Stack.Navigator>
  );
}

const UserBookingTab = () => {
  return (
    <TopTab.Navigator lazy>
      <TopTab.Screen
        options={{title: 'Ongoing'}}
        name="OngoingBooking"
        component={OnGoingBookings}
      />
      <TopTab.Screen
        options={{title: 'Past'}}
        name="PastBooking"
        component={PastBookings}
      />
    </TopTab.Navigator>
  );
};

const UserTabRoutes = (props: ScreenProp): JSX.Element => {
  return (
    <>
      <BottomTab.Navigator
        tabBarOptions={{
          activeBackgroundColor: `${COLORS.black}10`,
          inactiveBackgroundColor: `${COLORS.white}10`,
          activeTintColor: COLORS.black,
          inactiveTintColor: `${COLORS.black}70`,
          keyboardHidesTabBar: true,
        }}>
        <BottomTab.Screen
          name="UserHome"
          component={HomeStackScreen}
          options={{
            title: 'Home',
            tabBarIcon: focused => TabBarIcon('home', focused),
          }}
        />
        <BottomTab.Screen
          name="UserBooking"
          component={UserBookingTab}
          options={{
            title: 'Booking',
            tabBarBadgeStyle: {backgroundColor: COLORS.backgroundOne},
            tabBarIcon: focused => TabBarIcon('calendar-edit', focused),
          }}
        />
        <BottomTab.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            title: 'Profile',
            tabBarIcon: focused => TabBarIcon('account', focused),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};
