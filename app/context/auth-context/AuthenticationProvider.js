/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer, useEffect, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import AuthenticationContext from './AuthenticationContext';
import authServices from '../../services/auth/authService';
import { authenticationStateDefault, authenticationReducer } from './AuthenticationReducer';
import { AuthenticationEvent } from './AuthenticationEvent';

const AuthenticationProvider = function ({ children }) {
  const [state, dispatch] = useReducer(authenticationReducer, authenticationStateDefault);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await SecureStore.getItemAsync('token');

        if (userToken) {
          dispatch({ type: AuthenticationEvent.restoreToken, payload: userToken });
        }
      } catch (e) {
        console.log(e);
      }
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (phone = '', password = '') => {
        dispatch({ type: AuthenticationEvent.setLoading, payload: true });
        try {
          const response = await authServices.singIn(phone, password);
          if (response.data && response.code === 1000) {
            dispatch({ type: AuthenticationEvent.signIn, payload: response.data });
            await SecureStore.setItemAsync('token', response.data.token);
            await SecureStore.setItemAsync('user', JSON.stringify(response.data));
          }
        } catch (error) {
          console.log('ERROR SIGNIN: ', error);
        }
        dispatch({ type: AuthenticationEvent.setLoading, payload: false });
      },
      signUp: async (phone = '', password = '') => {}
    }),
    []
  );

  return <AuthenticationContext.Provider value={[state, authContext]}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
