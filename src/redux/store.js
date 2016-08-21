import { createStore } from 'redux';
import combinedReducer from './combinedReducer';

let devTools;
// TODO added to webpack config and .eslintrc ... update blog
if (__DEV__) {
  devTools = window.devToolsExtension && window.devToolsExtension();
}

export default createStore(combinedReducer, devTools);
