import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Tab from './Tab';
import classes from './Tab.scss';

describe('Tab', () => {
  it('renders a root div and two nested spans', () => {
    const wrapper = shallow(<Tab label="label" />);
    expect(wrapper.type()).to.equal('div');
  });

  it('renders two nested spans', () => {
    const wrapper = shallow(<Tab label="label" />);
    expect(wrapper.find('span')).to.have.length(2);
  });

  it('renders props.label into a span', () => {
    const wrapper = shallow(<Tab label="label" />);
    expect(wrapper.contains(<span>label</span>)).to.be.true;
  });

  it('root element has a class of .tab', () => {
    const wrapper = shallow(<Tab label="label" />);
    expect(wrapper.find(`.${classes.tab}`)).to.have.length(1);
  });
});
