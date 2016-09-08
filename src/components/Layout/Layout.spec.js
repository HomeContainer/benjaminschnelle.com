import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Layout from './Layout';
import MenuIconButton from '../MenuIconButton/MenuIconButton';
import NavContainer from '../../containers/Nav/NavContainer';

describe('Layout', () => {
  it('renders its children, a MenuIconButton, a NavContainer, and a Footer', () => {
    const child = <div>Some child</div>;
    const wrapper = shallow(<Layout>{child}</Layout>);
    expect(wrapper.containsAllMatchingElements([
      <div>{child}</div>,
      <MenuIconButton />,
      <NavContainer />
    ])).to.be.true;
  });

  it('state.menuOpen is initialized to false', () => {
    const child = <div>Some child</div>;
    const wrapper = shallow(<Layout>{child}</Layout>);
    expect(wrapper.state('menuOpen')).to.be.false;
  });

  it('toggleMenu changes state.menuOpen from false to true then back to false', () => {
    const child = <div>Some child</div>;
    const wrapper = shallow(<Layout>{child}</Layout>);
    wrapper.instance().toggleMenu();
    expect(wrapper.state('menuOpen')).to.be.true;
    wrapper.instance().toggleMenu();
    expect(wrapper.state('menuOpen')).to.be.false;
  });
});
