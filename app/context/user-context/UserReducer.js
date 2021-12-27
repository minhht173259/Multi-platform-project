import _ from 'lodash';
import UserEvent from './UserEvent';

export const defaultUserState = {
  friends: [],
  suggestFriends: [],
  requestFriends: [],
  lastIdFriend: 1,
  lastIdSuggestFriend: 1,
  lastIdRequestFriend: 1
};

export const userReducer = (state = defaultUserState, action) => {
  switch (action.type) {
    case UserEvent.getFriends: {
      const newFriends = action.payload || [];
      const lastIdFriend = _.last(newFriends).id || state.lastIdFriend;
      return { ...state, friends: [...newFriends], lastIdFriend };
    }

    case UserEvent.getSuggestFriends: {
      const newSuggestFriends = action.payload || [];
      const lastIdSuggestFriend = _.last(newSuggestFriends).id || state.lastIdSuggestFriend;
      return { ...state, suggestFriends: [...newSuggestFriends], lastIdSuggestFriend };
    }
    case UserEvent.getRequestFriend: {
      const newRequestFriends = action.payload || [];
      const lastIdRequestFriend = _.last(newRequestFriends)?.id || state.lastIdSuggestFriend;
      return { ...state, requestFriends: [...newRequestFriends], lastIdRequestFriend };
    }
    case UserEvent.delSuggestFriend: {
      const newSuggest = [...state.suggestFriends].filter(friend => friend.id !== action.payload);
      return { ...state, suggestFriends: newSuggest };
    }
    case UserEvent.acceptFriend: {
      const newRequest = [...state.requestFriends].filter(friend => friend.id !== action.payload);
      return { ...state, requestFriends: newRequest };
    }
    default:
      return state;
  }
};
