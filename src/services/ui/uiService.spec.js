import { expect } from 'chai';
import uiService from './uiService';

describe('UIService', () => {
  describe('breakPoints have the following default values', () => {
    it('extraSmall: 480', () => expect(uiService.breakPoints.extraSmall).to.equal(480));
    it('small: 768', () => expect(uiService.breakPoints.small).to.equal(768));
    it('medium: 992', () => expect(uiService.breakPoints.medium).to.equal(992));
    it('large: 1200', () => expect(uiService.breakPoints.large).to.equal(1200));
    it('extraLarge: 1920', () => expect(uiService.breakPoints.extraLarge).to.equal(1920));
  });

  describe('calculateBreakPointFlags', () => {
    it('appropriately sets atLeast flags when width is between breakPoints', () => {
      const width = 769;
      const flags = uiService.calculateBreakPointFlags(width);
      const { extraSmall, small, medium, large, extraLarge } = flags;
      expect(extraSmall).to.be.true;
      expect(small).to.be.true;
      expect(medium).to.be.false;
      expect(large).to.be.false;
      expect(extraLarge).to.be.false;
    });

    it('appropriately sets atLeast flags when width is equal to a breakPoint', () => {
      const width = 1200;
      const flags = uiService.calculateBreakPointFlags(width);
      const { extraSmall, small, medium, large, extraLarge } = flags;
      expect(extraSmall).to.be.true;
      expect(small).to.be.true;
      expect(medium).to.be.true;
      expect(large).to.be.true;
      expect(extraLarge).to.be.false;
    });
  });
});
