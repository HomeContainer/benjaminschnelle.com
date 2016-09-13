import { expect } from 'chai';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import * as blogModule from './blogModule';
import * as blogService from '../../../services/blog/blogService';

const blogSvc = blogService.default;
const {
  default: reducer,
  GET_POSTS,
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS
} = blogModule;

describe('[Redux] BlogModule', () => {
  describe('reducer', () => {
    describe('GET_POSTS', () => {
      it('sets fetchingPosts to true', () => {
        const state = fromJS({});
        expect(reducer(state, { type: GET_POSTS }).get('fetchingPosts')).to.be.true;
      });
    });

    describe('GET_POSTS_FAILURE', () => {
      let newState;

      beforeEach(() => {
        const state = fromJS({ fetchingPosts: true });
        newState = reducer(state, { type: GET_POSTS_FAILURE });
      });

      it('sets error to true', () => expect(newState.get('error')).to.be.true);
      it('sets fetchingPosts to false', () => expect(newState.get('fetchingPosts')).to.be.false);
    });

    describe('GET_POSTS_SUCCESS', () => {
      it('sets state.posts to action.posts', () => {
        const state = fromJS({ fetchingPosts: true });
        const posts = [{ id: 123 }, { id: 456 }];
        const newState = reducer(state, { type: GET_POSTS_SUCCESS, posts });
        expect(newState.getIn(['posts', 1, 'id'])).to.equal(posts[1].id);
      });
    });

    describe('default', () => {
      it('returns old state', () => {
        const state = fromJS({});
        expect(reducer(state, { type: 'SOMETHING_ELSE' })).to.equal(state);
      });
    });
  });

  describe('getPosts()', () => {
    let dispatch;

    beforeEach(() => {
      dispatch = sinon.stub();
      sinon.stub(blogSvc, 'getPosts');
    });
    afterEach(() => blogSvc.getPosts.restore());

    it('dispatches GET_POSTS', () => {
      blogSvc.getPosts.returns(Promise.resolve());
      blogModule.getPosts()(dispatch);
      expect(dispatch).to.have.been.calledWith({ type: GET_POSTS });
    });

    it('calls blogService.getPosts', () => {
      blogSvc.getPosts.returns(Promise.resolve());
      blogModule.getPosts()(dispatch);
      expect(blogSvc.getPosts).to.have.been.calledOnce;
    });

    it('dispatches GET_POSTS_SUCCESS with resolved payload on success', (done) => {
      const posts = { posts: [] };
      const action = { type: GET_POSTS_SUCCESS, posts: posts.posts };
      blogSvc.getPosts.returns(Promise.resolve(posts));
      blogModule.getPosts()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWith(action);
        done();
      });
    });

    it('dispatches GET_POSTS_FAILURE on error', (done) => {
      blogSvc.getPosts.returns(Promise.reject());
      blogModule.getPosts()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWith({ type: GET_POSTS_FAILURE });
        done();
      });
    });
  });
});
