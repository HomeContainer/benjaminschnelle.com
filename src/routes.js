import React from 'react';
import { IndexRoute, Route } from 'react-router';
import LayoutContainer from './containers/Layout/LayoutContainer';
import HomeContainer from './containers/Home/HomeContainer';
import BlogContainer from './containers/Blog/BlogContainer';
import BlogPostContainer from './containers/BlogPost/BlogPostContainer';

const routes = (
  <Route path="/" component={LayoutContainer}>
    <IndexRoute component={HomeContainer} />
    <Route path="/blog" component={BlogContainer}>
      <Route path="/blog/:slug" component={BlogPostContainer} />
    </Route>
  </Route>
);

export default routes;
