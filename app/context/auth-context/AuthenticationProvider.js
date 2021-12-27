/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        userToken = await AsyncStorage.getItem('token');
        if (userToken && userToken !== '') {
          dispatch({ type: AuthenticationEvent.restoreToken, payload: userToken });
        }
        const user = await AsyncStorage.getItem('user');

        if (user) {
          dispatch({ type: AuthenticationEvent.restoreUserInfo, payload: JSON.parse(user) });
        }
      } catch (e) {
        console.log(e);
      }
    };
    bootstrapAsync();
  }, []);

  const makeError = errorMess => {
    dispatch({ type: AuthenticationEvent.error, payload: errorMess });
  };

  const clearError = () => {
    if (state.error) {
      dispatch({ type: AuthenticationEvent.error, payload: null });
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async (phone = '', password = '') => {
        try {
          const response = await authServices.singIn(phone, password);
          if (response.code === 1000) {
            dispatch({ type: AuthenticationEvent.signIn, payload: response.data });
            const userInfo = {
              id: response.data.id,
              username: response.data.username,
              avatar: response.data.avatar,
              active: response.data.active,
              token: response.token
            };
            // await AsyncStorage.removeItem('token');
            // await AsyncStorage.removeItem('user');

            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(userInfo));
            clearError();
          } else {
            const errMess = `${response.code}: ${response.message}`;
            makeError(errMess);
          }
        } catch (error) {
          makeError('Server Error');
        }
      },
      signUp: async (phone = '', password = '') => {
        try {
          const response = await authServices.signUp(phone, password);
          if (response.code === 1000) {
            dispatch({ type: AuthenticationEvent.signUp, payload: response.data });

            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');

            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', response.data.user.id);
            clearError();
          } else {
            const errMess = `${response.code}: ${response.message}`;
            makeError(errMess);
          }
        } catch (error) {
          makeError('Server Error');
        }
      },
      logout: async () => {
        try {
          const response = await authServices.logout();
          // todo: API bi invalid thi sao ??? -> sameAs loginOtherDevice:  code: 9998
          if (response.code === 1000 || response.code === 9998) {
            dispatch({ type: AuthenticationEvent.logout, payload: null });
            AsyncStorage.clear();
          } else {
            const errMess = `${response.code}: ${response.message}`;
            makeError(errMess);
          }
        } catch (error) {
          console.log('ERROR LOGOUT: ', error);
        }
      },
      loginOtherDevice: async () => {
        try {
          dispatch({ type: AuthenticationEvent.logout, payload: null });
          await AsyncStorage.clear();
        } catch (error) {
          console.log('ERROR LOGOUT: ', error);
        }
      }
    }),
    []
  );

  return <AuthenticationContext.Provider value={[state, authContext]}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
