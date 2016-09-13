import React from 'react';
import { IndexRoute, Route } from 'react-router';
import LayoutContainer from './containers/Layout/LayoutContainer';
import HomeContainer from './containers/Home/HomeContainer';
import BlogContainer from './containers/Blog/BlogContainer';

const routes = (
  <Route path="/" component={LayoutContainer}>
    <IndexRoute component={HomeContainer} />
    <Route path="/blog" component={BlogContainer} />
  </Route>
);

export default routes;
