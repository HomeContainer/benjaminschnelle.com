import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from './components/Layout/Layout';
import HomeContainer from './containers/Home/HomeContainer';
import CounterContainer from './containers/Counter/CounterContainer';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomeContainer} />
    <Route path="/counter" component={CounterContainer} />
  </Route>
);

export default routes;
