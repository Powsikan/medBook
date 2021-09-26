/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AddService from '../screens/admin/AddService';

import AdminHome from '../screens/admin/AdminHome';
import NewBookings from '../screens/admin/bookings/NewBookings';
import PastBookings from '../screens/admin/bookings/PastBookings';
import UpCommingBookings from '../screens/admin/bookings/UpCommingBookings';
import ScheduleService from '../screens/admin/ScheduleService';
import ServiceDetails from '../screens/admin/ServiceDetails';
import UpdateService from '../screens/admin/UpdateService';
import UserProfile from '../screens/common/UserProfile';
import {TabBarIcon} from '../screens/shared';
import {COLORS} from '../utils/theme';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();

const AdminRoutes = () => {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeBackgroundColor: `${COLORS.black}10`,
        inactiveBackgroundColor: `${COLORS.white}10`,
        activeTintColor: COLORS.black,
        inactiveTintColor: `${COLORS.black}70`,
        keyboardHidesTabBar: true,
      }}>
      <BottomTab.Screen
        name="AdminHome"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: focused => TabBarIcon('home', focused),
        }}
      />
      <BottomTab.Screen
        name="AdminBooking"
        component={AdminBookingTab}
        options={{
          title: 'Book',
          tabBarIcon: focused => TabBarIcon('calendar-edit', focused),
        }}
      />
      <BottomTab.Screen
        name="AdminProfile"
        component={UserProfile}
        options={{
          title: 'Profile',
          tabBarIcon: focused => TabBarIcon('account', focused),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default AdminRoutes;

function HomeStackScreen(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={AdminHome}
      />
      <Stack.Screen
        name="AddService"
        options={{headerBackTitle: 'back', title: 'Add Service'}}
        component={AddService}
      />
      <Stack.Screen
        name="ServiceDetails"
        options={{headerBackTitle: 'back', title: 'Service Details'}}
        component={ServiceDetails}
      />
      <Stack.Screen
        name="ServiceSchedule"
        options={{headerBackTitle: 'back', title: 'Schedule Service'}}
        component={ScheduleService}
      />
      <Stack.Screen
        name="ServiceUpdate"
        options={{headerBackTitle: 'back', title: 'Service Update'}}
        component={UpdateService}
      />
    </Stack.Navigator>
  );
}

const AdminBookingTab = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen
        name="NEWBOOKINGS"
        options={{title: 'NEW '}}
        component={NewBookings}
      />
      <TopTab.Screen
        name="UPCOMINGBOOKINGS"
        options={{title: 'UPCOMING '}}
        component={UpCommingBookings}
      />
      <TopTab.Screen
        name="PASTBOOKINGS"
        options={{title: 'PAST'}}
        component={PastBookings}
      />
    </TopTab.Navigator>
  );
};
