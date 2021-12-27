import _ from 'lodash';
import { PostEvent } from './PostEvent';

export const postStateDefault = {
  notification: null,
  posts: [],
  lastId: 1,
  newItems: 0,
  error: null
};

export const PostReducer = (state = postStateDefault, action) => {
  const newState = _.cloneDeep(state);

  switch (action.type) {
    case PostEvent.create: {
      newState.posts.unshift(action.payload);
      break;
    }
    case PostEvent.loadPosts: {
      const newPosts = action.payload.posts || state.posts;
      newState.posts = newPosts;
      newState.lastId = action.payload.lastId || state.lastId;
      break;
    }
    case PostEvent.checkNewItem: {
      break;
    }
    case PostEvent.saveLastId: {
      newState.lastId = action.payload;
      break;
    }
    case PostEvent.refresh: {
      newState.posts = action.payload.posts;
      newState.lastId = action.payload.lastId;
      break;
    }
    case PostEvent.getPost: {
      const currentPostIndex = _.findIndex(newState.posts, post => post.id === action.payload.id);
      if (currentPostIndex) {
        newState.posts[currentPostIndex] = { ...action.payload };
      } else {
        newState.posts.unshift(action.payload);
      }
      break;
    }
    case PostEvent.delete: {
      const newPosts = _.filter(newState.posts, post => post.id !== action.payload);
      newState.posts = newPosts;
      break;
    }
    case PostEvent.like: {
      const currentPostIndex = _.findIndex(newState.posts, post => post.id === action.payload.id);
      if (currentPostIndex !== undefined) {
        newState.posts[currentPostIndex] = {
          ...newState.posts[currentPostIndex],
          like: action.payload.like,
          is_liked: !newState.posts[currentPostIndex].is_liked
        };
      }
      break;
    }
    case PostEvent.deleteComment: {
      const currentPostIndex = _.findIndex(newState.posts, post => post.id === action.payload);
      const numberOfComments = newState.posts[currentPostIndex].comment;
      newState.posts[currentPostIndex].comment = numberOfComments - 1;
      break;
    }

    case PostEvent.setComment: {
      const currentPostIndex = _.findIndex(newState.posts, post => post.id === action.payload.postId);
      const numberOfComments = newState.posts[currentPostIndex].comment;
      newState.posts[currentPostIndex].comment = numberOfComments + action.payload.new;
      break;
    }
    default:
      break;
  }

  return newState;
};
