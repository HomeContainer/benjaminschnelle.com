import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import blog from './modules/blog/blogModule';
import images from './modules/images/imagesModule';
import ui from './modules/ui/uiModule';

export default combineReducers({
  blog,
  images,
  routing: routerReducer,
  ui
});
