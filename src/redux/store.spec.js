import { expect } from 'chai';
import sinon from 'sinon';
import * as redux from 'redux';
import * as combinedReducer from './combinedReducer';
import * as uiModule from './modules/ui/uiModule';

describe('Store', () => {
  let store;
  let storeStub;

  before(() => {
    storeStub = { dispatch: sinon.stub() };
    window.innerHeight = 500;
    window.innerWidth = 800;
    sinon.stub(uiModule, 'windowResize');
    sinon.stub(redux, 'createStore').returns(storeStub);
    sinon.stub(window, 'addEventListener', (event, handler) => {
      handler();
    });

    /* eslint-disable */
    global.__DEV__ = false;
    store = require('./store').default;
  });

  after(() => {
    delete global.__DEV__;
    uiModule.windowResize.restore();
    redux.createStore.restore();
    window.addEventListener.restore();
  })

  describe('adds resize event listener', () => {
    it('dispatches a uiModule.windowResize with window.innerHeight and window.innerWidth', () => {
      expect(uiModule.windowResize).to.have.been.calledWith(window.innerHeight, window.innerWidth);
    });
  });

  describe('createStore', () => {
    it('called with combinedReducer default export', () => {
      expect(store).to.equal(storeStub);
      expect(redux.createStore).to.have.been.calledWith(combinedReducer.default, sinon.match.any);
    });
  });
});
