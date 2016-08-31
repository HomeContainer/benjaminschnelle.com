import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Cell from './Cell';
import classes from './Cell.scss';

const child = <div>I am a child</div>;

describe('Cell', () => {
  it('renders a div with its children', () => {
    const wrapper = shallow(<Cell>{child}</Cell>);
    expect(wrapper.type()).to.equal('div');
    expect(wrapper.containsAllMatchingElements([<div>{child}</div>])).to.be.true;
  });

  it('has a .cell class', () => {
    const wrapper = shallow(<Cell />);
    expect(wrapper.is(`.${classes.cell}`)).to.be.true;
  });

  it('adds props.className, if set', () => {
    const wrapper = shallow(<Cell className="myClass" />);
    expect(wrapper.is('.myClass')).to.be.true;
  });
});
