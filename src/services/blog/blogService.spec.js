import { expect } from 'chai';
import sinon from 'sinon';
import { fromJS } from 'immutable';
import blogService from './blogService';
import * as fetch from '../../utils/fetch';

describe('[Service] BlogService', () => {
  describe('getPost()', () => {
    afterEach(() => { fetch.default.restore(); });

    it('calls fetch.default with https://s3-us-west-2.amazonaws.com/benjaminschnelle.com/blog/slug.md', () => {
      sinon.stub(fetch, 'default').returns(Promise.resolve());
      const r = /^https:\/\/s3-us-west-2\.amazonaws\.com\/benjaminschnelle\.com\/blog\/slug\.md/;
      blogService.getPost('slug');
      expect(fetch.default).to.have.been.calledWith(sinon.match(r));
    });

    it('if res.ok is true, returns res.text()', () => {
      const text = 'my gnarly post';
      const response = { ok: true, text: () => text };
      sinon.stub(fetch, 'default').returns(Promise.resolve(response));
      return expect(blogService.getPost('slug')).to.eventually.equal(text);
    });

    it('if res.ok is false, throws an error', () => {
      const response = { ok: false };
      sinon.stub(fetch, 'default').returns(Promise.resolve(response));
      return expect(blogService.getPost('slug')).to.eventually.be.rejectedWith(Error);
    });
  });

  describe('getPosts()', () => {
    afterEach(() => { fetch.default.restore(); });

    it('calls fetch.default with https://s3-us-west-2.amazonaws.com/benjaminschnelle.com/blog/posts.json', () => {
      sinon.stub(fetch, 'default').returns(Promise.resolve());
      blogService.getPosts();
      const r = /^https:\/\/s3-us-west-2\.amazonaws\.com\/benjaminschnelle\.com\/blog\/posts\.json/;
      expect(fetch.default).to.have.been.calledWith(sinon.match(r));
    });

    it('if res.ok is true, returns res.json()', () => {
      const json = { posts: [] };
      const response = { ok: true, json: () => json };
      sinon.stub(fetch, 'default').returns(Promise.resolve(response));
      return expect(blogService.getPosts()).to.eventually.equal(json);
    });

    it('if res.ok is false, throws an error', () => {
      const response = { ok: false };
      sinon.stub(fetch, 'default').returns(Promise.resolve(response));
      return expect(blogService.getPosts()).to.eventually.be.rejectedWith(Error);
    });
  });

  describe('selectActivePost()', () => {
    it('finds state.activePost in state.posts and returns it', () => {
      const state = fromJS({
        activePost: 'slug',
        posts: [{ slug: 'something', title: 'Something' }, { slug: 'slug', title: 'Slug' }]
      });
      expect(blogService.selectActivePost(state).get('title')).to.equal('Slug');
    });
  });
});
