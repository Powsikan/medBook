/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import AuthProvider from './src/contexts/authContext';
import BookingProvider from './src/contexts/BookingContext';
import ServiceProvider from './src/contexts/serviceContext';
import UserProvider from './src/contexts/userContext';
import Routes from './src/routes/Routes';
import {Root} from 'native-base';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {COLORS} from './src/utils/theme';
import {navigationRef} from './src/routes/navigationRef';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};

const App = () => {
  return (
    <NavigationContainer
      theme={MyTheme}
      onStateChange={() => {
        navigationRef.current?.getCurrentRoute()?.name;
      }}
      ref={navigationRef}>
      <AuthProvider>
        <ServiceProvider>
          <BookingProvider>
            <UserProvider>
              <Root>
                <Routes />
              </Root>
            </UserProvider>
          </BookingProvider>
        </ServiceProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
