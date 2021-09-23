/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {Platform, SafeAreaView, StatusBar, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from '../screens/auth/SignIn';
import SignUpScreen from '../screens/auth/SignUp';
import IntroScreen from '../screens/auth/IntroScreen';

import UserRoutes from './UserRoutes';
import AdminRoutes from './AdminRoutes';
import {AuthContext, ServiceContext, UserContext} from '../contexts';
import {COLORS} from '../utils/theme';
import {Spinner} from '../screens/shared';
import ConfirmSignUp from '../screens/auth/ConfirmSignUp';

const Stack = createStackNavigator();
const Routes = (): JSX.Element => {
  const {currentUser, isLoading: authIsLoading} = useContext(AuthContext);
  const {isLoading: userIsLoading} = useContext(UserContext);
  const {isLoading: serviceLoding} = useContext(ServiceContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={COLORS.primaryDark}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'}
      />
      <View style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName="IntroScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUp} />
          {currentUser && <Stack.Screen name="Home" component={RoleRoutes} />}
        </Stack.Navigator>
        {(userIsLoading || authIsLoading || serviceLoding) && <Spinner />}
      </View>
    </SafeAreaView>
  );
};

const RoleRoutes = (): JSX.Element => {
  const RoleStack = createStackNavigator();
  const {availableRoles, currentRole} = useContext(AuthContext);
  if (availableRoles) {
    const currentRoleString = currentRole; // 'Admin';
    console.debug(' route ' + currentRoleString);
    return (
      <RoleStack.Navigator screenOptions={{headerShown: false}}>
        {currentRoleString === 'User' && (
          <Stack.Screen name="UserRoot" component={UserRoutes} />
        )}
        {currentRoleString === 'Admin' && (
          <Stack.Screen name="AdminRoot" component={AdminRoutes} />
        )}
      </RoleStack.Navigator>
    );
  } else {
    return (
      <RoleStack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="UserRoot" component={UserRoutes} />
      </RoleStack.Navigator>
    );
  }
};

export default Routes;
