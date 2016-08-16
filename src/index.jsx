import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import App from './containers/App';
import Blog from './containers/Blog';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/blog" component={Blog} />
  </Router>
), document.getElementById('root'));
