import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from './components/Layout/Layout';
import HomeContainer from './containers/Home/HomeContainer';
// import BlogContainer from './containers/Blog/BlogContainer';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomeContainer} />
  </Route>
);

export default routes;
