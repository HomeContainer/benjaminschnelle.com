import { expect } from 'chai';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import * as uiModule from './uiModule';
import * as uiService from '../../../services/ui/uiService';

const state = fromJS({
  breakPoints: {
    extraSmall: 480,
    small: 768,
    medium: 992,
    large: 1200,
    extraLarge: 1920
  },
  invertMenuColor: false,
  is: {
    extraSmall: false,
    small: true,
    medium: false,
    large: false,
    extraLarge: false
  },
  height: 0,
  width: 0
});

describe('[Redux] UIModule', () => {
  describe('reducer', () => {
    describe('SET_MENU_COLOR', () => {
      it('sets state.invertMenuColor to action.invert', () => {
        const { default: reducer, SET_MENU_COLOR } = uiModule;
        const newState = reducer(state, { type: SET_MENU_COLOR, invert: true });
        expect(newState.get('invertMenuColor')).to.be.true;
      });
    });

    describe('WINDOW_RESIZE', () => {
      beforeEach(() => sinon.stub(uiService.default, 'calculateBreakPointFlags'));
      afterEach(() => uiService.default.calculateBreakPointFlags.restore());

      it('uiService.calculateBreakPointFlags(width) --> merged into state.breakPoints', () => {
        const { default: reducer, WINDOW_RESIZE } = uiModule;
        const height = 300;
        const width = 769;
        const breakPoints = {
          extraSmall: false,
          small: false,
          medium: true,
          large: false,
          extraLarge: false,
          huge: false
        };
        uiService.default.calculateBreakPointFlags.returns(breakPoints);
        const newState = reducer(state, { type: WINDOW_RESIZE, height, width });
        const is = newState.get('is').toJS();
        const { extraSmall, small, medium, large, extraLarge, huge } = is;

        expect(uiService.default.calculateBreakPointFlags).to.have.been.calledOnce;
        expect(extraSmall).to.equal(breakPoints.extraSmall);
        expect(small).to.equal(breakPoints.small);
        expect(medium).to.equal(breakPoints.medium);
        expect(large).to.equal(breakPoints.large);
        expect(extraLarge).to.equal(breakPoints.extraLarge);
        expect(huge).to.equal(breakPoints.huge);
      });

      it('sets height and width to action.height and action.width', () => {
        const { default: reducer, WINDOW_RESIZE } = uiModule;
        const height = 300;
        const width = 769;
        const newState = reducer(state, { type: WINDOW_RESIZE, height, width });

        expect(newState.get('height')).to.equal(height);
        expect(newState.get('width')).to.equal(width);
      });
    });

    describe('default', () => {
      it('returns the old state', () => {
        const newState = uiModule.default(state, { type: 'SOMETHING' });
        expect(state).to.equal(newState);
      });
    });
  });

  describe('setMenuColor()', () => {
    it('returns an object with type of SET_MENU_COLOR and invert prop set to arg', () => {
      const { setMenuColor, SET_MENU_COLOR } = uiModule;
      const action = setMenuColor(true);
      expect(action.type).to.equal(SET_MENU_COLOR);
      expect(action.invert).to.be.true;
    });
  });

  describe('windowResize()', () => {
    it('returns an object with a type of WINDOW_RESIZE, window width, and window height', () => {
      const { windowResize, WINDOW_RESIZE } = uiModule;
      const height = 900;
      const width = 1300;
      const action = windowResize(height, width);
      expect(action.type).to.equal(WINDOW_RESIZE);
      expect(action.height).to.equal(height);
      expect(action.width).to.equal(width);
    });
  });
});
