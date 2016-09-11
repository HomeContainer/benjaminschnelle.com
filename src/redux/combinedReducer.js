import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import images from './modules/images/imagesModule';
import ui from './modules/ui/uiModule';

export default combineReducers({
  images,
  routing: routerReducer,
  ui
});
