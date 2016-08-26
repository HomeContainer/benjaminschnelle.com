import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Nav from './Nav';
import classes from './Nav.scss';

describe('Nav', () => {
  it('renders list items with links to Home and Blog', () => {
    const wrapper = shallow(<Nav />);
    expect(wrapper.containsAllMatchingElements([
      <li><Link to="/">Home</Link></li>,
      <li><Link to="/blog">Blog</Link></li>
    ])).to.be.true;
  });

  it('renders a nav element with a .nav class', () => {
    const wrapper = shallow(<Nav />);
    const foundElements = wrapper.find(`.${classes.nav}`);
    expect(foundElements).to.have.length(1);
    expect(foundElements.first().type()).to.equal('nav');
  });

  it('adds a .open class to the nav element when props.open is true', () => {
    const wrapper = shallow(<Nav />);
    expect(wrapper.find(`.${classes.open}`)).to.have.length(0);
    wrapper.setProps({ open: true });
    expect(wrapper.find(`.${classes.open}`)).to.have.length(1);
  });
});
