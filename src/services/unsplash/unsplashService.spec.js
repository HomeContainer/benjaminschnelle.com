import { expect } from 'chai';
import sinon from 'sinon';
import unsplashService from './unsplashService';
import * as fetch from '../../utils/fetch';

describe('[Service] UnsplashService', () => {
  describe('getRandomImage()', () => {
    afterEach(() => { fetch.default.restore(); });

    it('calls fetch.default with https://api.unsplash.com/photos/random...', () => {
      sinon.stub(fetch, 'default').returns(Promise.resolve());
      unsplashService.getRandomImage();
      expect(fetch.default).to.have.been.calledWith(
        sinon.match(/^https:\/\/api\.unsplash\.com\/photos\/random/)
      );
    });

    it('applies params object as query params', () => {
      sinon.stub(fetch, 'default').returns(Promise.resolve());
      unsplashService.getRandomImage({ query: 'woof' });
      expect(fetch.default).to.have.been.calledWith(
        sinon.match(/query=woof/)
      );
    });

    it('if res.ok is true, returns res.json()', () => {
      const json = {};
      const response = { ok: true, json: () => json };
      sinon.stub(fetch, 'default').returns(Promise.resolve(response));
      return expect(unsplashService.getRandomImage()).to.eventually.equal(json);
    });

    it('if res.ok is false, throws an error', () => {
      const response = { ok: false };
      sinon.stub(fetch, 'default').returns(Promise.resolve(response));
      return expect(unsplashService.getRandomImage()).to.eventually.be.rejectedWith(Error);
    });
  });
});
