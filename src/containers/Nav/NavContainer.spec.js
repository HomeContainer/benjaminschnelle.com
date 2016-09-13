import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import { NavContainer, stateToProps } from './NavContainer';
import Nav from '../../components/Nav/Nav';
import uiService from '../../services/ui/uiService';

describe('NavContainer', () => {
  it('renders a Nav component', () => {
    const props = { screen: 'medium' };
    const wrapper = shallow(<NavContainer {...props} />);
    expect(wrapper.type()).to.equal(Nav);
  });

  it('passes props.image|open|screen to Nav', () => {
    const props = {
      image: {},
      open: false,
      screen: 'large'
    };
    const wrapper = shallow(<NavContainer {...props} />);
    expect(wrapper.prop('image')).to.equal(props.image);
    expect(wrapper.prop('open')).to.equal(props.open);
    expect(wrapper.prop('screen')).to.equal(props.screen);
  });

  describe('stateToProps', () => {
    beforeEach(() => { sinon.stub(uiService, 'getScreen'); });
    afterEach(() => { uiService.getScreen.restore(); });

    it('gets state.images.currentImage from images and maps to props.image', () => {
      const images = {
        currentImage: 1,
        images: [{}, {}]
      };
      const state = { images: fromJS(images) };
      const currentImage = state.images.getIn(['images', images.currentImage]);
      expect(stateToProps(state).image).to.equal(currentImage);
    });

    it('maps uiService.getScreen() return value to props.screen', () => {
      const screen = {};
      uiService.getScreen.returns(screen);
      const images = {
        currentImage: 1,
        images: [{}, {}]
      };
      const state = { images: fromJS(images) };
      expect(stateToProps(state).screen).to.equal(screen);
    });
  });
});
