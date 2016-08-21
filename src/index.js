import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes/routes';
import store from './redux/store';

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
  module.hot.accept('./routes/routes', () => {
    render(<AppContainer>{App}</AppContainer>, MOUNT_NODE);
  });
}
