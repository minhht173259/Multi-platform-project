import { useContext } from 'react';
import io from 'socket.io-client';
import AuthenticationContext from '../context/auth-context/AuthenticationContext';

const useSocketIo = token => {
  const [authState] = useContext(AuthenticationContext);

  const URL = 'https://chat-zalo-group15.herokuapp.com';

  const socket = io(URL, {
    auth: authState.token
  });

  return { socket };
};

export default useSocketIo;
