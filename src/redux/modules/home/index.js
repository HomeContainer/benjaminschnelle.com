// Actions
const INCREMENT = 'benjaminschnelle.com/home/INCREMENT';

// Reducer
export default (state = { counter: 10 }, action) => {
  if (action.type === INCREMENT) {
    return { counter: state.counter + action.increment };
  }
  return state;
};

// Action Creators
export function increment() {
  return { type: INCREMENT, increment: 2 };
}
