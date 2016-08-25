import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './modules/counter/counterModule';

export default combineReducers({
  counter,
  routing: routerReducer,
});
