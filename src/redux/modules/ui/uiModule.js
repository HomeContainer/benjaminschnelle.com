import { fromJS } from 'immutable';
import * as uiService from '../../../services/ui/uiService';

// Actions
export const WINDOW_RESIZE = 'ui/WINDOW_RESIZE';

// Reducer
const uiSvc = uiService.default;
const { innerHeight, innerWidth } = window;
const initialState = fromJS({
  breakPoints: uiSvc.breakPoints,
  is: uiSvc.calculateBreakPointFlags(innerWidth),
  height: innerHeight,
  width: innerWidth
});

export default (state = initialState, action) => {
  if (action.type === WINDOW_RESIZE) {
    const { height, width } = action;
    const breakPoints = uiSvc.calculateBreakPointFlags(width);
    return state.merge(fromJS({ is: breakPoints, height, width }));
  }
  return state;
};

// Action Creators
export function windowResize(height, width) {
  return { type: WINDOW_RESIZE, height, width };
}
