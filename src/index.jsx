import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import App from './containers/App';
import Blog from './containers/Blog';

const reducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return { counter: state.counter + action.increment };
  }
  return state;
};
const initialState = { counter: 10 };
const store = createStore(reducer, initialState);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/blog" component={Blog} />
    </Router>
  </Provider>
), document.getElementById('root'));
