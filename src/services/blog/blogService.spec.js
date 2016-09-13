import { expect } from 'chai';
import sinon from 'sinon';
import blogService from './blogService';
import * as fetch from '../../utils/fetch';

describe('[Service] BlogService', () => {
  describe('getPosts()', () => {
    afterEach(() => { fetch.default.restore(); });

    it('calls fetch.default with https://s3-us-west-2.amazonaws.com/benjaminschnelle.com/posts.json...', () => {
      sinon.stub(fetch, 'default').returns(Promise.resolve());
      blogService.getPosts();
      expect(fetch.default).to.have.been.calledWith(
        sinon.match(/^https:\/\/s3-us-west-2\.amazonaws\.com\/benjaminschnelle\.com\/posts\.json/)
      );
    });

    it('if res.ok is true, returns res.text()', () => {
      const text = '{ posts: [] }';
      const response = { ok: true, text: () => text };
      sinon.stub(fetch, 'default').returns(Promise.resolve(response));
      return expect(blogService.getPosts()).to.eventually.equal(text);
    });

    it('if res.ok is false, throws an error', () => {
      const response = { ok: false };
      sinon.stub(fetch, 'default').returns(Promise.resolve(response));
      return expect(blogService.getPosts()).to.eventually.be.rejectedWith(Error);
    });
  });
});
