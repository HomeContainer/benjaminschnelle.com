import { expect } from 'chai';
import uiService from './uiService';

describe('[Service] UIService', () => {
  describe('calculateBreakPointFlags()', () => {
    it('appropriately sets media.is flags', () => {
      const width = 769;
      const flags = uiService.calculateBreakPointFlags(width);
      const { extraSmall, small, medium, large, extraLarge, huge } = flags;
      expect(extraSmall).to.be.false;
      expect(small).to.be.false;
      expect(medium).to.be.true;
      expect(large).to.be.false;
      expect(extraLarge).to.be.false;
      expect(huge).to.be.false;
    });
  });
});
