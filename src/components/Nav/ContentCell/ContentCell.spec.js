import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Cell from '../Cell/Cell';
import ContentCell from './ContentCell';
import classes from './ContentCell.scss';

const child = <div>I am a child</div>;

describe('ContentCell', () => {
  it('renders a Cell', () => {
    const wrapper = shallow(<ContentCell>{child}</ContentCell>);
    expect(wrapper.type()).to.equal(Cell);
  });

  it('passes props.onClick to Cell', () => {
    const onClick = () => {};
    const wrapper = shallow(<ContentCell onClick={onClick}>{child}</ContentCell>);
    expect(wrapper.prop('onClick')).to.equal(onClick);
  });

  it('has a .contentCell class', () => {
    const wrapper = shallow(<ContentCell>{child}</ContentCell>);
    expect(wrapper.is(`.${classes.contentCell}`)).to.be.true;
  });

  it('adds props.className, if set', () => {
    const wrapper = shallow(<ContentCell className="myClass">{child}</ContentCell>);
    expect(wrapper.is('.myClass')).to.be.true;
  });
});
