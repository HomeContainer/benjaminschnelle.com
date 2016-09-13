import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import { HomeContainer, stateToProps } from './HomeContainer';
import Home from '../../components/Home/Home';

describe('HomeContainer', () => {
  it('renders a Home component', () => {
    const getRandomImage = sinon.stub();
    const wrapper = shallow(<HomeContainer getRandomImage={getRandomImage} />);
    expect(wrapper.type()).to.equal(Home);
  });

  describe('componentWillMount()', () => {
    it('calls props.getRandomImage()', () => {
      const getRandomImage = sinon.stub();
      shallow(<HomeContainer getRandomImage={getRandomImage} />);
      expect(getRandomImage).to.have.been.calledOnce;
    });
  });

  describe('stateToProps()', () => {
    it('gets state.images.activeImage from images and maps to props.image', () => {
      const images = {
        activeImage: 1,
        images: [{}, {}]
      };
      const state = { images: fromJS(images) };
      const activeImage = state.images.getIn(['images', images.activeImage]);
      expect(stateToProps(state).image).to.equal(activeImage);
    });
  });
});
