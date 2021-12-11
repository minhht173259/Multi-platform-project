import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AppStackScreens from './app/stacks/AppStackScreens';
import { AppProvider } from './app/context/AppContext';
import AuthenticationProvider from './app/context/auth-context/AuthenticationProvider';

export default function App() {
  return (
    <AppProvider>
      <AuthenticationProvider>
        <NavigationContainer>
          <AppStackScreens />
        </NavigationContainer>
      </AuthenticationProvider>
    </AppProvider>
  );
}
