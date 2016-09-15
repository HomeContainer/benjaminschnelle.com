import { fromJS } from 'immutable';
import * as blogService from '../../../services/blog/blogService';

// Actions
export const GET_POST = 'blog/GET_POST';
export const GET_POST_FAILURE = 'blog/GET_POST_FAILURE';
export const GET_POST_SUCCESS = 'blog/GET_POST_SUCCESS';

export const GET_POSTS = 'blog/GET_POSTS';
export const GET_POSTS_FAILURE = 'blog/GET_POSTS_FAILURE';
export const GET_POSTS_SUCCESS = 'blog/GET_POSTS_SUCCESS';

// Reducer
const blogSvc = blogService.default;
const initialState = fromJS({
  activePost: undefined,
  error: false,
  fetchingPosts: false,
  postError: false,
  posts: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POST: {
      return state.set('fetchingPost', true);
    }

    case GET_POST_FAILURE: {
      return state.merge({ postError: true, fetchingPost: false });
    }

    case GET_POST_SUCCESS: {
      const { content, slug } = action;
      const index = state.get('posts').findIndex((post) => post.get('slug') === slug);
      const newState = state.updateIn(['posts', index], (post) => post.set('content', content));
      return newState.merge({
        activePost: slug,
        fetchingPost: false
      });
    }

    case GET_POSTS: {
      return state.set('fetchingPosts', true);
    }

    case GET_POSTS_FAILURE: {
      return state.merge({ error: true, fetchingPosts: false });
    }

    case GET_POSTS_SUCCESS: {
      const newState = state.set('fetchingPosts', false);
      return newState.set('posts', fromJS(action.posts));
    }

    default: {
      return state;
    }
  }
};

// Action Creators
export function getPost(slug) {
  return (dispatch) => {
    dispatch({ type: GET_POST });
    return blogSvc.getPost(slug)
      .then((content) => blogSvc.parseMarkdown(content))
      .then((content) => dispatch({ type: GET_POST_SUCCESS, content, slug }))
      .catch(() => dispatch({ type: GET_POST_FAILURE }));
  };
}

export function getPosts() {
  return (dispatch) => {
    dispatch({ type: GET_POSTS });
    return blogSvc.getPosts()
      .then((posts) => dispatch({ type: GET_POSTS_SUCCESS, posts: posts.posts }))
      .catch(() => dispatch({ type: GET_POSTS_FAILURE }));
  };
}
