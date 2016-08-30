import { fromJS } from 'immutable';
import * as uiService from '../../../services/ui/uiService';

// Actions
export const WINDOW_RESIZE = 'browser/WINDOW_RESIZE';

// Reducer
const uiSvc = uiService.default;
const initialState = fromJS({
  widthAtLeast: uiSvc.calculateBreakPointFlags(window.innerWidth),
  breakPoints: uiSvc.breakPoints
});

export default (state = initialState, action) => {
  if (action.type === WINDOW_RESIZE) {
    const breakPoints = uiSvc.calculateBreakPointFlags(action.width);
    return state.mergeIn(['widthAtLeast'], fromJS(breakPoints));
  }
  return state;
};

// Action Creators
export function windowResize(width) {
  return { type: WINDOW_RESIZE, width };
}
