import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import Layout from './Layout';
import MenuIconButton from '../MenuIconButton/MenuIconButton';
import NavContainer from '../../containers/Nav/NavContainer';

describe('Layout', () => {
  describe('constructor()', () => {
    it('state.menuOpen is initialized to false', () => {
      const child = <div>Some child</div>;
      const wrapper = shallow(<Layout>{child}</Layout>);
      expect(wrapper.state('menuOpen')).to.be.false;
    });

    it('if props.image is passed it sets state.backgroundImage to props.image.urls.custom', () => {
      const image = {};
      global.Image = () => image;

      const child = <div>Some child</div>;
      const imageProp = fromJS({ urls: { custom: '/some/url.png' } });
      const wrapper = shallow(<Layout image={imageProp}>{child}</Layout>);
      image.onload();

      expect(wrapper.state('backgroundImage')).to.equal(imageProp.getIn(['urls', 'custom']));
    });
  });

  describe('getChildContext()', () => {
    it('returns an object with a toggleMenu key equal to this.toggleMenu', () => {
      const child = <div>Some child</div>;
      const wrapper = shallow(<Layout>{child}</Layout>);
      const instance = wrapper.instance();
      expect(instance.getChildContext().toggleMenu).to.equal(instance.toggleMenu);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('calls setImage with nextProps.image if nextProps.image is defined', () => {
      const child = <div>Some child</div>;
      const wrapper = shallow(<Layout>{child}</Layout>);
      const nextProps = { image: {} };
      const instance = wrapper.instance();
      instance.setImage = sinon.stub();
      instance.componentWillReceiveProps(nextProps);
      expect(instance.setImage).to.have.been.calledWith(nextProps.image);
    });
  });

  describe('toggleMenu()', () => {
    it('changes state.menuOpen from false to true then back to false', () => {
      const child = <div>Some child</div>;
      const wrapper = shallow(<Layout>{child}</Layout>);
      wrapper.instance().toggleMenu();
      expect(wrapper.state('menuOpen')).to.be.true;
      wrapper.instance().toggleMenu();
      expect(wrapper.state('menuOpen')).to.be.false;
    });
  });

  describe('render()', () => {
    it('renders its children, a MenuIconButton, a NavContainer, and a Footer', () => {
      const child = <div>Some child</div>;
      const wrapper = shallow(<Layout>{child}</Layout>);
      expect(wrapper.containsAllMatchingElements([
        <div>{child}</div>,
        <MenuIconButton />,
        <NavContainer />
      ])).to.be.true;
    });
  });
});
