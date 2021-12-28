/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer, useMemo, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as _ from 'lodash';
import { PostContext } from './PostContext';
import { PostReducer, postStateDefault } from './PostReducer';
import { commentService, postService } from '../../services/post';
import { PostEvent } from './PostEvent';
import { useHandlerErrorResponse } from '../../hooks/useHandlerErrorResponse';

const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, postStateDefault);
  const [error, processResponse] = useHandlerErrorResponse();

  const processError = errorMess => {
    dispatch({ type: PostEvent.error, payload: errorMess });
  };

  useEffect(() => {
    async function startPost() {
      // const posts = await AsyncStorage.getItem('list_post');
      // const lastId = await AsyncStorage.getItem('last_id');
      // if (!_.isEmpty(posts)) {
      //   dispatch({ type: PostEvent.loadPosts, payload: { posts: JSON.parse(posts), lastId: _.toNumber(lastId) } });
      // }
    }

    startPost();
  }, []);

  const postContext = useMemo(
    () => ({
      addPost: async (described, images, video) => {
        let response = await postService.addPost(described, images, video);
        response = await processResponse(response);
        if (response.code === 1000) {
          const { id } = response.data;
          const postResponse = await postService.getPost(id);
          dispatch({ type: PostEvent.create, payload: postResponse.data });
        }
        return response;
      },
      getListPosts: async (count = 10) => {
        let response = await postService.getListPosts(state.lastId, 0, count);
        response = await processResponse(response);
        if (response.code === 1000) {
          const postsResponse = response.data.posts;
          const newPosts = _.concat(state.posts, postsResponse);
          const lastIndex = response.data.last_id;
          dispatch({
            type: PostEvent.loadPosts,
            payload: { posts: newPosts, lastId: lastIndex, newItems: response.data.new_items }
          });
          processError(error);
          await AsyncStorage.setItem('list_post', JSON.stringify(newPosts));
          await AsyncStorage.setItem('last_id', JSON.stringify(lastIndex));
        }
        return response;
      },

      refreshPosts: async () => {
        let response = await postService.checkNewItem(state.lastId, 0);
        response = await processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: PostEvent.checkNewItem, payload: response.data.posts });
        }
        return response;
      },

      getPost: async id => {
        let response = await postService.getPost(id);
        response = await processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: PostEvent.getPost, payload: response.data });
        }
        return response;
      },
      likePost: async id => {
        let response = await commentService.like(id);
        response = await processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: PostEvent.like, payload: { id, like: response.data.like } });
        }
        return response;
      },
      getComments: async (id, index, count) => {
        let response = await commentService.getComment(id, index, count);
        response = await processResponse(response);
        return response;
      },
      deleteComment: async (idPost, idComment) => {
        let response = await commentService.deleteComment(idPost, idComment);
        response = await processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: PostEvent.deleteComment, payload: idPost });
        }
        return response;
      },
      editComment: async (idPost, idComment, comment) => {
        let response = await commentService.editComment(idPost, idComment, comment);
        response = await processResponse(response);
        return response;
      },
      setComment: async (postId, index, count, comment) => {
        let response = await commentService.setComment(postId, index, count, comment);
        response = await processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: PostEvent.setComment, payload: { postId, new: response.data.length || 0 } });
        }
        return response;
      },
      reportPost: async (postId, subject, details) => {
        let response = await postService.reportPost(postId, subject, details);
        response = await processResponse(response);
        return response;
      },
      deletePost: async postId => {
        let response = await postService.deletePost(postId);
        response = await processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: PostEvent.delete, payload: postId });
        }
        return response;
      },
      editPost: async (postId, described) => {
        let response = await postService.editPost(postId, described);
        response = await processResponse(response);
        if (response.code === 1000) {
          dispatch({ type: PostEvent.edit, payload: { postId, described } });
        }
        return response;
      }
    }),
    [state]
  );

  const context = useMemo(() => [state, postContext], [state]);
  return <PostContext.Provider value={context}>{children}</PostContext.Provider>;
};

export default PostProvider;
