import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStackScreens from './app/stacks/AppStackScreens';
import { AppProvider } from './app/context/AppContext';
import AuthenticationProvider from './app/context/auth-context/AuthenticationProvider';
import LoadingProvider from './app/context/LoadingContext';

export default function App() {
  return (
    <AppProvider>
      <AuthenticationProvider>
        <LoadingProvider>
          <NavigationContainer>
            <AppStackScreens />
          </NavigationContainer>
        </LoadingProvider>
      </AuthenticationProvider>
    </AppProvider>
  );
}
