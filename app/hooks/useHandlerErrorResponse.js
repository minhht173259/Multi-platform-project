import { useState } from 'react';
import { useContext } from 'react/cjs/react.development';
import AuthenticationContext from '../context/auth-context/AuthenticationContext';

export const useHandlerErrorResponse = () => {
  const [error, setError] = useState(null);
  const [_, authContext] = useContext(AuthenticationContext);

  const processResponse = async response => {
    switch (response.code) {
      case 9998: {
        setError('Tài khoản đã được đăng nhập nơi khác');
        await authContext.logout();
        break;
      }
      default: {
        const errorMess = `${response.code} - ${response.message}`;
        setError(errorMess);
        break;
      }
    }

    return response;
  };

  return [error, processResponse];
};
