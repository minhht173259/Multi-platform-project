import _ from 'lodash';
import { AuthenticationEvent } from './AuthenticationEvent';

export const authenticationStateDefault = {
  isLoggedIn: null,
  token: '123123',
  phone: '',
  userName: '',
  icons: '',
  error: null,
  isLoading: false
};

export function authenticationReducer(state = authenticationStateDefault, action) {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case AuthenticationEvent.signIn: {
      newState.isLoggedIn = true;
      newState.phone = action.payload.phone;
      newState.userName = action.payload.userName;
      newState.token = action.payload.token;
      newState.icons = action.payload.icons;
      break;
    }

    case AuthenticationEvent.startApp: {
      newState.isLoggedIn = action.payload;
      break;
    }

    case AuthenticationEvent.restoreToken: {
      newState.token = action.payload;
      break;
    }
    case AuthenticationEvent.setLoading: {
      newState.isLoading = action.payload;
      break;
    }
    default:
      break;
  }

  return newState;
}
