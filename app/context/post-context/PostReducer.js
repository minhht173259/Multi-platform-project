import _ from 'lodash';
import { PostEvent } from './PostEvent';

export const postStateDefault = {
  notification: null,
  posts: []
};

const PostReducer = (state = postStateDefault, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case PostEvent.create: {
      break;
    }
    default:
      break;
  }

  return newState;
};
