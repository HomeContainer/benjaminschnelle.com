import { expect } from 'chai';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import * as blogModule from './blogModule';
import * as blogService from '../../../services/blog/blogService';

const blogSvc = blogService.default;
const {
  default: reducer,
  GET_POST,
  GET_POST_FAILURE,
  GET_POST_SUCCESS,
  GET_POSTS,
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS
} = blogModule;

describe('[Redux] BlogModule', () => {
  describe('reducer', () => {
    describe('GET_POST', () => {
      it('sets fetchingPost to true', () => {
        const state = fromJS({});
        expect(reducer(state, { type: GET_POST }).get('fetchingPost')).to.be.true;
      });
    });

    describe('GET_POST_FAILURE', () => {
      let newState;

      beforeEach(() => {
        const state = fromJS({ fetchingPost: true });
        newState = reducer(state, { type: GET_POST_FAILURE });
      });

      it('sets postError to true', () => expect(newState.get('postError')).to.be.true);
      it('sets fetchingPost to false', () => expect(newState.get('fetchingPost')).to.be.false);
    });

    describe('GET_POST_SUCCESS', () => {
      let content;
      let newState;
      const slug = 'slug';

      beforeEach(() => {
        const state = fromJS({ fetchingPost: true, posts: [{ slug }] });
        content = 'neat post';
        newState = reducer(state, { type: GET_POST_SUCCESS, content, slug });
      });

      it('sets fetchingPost to false', () => {
        expect(newState.get('fetchingPost')).to.be.false;
      });

      it('finds and updates post in state.posts with action.content', () => {
        expect(newState.getIn(['posts', 0, 'content'])).to.equal(content);
      });
    });

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
      let newState;
      let posts;

      beforeEach(() => {
        const state = fromJS({ fetchingPosts: true });
        posts = [{ id: 123 }, { id: 456 }];
        newState = reducer(state, { type: GET_POSTS_SUCCESS, posts });
      });

      it('sets fetchingPosts to false', () => {
        expect(newState.get('fetchingPosts')).to.be.false;
      });

      it('sets state.posts to action.posts', () => {
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

  describe('getPost()', () => {
    let dispatch;
    const slug = 'slug';

    beforeEach(() => {
      dispatch = sinon.stub();
      sinon.stub(blogSvc, 'getPost');
    });
    afterEach(() => blogSvc.getPost.restore());

    it('dispatches GET_POST', () => {
      blogSvc.getPost.returns(Promise.resolve());
      blogModule.getPost(slug)(dispatch);
      expect(dispatch).to.have.been.calledWith({ type: GET_POST });
    });

    it('calls blogService.getPost with slug', () => {
      blogSvc.getPost.returns(Promise.resolve());
      blogModule.getPost(slug)(dispatch);
      expect(blogSvc.getPost).to.have.been.calledWith(slug);
    });

    it('dispatches GET_POST_SUCCESS with resolved payload on success', (done) => {
      const content = 'real good post';
      const action = { type: GET_POST_SUCCESS, content, slug };

      sinon.stub(blogSvc, 'parseMarkdown');
      blogSvc.getPost.returns(Promise.resolve(content));
      // blogSvc.parseMarkdown.returns(Promise.resolve(content));
      blogModule.getPost(slug)(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWith(action);
        blogSvc.parseMarkdown.restore();
        done();
      });
    });

    it('dispatches GET_POST_FAILURE on error', (done) => {
      blogSvc.getPost.returns(Promise.reject());
      blogModule.getPost(slug)(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWith({ type: GET_POST_FAILURE });
        done();
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
