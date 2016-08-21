// Actions
const INCREMENT = 'benjaminschnelle.com/home/INCREMENT';

// Reducer
export default (state = { count: 10 }, action) => {
  if (action.type === INCREMENT) {
    return { count: state.count + action.increment };
  }
  return state;
};

// Action Creators
export function increment() {
  return { type: INCREMENT, increment: 2 };
}
