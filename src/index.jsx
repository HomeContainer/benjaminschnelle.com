import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './redux/store';
import App from './containers/App';
import Blog from './containers/Blog';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/blog" component={Blog} />
    </Router>
  </Provider>
), document.getElementById('root'));
