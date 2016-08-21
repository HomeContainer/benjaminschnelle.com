/*
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { AppContainer, dispatchToProps, stateToProps } from '../../../src/containers/App';
import { increment } from '../../../src/redux/modules/home';
import App from '../../../src/components/App';

describe('AppContainer', () => {
  it('renders an App', () => {
    const counter = 100;
    const inc = () => {};
    const linkMessage = 'Go to Blog!';
    const wrapper = shallow(<AppContainer counter={counter} increment={inc} />);
    expect(wrapper.containsMatchingElement(
      <App counter={counter} increment={inc} linkMessage={linkMessage} />
    )).to.be.true;
  });
});

describe('dispatchToProps', () => {
  it('has one key of "increment"', () => {
    expect(Object.keys(dispatchToProps).length).to.equal(1);
    expect(dispatchToProps.increment).to.equal(increment);
  });
});

describe('stateToProps', () => {
  it('maps state.home.counter to counter', () => {
    const state = { home: { counter: 100 } };
    expect(stateToProps(state).counter).to.equal(state.home.counter);
  });
});
*/
