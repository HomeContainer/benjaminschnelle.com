import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import MenuIconButton from './MenuIconButton';
import classes from './MenuIconButton.scss';

describe('MenuIconButton', () => {
  it('renders a button with three nested spans', () => {
    const wrapper = shallow(<MenuIconButton />);
    expect(wrapper.type()).to.equal('button');
    expect(wrapper.containsAllMatchingElements([
      <span />,
      <span />,
      <span />
    ])).to.be.true;
  });

  it('adds props.className to the button, if set', () => {
    const wrapper = shallow(<MenuIconButton className="myClass" />);
    expect(wrapper.is('.myClass')).to.be.true;
  });

  it('adds an .open class to the button when props.open is true', () => {
    const wrapper = shallow(<MenuIconButton open />);
    expect(wrapper.is(`.${classes.open}`)).to.be.true;
  });
});
