import * as redux from 'redux';
import thunk from 'redux-thunk';
import { debounce } from 'lodash';
import * as combinedReducer from './combinedReducer';
import * as uiModule from './modules/ui/uiModule';

const { applyMiddleware, compose, createStore } = redux;
const enhancers = [applyMiddleware(thunk)];

/* istanbul ignore if */
if (__DEV__ && window.devToolsExtension) {
  enhancers.push(window.devToolsExtension());
}

const store = createStore(combinedReducer.default, compose(...enhancers));

/* add resize listener to keep ui state up to date */
window.addEventListener('resize', debounce(() =>
  store.dispatch(uiModule.windowResize(window.innerHeight, window.innerWidth))
), 100);

export default store;
