import React, { useContext, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import userService from '../../services/user/userService';
import searchService from '../../services/user/searchService';
import AuthenticationContext from '../auth-context/AuthenticationContext';
import UserEvent from './UserEvent';
import { defaultUserState, userReducer } from './UserReducer';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, defaultUserState);
  const [authState, authContext] = useContext(AuthenticationContext);
  const USER_ID = authState.id;
  const processResponse = response => {
    if (response.code === 9998) {
      authContext.logout();
    }
    return response;
  };

  const userContext = useMemo(
    () => ({
      getFriends: async count => {
        let response = await userService.getUserFriends(USER_ID, state.lastIdFriend, count);
        response = processResponse(response);
        if (response.code === 1000) {
          const friendsResponse = response.data.friends || [];
          let friendsState = _.concat(state.friends, friendsResponse);
          friendsState = _.sortBy(friendsState, [item => item.id]);
          dispatch({ type: UserEvent.getFriends, payload: friendsState });
          await AsyncStorage.setItem('friends', JSON.stringify(friendsState));
        }
        return response;
      },

      getSuggestFriends: async count => {
        let response = await userService.getSuggestedListFriends(state.lastIdSuggestFriend, count);
        response = processResponse(response);

        if (response.code === 1000) {
          const friendsSuggestResponse = response.data.list_users || [];
          const friendsSuggestState = _.concat(state.suggestFriends, friendsSuggestResponse);
          dispatch({ type: UserEvent.getSuggestFriends, payload: friendsSuggestState });
          await AsyncStorage.setItem('friends_suggest', JSON.stringify(friendsSuggestState));
        }
        return response;
      },
      getRequestFriends: async count => {
        let response = await userService.getRequestedFriend(USER_ID, state.lastIdRequestFriend, count);
        response = processResponse(response);
        if (response.code === 1000) {
          const friendsRequestResponse = response.data.friends || [];
          const friendsRequestState = _.concat(state.requestFriends, friendsRequestResponse);
          dispatch({ type: UserEvent.getRequestFriend, payload: friendsRequestState });
          await AsyncStorage.setItem('friends_request', JSON.stringify(friendsRequestState));
        }
        return response;
      },
      getUserInfo: async userId => {
        let response = await userService.getUserInfo(userId);
        response = processResponse(response);
        return response;
      },
      setUserInfo: async (username, description, country, address, link, avatar) => {
        let response = await userService.setUserInfo(username, description, country, address, link, avatar);
        response = processResponse(response);
        return response;
      },
      search: async keyword => {
        let response = await searchService.search(keyword);
        response = processResponse(response);
        return response;
      },
      getSavedSearch: async (index, count) => {
        let response = await searchService.getSavedSearch(index, count);
        response = processResponse(response);
        return response;
      },
      delSavedSearch: async (searchId, all) => {
        let response = await searchService.delSavedSearch(searchId, all);
        response = processResponse(response);
        return response;
      },
      setRequestFriend: async userId => {
        let response = await userService.setRequestFriend(userId);
        response = processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: UserEvent.delSuggestFriend, payload: userId });
        }
        return response;
      },
      delSuggestFriend: userId => {
        dispatch({ type: UserEvent.delSuggestFriend, payload: userId });
      },
      setAcceptFriend: async (userId, isAccept) => {
        let response = await userService.setAcceptFriend(userId, isAccept);
        response = processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: UserEvent.acceptFriend, payload: userId });
          //
        }
        return response;
      }
    }),
    [USER_ID]
  );

  const context = useMemo(() => [state, userContext], [state]);

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};

export default UserProvider;
