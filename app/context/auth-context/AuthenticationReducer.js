import _ from 'lodash';
import { AuthenticationEvent } from './AuthenticationEvent';

export const authenticationStateDefault = {
  isLoggedIn: false,
  token: null,
  id: null,
  username: null,
  avatar: null,
  active: null,
  error: null,
  phoneNumber: null,
  role: null,
  isLoading: false
};

export function authenticationReducer(state = authenticationStateDefault, action) {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case AuthenticationEvent.signIn: {
      newState.token = action.payload.token;
      newState.id = action.payload.id;
      newState.username = action.payload.username;
      newState.avatar = action.payload.avatar;
      newState.active = action.payload.active;
      newState.isLoggedIn = true;

      break;
    }

    case AuthenticationEvent.signUp: {
      newState.token = action.payload.token;
      newState.id = action.payload.id;
      newState.username = action.payload.user.name;
      newState.active = action.payload.user.active;
      newState.phoneNumber = action.payload.user.phonenumber;
      newState.role = action.payload.user.role;

      newState.isLoggedIn = true;
      break;
    }

    case AuthenticationEvent.startApp: {
      newState.isLoggedIn = action.payload;
      break;
    }

    case AuthenticationEvent.restoreToken: {
      newState.token = action.payload;
      newState.isLoggedIn = true;
      break;
    }
    case AuthenticationEvent.setLoading: {
      newState.isLoading = action.payload;
      break;
    }
    case AuthenticationEvent.error: {
      newState.error = action.payload;
      break;
    }
    case AuthenticationEvent.logout: {
      return authenticationStateDefault;
    }
    case AuthenticationEvent.restoreUserInfo: {
      newState.id = action.payload.id;
      newState.username = action.payload.username;
      newState.avatar = action.payload.avatar;
      newState.active = action.payload.active;
      newState.isLoggedIn = true;

      break;
    }
    default:
      break;
  }

  return newState;
}
