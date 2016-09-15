import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Loader from './Loader';
import classes from './Loader.scss';

describe('MenuIconButton', () => {
  it('renders a root div with a .loader class', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.is(`.${classes.loader}`)).to.be.true;
  });

  it('renders 5 nested divs', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.containsAllMatchingElements([
      <div />,
      <div />,
      <div />,
      <div />,
      <div />
    ])).to.be.true;
  });
});
