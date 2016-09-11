import { expect } from 'chai';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import * as imagesModule from './imagesModule';
import * as unsplashService from '../../../services/unsplash/unsplashService';

const unsplashSvc = unsplashService.default;
const {
  default: reducer,
  GET_RANDOM_IMAGE,
  GET_RANDOM_IMAGE_FAILURE,
  GET_RANDOM_IMAGE_SUCCESS
} = imagesModule;

describe('[Redux] UnsplashModule', () => {
  describe('reducer', () => {
    describe('GET_RANDOM_IMAGE', () => {
      it('sets fetchingImage to true', () => {
        const state = fromJS({});
        expect(reducer(state, { type: GET_RANDOM_IMAGE }).get('fetchingImage')).to.be.true;
      });
    });

    describe('GET_RANDOM_IMAGE_FAILURE', () => {
      let newState;

      beforeEach(() => {
        const state = fromJS({ fetchingImage: true });
        newState = reducer(state, { type: GET_RANDOM_IMAGE_FAILURE });
      });

      it('sets error to true', () => expect(newState.get('error')).to.be.true);
      it('sets fetchingImage to false', () => expect(newState.get('fetchingImage')).to.be.false);
    });

    describe('GET_RANDOM_IMAGE_SUCCESS', () => {
      const image = { id: '123' };
      let newState;

      beforeEach(() => {
        const state = fromJS({ fetchingImage: true, images: [{}, {}] });
        newState = reducer(state, { type: GET_RANDOM_IMAGE_SUCCESS, image });
      });

      it('sets currentImage to next images index', () =>
        expect(newState.get('currentImage')).to.equal(2)
      );
      it('sets fetchingImage to false', () => expect(newState.get('fetchingImage')).to.be.false);
      it('pushes action.image into state.images', () =>
        expect(newState.getIn(['images', 2, 'id'])).to.equal(image.id)
      );
    });

    describe('default', () => {
      it('returns old state', () => {
        const state = fromJS({});
        expect(reducer(state, { type: 'SOMETHING_ELSE' })).to.equal(state);
      });
    });
  });

  describe('getRandomPhoto()', () => {
    let dispatch;

    beforeEach(() => {
      dispatch = sinon.stub();
      sinon.stub(unsplashSvc, 'getRandomImage');
    });
    afterEach(() => unsplashSvc.getRandomImage.restore());

    it('dispatches GET_RANDOM_IMAGE', () => {
      unsplashSvc.getRandomImage.returns(Promise.resolve());
      imagesModule.getRandomImage()(dispatch);
      expect(dispatch).to.have.been.calledWith({ type: GET_RANDOM_IMAGE });
    });

    it('calls unsplashService.getRandomPhoto with params object', () => {
      const params = {
        query: 'dark',
        h: '1080',
        w: '1920'
      };
      unsplashSvc.getRandomImage.returns(Promise.resolve());
      imagesModule.getRandomImage()(dispatch);
      expect(unsplashSvc.getRandomImage).to.have.been.calledWith(params);
    });

    it('dispatches GET_RANDOM_IMAGE_SUCCESS with resolved image on success', (done) => {
      const image = {};
      const action = { type: GET_RANDOM_IMAGE_SUCCESS, image };
      unsplashSvc.getRandomImage.returns(Promise.resolve(image));
      imagesModule.getRandomImage()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWith(action);
        done();
      });
    });

    it('dispatches GET_RANDOM_IMAGE_FAILURE on error', (done) => {
      unsplashSvc.getRandomImage.returns(Promise.reject());
      imagesModule.getRandomImage()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWith({ type: GET_RANDOM_IMAGE_FAILURE });
        done();
      });
    });
  });
});
