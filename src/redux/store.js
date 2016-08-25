import { createStore } from 'redux';
import combinedReducer from './combinedReducer';

let devTools;
if (__DEV__) {
  devTools = window.devToolsExtension && window.devToolsExtension();
}

export default createStore(combinedReducer, devTools);
