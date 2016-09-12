import * as redux from 'redux';
import thunk from 'redux-thunk';
import * as combinedReducer from './combinedReducer';
import * as uiModule from './modules/ui/uiModule';

const { applyMiddleware, compose, createStore } = redux;
let devTools;
/* istanbul ignore if */
if (__DEV__) {
  devTools = window.devToolsExtension && window.devToolsExtension();
}


const store = createStore(combinedReducer.default, compose(applyMiddleware(thunk), devTools));

/* add resize listener to keep ui state up to date */
window.addEventListener('resize', () =>
  // TODO debounce
  store.dispatch(uiModule.windowResize(window.innerHeight, window.innerWidth))
);

export default store;
