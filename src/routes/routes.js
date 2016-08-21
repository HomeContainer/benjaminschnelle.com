import HomeRoute from './home/homeRoute';
import CounterRoute from './counter/counterRoute';

export default {
  path: '/',
  indexRoute: HomeRoute,
  childRoutes: [
    CounterRoute
  ]
};
