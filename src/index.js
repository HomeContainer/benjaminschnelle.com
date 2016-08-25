import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './redux/store';
import routes from './routes';

const MOUNT_NODE = document.getElementById('root');
const history = syncHistoryWithStore(browserHistory, store);

const App = (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

render(App, MOUNT_NODE);

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(<AppContainer>{App}</AppContainer>, MOUNT_NODE);
  });
}
