import { fromJS } from 'immutable';
import * as uiService from '../../../services/ui/uiService';

// Actions
export const SET_MENU_COLOR = 'ui/SET_MENU_COLOR';
export const WINDOW_RESIZE = 'ui/WINDOW_RESIZE';

// Reducer
const uiSvc = uiService.default;
const { innerHeight, innerWidth } = window;
const initialState = fromJS({
  breakPoints: uiSvc.breakPoints,
  invertMenuColor: false,
  is: uiSvc.calculateBreakPointFlags(innerWidth),
  height: innerHeight,
  width: innerWidth
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_COLOR: {
      return state.set('invertMenuColor', action.invert);
    }

    case WINDOW_RESIZE: {
      const { height, width } = action;
      const breakPoints = uiSvc.calculateBreakPointFlags(width);
      return state.merge(fromJS({ is: breakPoints, height, width }));
    }

    default: {
      return state;
    }
  }
};

// Action Creators
export function setMenuColor(invert) {
  return { type: SET_MENU_COLOR, invert };
}

export function windowResize(height, width) {
  return { type: WINDOW_RESIZE, height, width };
}
