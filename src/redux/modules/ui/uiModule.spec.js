import { expect } from 'chai';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import * as uiModule from './uiModule';
import * as uiService from '../../../services/ui/uiService';

const state = fromJS({
  atLeast: {
    extraSmall: true,
    small: true,
    medium: false,
    large: false,
    extraLarge: false
  },
  breakPoints: {
    extraSmall: 480,
    small: 768,
    medium: 992,
    large: 1200,
    extraLarge: 1920
  }
});

describe('UIModule', () => {
  describe('windowResize', () => {
    it('returns an object with a type of WINDOW_RESIZE and a width equal to the width arg', () => {
      const { windowResize, WINDOW_RESIZE } = uiModule;
      const width = 1300;
      const action = windowResize(width);
      expect(action.type).to.equal(WINDOW_RESIZE);
      expect(action.width).to.equal(width);
    });
  });

  describe('reducer', () => {
    describe('WINDOW_RESIZE', () => {
      beforeEach(() => sinon.stub(uiService.default, 'calculateBreakPointFlags'));
      afterEach(() => uiService.default.calculateBreakPointFlags.restore());

      it('uiService.calculateBreakPointFlags(width) --> merged into state.breakPoints', () => {
        const { default: reducer, WINDOW_RESIZE } = uiModule;
        const width = 769;
        const breakPoints = {
          extraSmall: true,
          small: true,
          medium: true,
          large: true,
          extraLarge: false
        };
        uiService.default.calculateBreakPointFlags.returns(breakPoints);
        const newState = reducer(state, { type: WINDOW_RESIZE, width });
        const widthAtLeast = newState.get('widthAtLeast').toJS();
        const { extraSmall, small, medium, large, extraLarge } = widthAtLeast;

        expect(uiService.default.calculateBreakPointFlags).to.have.been.calledOnce;
        expect(extraSmall).to.equal(breakPoints.extraSmall);
        expect(small).to.equal(breakPoints.small);
        expect(medium).to.equal(breakPoints.medium);
        expect(large).to.equal(breakPoints.large);
        expect(extraLarge).to.equal(breakPoints.extraLarge);
      });
    });

    describe('default', () => {
      it('returns the old state', () => {
        const newState = uiModule.default(state, { type: 'SOMETHING' });
        expect(state).to.equal(newState);
      });
    });
  });
});
