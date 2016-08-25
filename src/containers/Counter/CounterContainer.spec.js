import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map as iMap } from 'immutable';
import { CounterContainer, dispatchToProps, stateToProps } from './CounterContainer';
import Counter from '../../components/Counter/Counter';

describe('CounterContainer', () => {
  it('passes props.count and props.increment to Counter', () => {
    const count = 5;
    const increment = () => {};
    const wrapper = shallow(<CounterContainer count={count} increment={increment} />);
    expect(wrapper.prop('count')).to.equal(count);
    expect(wrapper.prop('increment')).to.equal(increment);
    expect(wrapper.type()).to.equal(Counter);
  });

  describe('stateToProps', () => {
    it('maps state.counter.count to props.count', () => {
      const state = { counter: iMap({ count: 5 }) };
      expect(stateToProps(state).count).to.equal(state.counter.get('count'));
    });
  });

  describe('dispatchToProps', () => {
    it('has an increment key of type function', () => {
      expect(typeof dispatchToProps.increment).to.equal('function');
    });
  });
});
