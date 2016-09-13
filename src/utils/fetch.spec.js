import { expect } from 'chai';
import * as fetch from './fetch';

describe('[Utility] Fetch', () => {
  describe('handleError()', () => {
    it('throws an error if res.ok is false', () => {
      const res = { ok: false };
      expect(fetch.handleError.bind(null, res)).to.throw(Error);
    });

    it('returns the response object otherwise', () => {
      const res = { ok: true };
      expect(fetch.handleError(res)).to.equal(res);
    });
  });

  describe('getJSON()', () => {
    it('returns response.json()', () => {
      const json = {};
      const res = { json: () => json };
      expect(fetch.getJSON(res)).to.equal(json);
    });
  });

  describe('getText()', () => {
    it('returns response.text()', () => {
      const text = 'this is some text';
      const res = { text: () => text };
      expect(fetch.getText(res)).to.equal(text);
    });
  });
});
