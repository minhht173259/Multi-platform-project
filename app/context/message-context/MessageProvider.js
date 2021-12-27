import React, { useContext, useMemo, useReducer } from 'react';
import chatService from '../../services/chat/ChatService';
import MessageContext from './MessageContext';
import { defaultMessageState, messageReducer } from './MessageReducer';
import MessageEvent from './MessageEvent';
import AuthenticationContext from '../auth-context/AuthenticationContext';
import userService from '../../services/user/userService';

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, defaultMessageState);
  const [authState, authContext] = useContext(AuthenticationContext);

  //   useEffect(() => {

  //   }, []);

  const getLastId = async () =>
    // if (state.lastIdConversation !== 0) {

    // }
    // todo
    state.lastIdConversation;

  const processResponse = async response => {
    if (response.code === 9998) {
      await authContext.logout();
    }
    return response;
  };

  const messageContext = useMemo(
    () => ({
      getConversations: async (count = 10) => {
        let response = await chatService.getListConversations(0, count);
        response = await processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: MessageEvent.getConversation, payload: response.data });
        }
        return response;
      }
    }),

    []
  );

  const context = useMemo(() => [state, messageContext], [state]);

  return <MessageContext.Provider value={context}>{children}</MessageContext.Provider>;
};
export default MessageProvider;
