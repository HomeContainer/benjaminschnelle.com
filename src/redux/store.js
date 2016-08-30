import * as redux from 'redux';
import * as combinedReducer from './combinedReducer';
import * as uiModule from './modules/ui/uiModule';

let devTools;
/* istanbul ignore if */
if (__DEV__) {
  devTools = window.devToolsExtension && window.devToolsExtension();
}

const store = redux.createStore(combinedReducer.default, devTools);

/* add resize listener to keep ui state up to date */
window.addEventListener('resize', () =>
  // TODO debounce
  store.dispatch(uiModule.windowResize(window.innerWidth))
);

export default store;
