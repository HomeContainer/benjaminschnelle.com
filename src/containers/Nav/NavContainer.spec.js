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

  it('passes props.open|screen to Nav', () => {
    const props = { open: false, screen: 'large' };
    const wrapper = shallow(<NavContainer {...props} />);
    expect(wrapper.prop('open')).to.equal(props.open);
    expect(wrapper.prop('screen')).to.equal(props.screen);
  });

  describe('stateToProps', () => {
    beforeEach(() => { sinon.stub(uiService, 'getScreen'); });
    afterEach(() => { uiService.getScreen.restore(); });

    it('maps uiService.getScreen() return value to props.screen', () => {
      const screen = {};
      uiService.getScreen.returns(screen);
      const images = {
        activeImage: 1,
        images: [{}, {}]
      };
      const state = { images: fromJS(images) };
      expect(stateToProps(state).screen).to.equal(screen);
    });
  });
});
