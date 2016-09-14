import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import { LayoutContainer, stateToProps } from './LayoutContainer';
import Layout from '../../components/Layout/Layout';

describe('LayoutContainer', () => {
  it('renders a Layout component', () => {
    const getRandomImage = sinon.stub();
    const wrapper = shallow(<LayoutContainer getRandomImage={getRandomImage} />);
    expect(wrapper.type()).to.equal(Layout);
  });

  describe('componentWillMount()', () => {
    it('calls props.getRandomImage()', () => {
      const getRandomImage = sinon.stub();
      shallow(<LayoutContainer getRandomImage={getRandomImage} />);
      expect(getRandomImage).to.have.been.calledOnce;
    });
  });

  describe('stateToProps()', () => {
    let images;
    let state;
    let ui;

    beforeEach(() => {
      images = {
        activeImage: 1,
        images: [{}, {}]
      };
      ui = { invertMenuColor: false };
      state = { images: fromJS(images), ui: fromJS(ui) };
    });

    it('gets state.images.activeImage from images and maps to props.image', () => {
      const activeImage = state.images.getIn(['images', images.activeImage]);
      expect(stateToProps(state).image).to.equal(activeImage);
    });

    it('maps ui.invertMenuColor to props.invertMenuColor', () => {
      expect(stateToProps(state).invertMenuColor).to.equal(state.ui.get('invertMenuColor'));
    });
  });
});
