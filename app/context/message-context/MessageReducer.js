import _ from 'lodash';
import MessageEvent from './MessageEvent';

export const defaultMessageState = {
  conversations: [],
  lastIdConversation: 0
};

export const messageReducer = (state = defaultMessageState, action) => {
  switch (action.type) {
    case MessageEvent.getConversation: {
      const newConversation = _.clone(action.payload);
      const lastId = _.last(newConversation)?.id || 0;
      const newState = { ...state, conversations: [...newConversation], lastIdConversation: lastId };
      return newState;
    }
    case MessageEvent.getMoreConversation: {
      const newConversation = action.payload ? action.payload : [];
      const lastId = _.last(newConversation)?.id || state.lastIdConversation;
      const newState = {
        ...state,
        conversations: [...state.conversations, ...newConversation],
        lastIdConversation: lastId
      };
      return newState;
    }

    case MessageEvent.setLastId: {
      const newState = {
        ...state,
        lastIdConversation: action.payload
      };
      return newState;
    }

    case MessageEvent.deleteConversation: {
      const newConversations = state.conversations.filter(conversation => conversation.partner.id !== action.payload);
      const newState = {
        ...state,
        conversations: newConversations
      };
      return newState;
    }
    case MessageEvent.getDetailConversation: {
      // const newConversations = _.find(state.conversations,)
      // console.log('Coversations: ', state.conversations);
      const newState = {
        ...state
      };
      return newState;
    }
    default:
      return state;
  }
};
