import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Counter from './Counter';

describe('Counter', () => {
  it('renders an h2, Link, button, and div', () => {
    const count = 10;
    const increment = () => {};
    const wrapper = shallow(<Counter count={count} increment={increment} />);

    expect(wrapper.containsAllMatchingElements([
      <h2>Hello from Counter!</h2>,
      <Link to="/">Go Home!</Link>,
      <button>Increment</button>,
      <div>{count}</div>
    ])).to.be.true;
  });

  it('clicking the button calls props.increment', () => {
    const count = 10;
    const increment = sinon.stub();
    const wrapper = shallow(<Counter count={count} increment={increment} />);
    wrapper.find('button').simulate('click');

    expect(increment).to.have.been.calledOnce;
  });
});
