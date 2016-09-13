import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
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

  it('adds .active class when props.active is true', () => {
    const wrapper = shallow(<Tab active label="label" />);
    expect(wrapper.is(`.${classes.active}`)).to.be.true;
  });

  it('clicking the element calls props.onClick', () => {
    const onClick = sinon.stub();
    const wrapper = shallow(<Tab label="label" onClick={onClick} />);
    expect(wrapper.find(`.${classes.tab}`)).to.have.length(1);
    wrapper.simulate('click');
    expect(onClick).to.have.been.calledOnce;
  });
});
