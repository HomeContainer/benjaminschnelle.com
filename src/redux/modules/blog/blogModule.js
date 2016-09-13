import { fromJS } from 'immutable';
import * as blogService from '../../../services/blog/blogService';

// Actions
export const GET_POSTS = 'blog/GET_POSTS';
export const GET_POSTS_FAILURE = 'blog/GET_POSTS_FAILURE';
export const GET_POSTS_SUCCESS = 'blog/GET_POSTS_SUCCESS';

// Reducer
const blogSvc = blogService.default;
const initialState = fromJS({
  activePost: undefined,
  error: false,
  fetchingPosts: false,
  posts: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      return state.set('fetchingPosts', true);
    }

    case GET_POSTS_FAILURE: {
      return state.merge({ error: true, fetchingPosts: false });
    }

    case GET_POSTS_SUCCESS: {
      return state.set('posts', fromJS(action.posts));
    }

    default: {
      return state;
    }
  }
};

// Action Creators
export function getPosts() {
  return (dispatch) => {
    dispatch({ type: GET_POSTS });
    return blogSvc.getPosts()
      .then((posts) => dispatch({ type: GET_POSTS_SUCCESS, posts }))
      .catch(() => dispatch({ type: GET_POSTS_FAILURE }));
  };
}
