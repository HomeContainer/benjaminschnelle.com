import { Map as iMap } from 'immutable';

// Actions
const INCREMENT = 'counter/INCREMENT';

// Reducer
export default (state = iMap({ count: 10 }), action) => {
  if (action.type === INCREMENT) {
    return state.update('count', (count) => count + action.increment);
  }
  return state;
};

// Action Creators
export function increment() {
  return { type: INCREMENT, increment: 2 };
}
