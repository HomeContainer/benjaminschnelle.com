import setHTML from './setHTML';

if (module.hot) {
  module.hot.accept('./setHTML', () => {
    // eslint-disable-next-line
    require('./setHTML').default();
  });
}

setHTML();
