import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import ui from './modules/ui/uiModule';
import counter from './modules/counter/counterModule';

export default combineReducers({
  counter,
  routing: routerReducer,
  ui
});
