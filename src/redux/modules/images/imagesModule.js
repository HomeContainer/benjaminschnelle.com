import { fromJS } from 'immutable';
import * as unsplashService from '../../../services/unsplash/unsplashService';

// Actions
export const GET_RANDOM_IMAGE = 'images/GET_RANDOM_IMAGE';
export const GET_RANDOM_IMAGE_FAILURE = 'images/GET_RANDOM_IMAGE_FAILURE';
export const GET_RANDOM_IMAGE_SUCCESS = 'images/GET_RANDOM_IMAGE_SUCCESS';

// Reducer
const unsplashSvc = unsplashService.default;
const initialState = fromJS({
  currentImage: undefined,
  error: false,
  fetchingImage: false,
  images: []
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RANDOM_IMAGE: {
      return state.set('fetchingImage', true);
    }

    case GET_RANDOM_IMAGE_FAILURE: {
      return state.merge({ error: true, fetchingImage: false });
    }

    case GET_RANDOM_IMAGE_SUCCESS: {
      const newState = state.merge({
        currentImage: state.get('images').size,
        fetchingImage: false
      });
      return newState.update('images', (images) => images.push(fromJS(action.image)));
    }

    default: {
      return state;
    }
  }
};

// Action Creators
export function getRandomImage() {
  return (dispatch, getState) => {
    const state = getState();
    const params = {
      query: 'dark',
      h: state.ui.get('height'),
      w: state.ui.get('width')
    };

    dispatch({ type: GET_RANDOM_IMAGE });
    return unsplashSvc.getRandomImage(params)
      .then((image) => dispatch({ type: GET_RANDOM_IMAGE_SUCCESS, image }))
      .catch(() => dispatch({ type: GET_RANDOM_IMAGE_FAILURE }));
  };
}
