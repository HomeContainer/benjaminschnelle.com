/*
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NavGrid from './NavGrid';
import classes from './NavGrid.scss';

const child = <div>I am a child</div>;

describe('NavGrid', () => {
  describe('large', () => {
    it('renders 16 children', () => {
      const wrapper = shallow(<NavGrid />);
      expect(wrapper.type()).to.equal('div');
      expect(wrapper.containsAllMatchingElements([<div>{child}</div>])).to.be.true;
    });
  });

  describe('small', () => {

  });

  it('small')

  it('has a .cell class', () => {
    const wrapper = shallow(<Cell>{child}</Cell>);
    expect(wrapper.is(`.${classes.cell}`)).to.be.true;
  });

  it('adds props.className, if set', () => {
    const wrapper = shallow(<Cell className="myClass">{child}</Cell>);
    expect(wrapper.is('.myClass')).to.be.true;
  });
});
*/
