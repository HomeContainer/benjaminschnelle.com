import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Link } from 'react-router';
import { NavList } from './NavList';
import classes from './NavList.scss';

const userInfo = { name: 'Rick', email: 'rick@world.com', phone: '1234567890' };

describe('NavList', () => {
  it('renders links to "home" and "blog"', () => {
    const context = { toggleMenu: sinon.stub() };
    const wrapper = shallow(<NavList userInfo={userInfo} />, { context });
    expect(wrapper.contains([
      <li><Link onClick={context.toggleMenu} to="/">home.</Link></li>,
      <li><Link onClick={context.toggleMenu} to="/blog">blog.</Link></li>
    ])).to.be.true;
  });

  it('adds an .open class to the body element when context.navOpen is true', () => {
    const wrapper = shallow(<NavList userInfo={userInfo} />, { context: { navOpen: false } });
    expect(wrapper.find(`.${classes.open}`)).to.have.length(0);
    wrapper.setContext({ navOpen: true });
    expect(wrapper.find(`.${classes.open}`)).to.have.length(1);
  });
});
