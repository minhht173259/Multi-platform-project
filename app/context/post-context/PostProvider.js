import React from 'react';
import { useReducer } from 'react/cjs/react.development';
import { PostContext } from './PostContext';

const PostProvider = ({ children }) => {
  const [state, setState] = useReducer();

  return <PostContext.Provider>{children}</PostContext.Provider>;
};
