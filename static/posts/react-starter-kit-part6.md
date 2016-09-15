Last time we saw how to setup our testing environment and a couple different ways to organize our tests.

## 9. Redux
React has got our UI covered, but what about application [state](http://stackoverflow.com/a/8102731/2482993)?  How should we manage that?  [Redux](http://redux.js.org/)!

Redux is a simplified implementation of the [Flux](http://facebook.github.io/flux/) pattern created/used by Facebook.  Flux and Redux take a different approach than more traditional design patterns like MVC ([client MVC](http://stackoverflow.com/questions/33447710/mvc-vs-flux-bidirectional-vs-unidirectional)).

Many client frameworks like Ember and Angular 1 implement two-way data binding which means that your data model can update your view (UI) and your view can update your model.  This type of binding can be convenient and results in less boilerplate code, but there are also performance implications in complex applications and it can make reasoning about your app more difficult.

Redux takes a different approach (borrowing from Flux concepts) which makes it easier to reason about.  In Redux all state is maintained by a central `store` and your application can `subscribe` to changes so that anytime your state is changed in the `store` your application is notified and can respond accordingly.  

So how do you actually change the data in the `store`?  You `dispatch` an `action` via the `store` which updates the state using a `reducer` which is a [pure](http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/) function (a function that doesn't have side effects...if you call it with the same arguments over and over it will always return the same value) that takes the old state + your `action` and returns the next state.  All data flow is one-way.

We'll see how this all works below in the context of React, **BUT** you do not *have* to use Redux with React.  It can be used entirely on its own, with any other view library, or you can write your own views using raw HTML and JavaScript.

Let's install the libraries we'll need.

```bash
npm install --save redux react-redux react-router-redux
```

##### What are those?
- `redux`: self-explanatory
- `react-redux`: bindings between React and Redux.
- `react-router-redux`: sync React Router with Redux

Back in the initial discussion of React I mentioned we would cover the concepts of `state` and `context` in this post.  Let's cover `state` now.

#### Component State
In React you can store data that changes over time as component `state`.  Anytime a change is made to your component's `state` the component rerenders and the UI is updated to reflect those changes.  Let's demonstrate how that would work.

We'll add a button to our `Counter` component that will call an `increment` function when clicked.  Both `increment` and the current `count` value will be passed by `CounterContainer` to `Counter` for use/display.

#### Test Driven Development (TDD) - Counter
As mentioned in the last post, we're going to build our components using a TDD approach going forward (for the most part).  Let's start by writing the tests for `Counter` to cover existing functionality as well as our new features.

```javascript
// components/Counter/Counter.spec.js
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Counter from './Counter';

describe('Counter', () => {
  it('renders an h2, Link, button, and div', () => {
    const count = 10;
    const increment = () => {};
    const wrapper = shallow(<Counter count={count} increment={increment} />);

    expect(wrapper.containsAllMatchingElements([
      <h2>Hello from Counter!</h2>,
      <Link to="/">Go Home!</Link>,
      <button>Increment</button>,
      <div>{count}</div>
    ])).to.be.true;
  });
});

```

Our first test is checking if the `Counter` component renders the right elements/components.  Here we're checking that an `h2`, `Link`, `button`, and `div` are rendered.  We're also checking that `props.count` is rendered into the `div`.  `props.increment` will be required so we pass in a "no-op" (no operation) function so that our test doesn't throw an error.

We also want our component to call `props.increment` whenever the button is clicked so let's add one more test to verify that.

```javascript
// components/Counter/Counter.spec.js
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon'; // new import
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Counter from './Counter';

describe('Counter', () => {
  // ...other test

  it('clicking the button calls props.increment', () => {
    const count = 10;
    const increment = sinon.stub();
    const wrapper = shallow(<Counter count={count} increment={increment} />);
    wrapper.find('button').simulate('click');

    expect(increment).to.have.been.calledOnce;
  });
});

```

In this test we're using `sinon` to create a `stub` function for `increment`.  This allows us to check whether or not `increment` was called, how many times, with what values, etc.  After we shallow render `Counter` we simulate a `click` event on the `button`, then check if `increment` was called once.  

> Remember `sinon-chai` from earlier?  If we hadn't included that, we would have had to write our test like this instead `expect(increment.calledOnce).to.be.true`.  This works, it just doesn't read as well.

If you run your tests now, they'll both fail.  Let's create our component and add the necessary features to make those lights go green!

```javascript
// components/Counter/Counter.js
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Counter = (props) => (
  <div>
    <h2>Hello from Counter!</h2>
    <Link to="/">Go Home!</Link>
    <button onClick={props.increment}>Increment</button>
    <div>{props.count}</div>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number,
  increment: PropTypes.func.isRequired
};

export default Counter;

```

This component fulfills our requirements of displaying an `h2`, `Link` to "/", a `button` that calls `props.increment` `onClick`, and displays `props.count` in a `div`.  If you had your tests running in development mode with `npm run test:dev` they should all be passing now!

#### Test Driven Development (TDD) - CounterContainer
Next we want to test our `CounterContainer`.  It should be initialized with `state.count` set to zero, it should have an `increment` function that increases `count` by one every time the function is called, and it should pass both `state.count` and `increment` to `Counter`.

Go ahead and create the test file.

```javascript
// containers/Counter/CounterContainer.spec.js
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import CounterContainer from './CounterContainer';
import Counter from '../../components/Counter/Counter';

describe('CounterContainer', () => {
  it('is initialized with state.count set to zero', () => {
    const wrapper = shallow(<CounterContainer />);
    expect(wrapper.state('count')).to.equal(0);
  });

  it('has an increment function that increases state.count by one when called', () => {
    const wrapper = shallow(<CounterContainer />);
    wrapper.instance().increment();
    expect(wrapper.state('count')).to.equal(1);
  });

  it('passes state.count and increment as props to Counter', () => {
    const wrapper = shallow(<CounterContainer />);
    expect(typeof wrapper.prop('count')).to.equal('number');
    expect(typeof wrapper.prop('increment')).to.equal('function');
    expect(wrapper.type()).to.equal(Counter);
  });
});

```

We have three tests that verify our component requirements we stated a moment ago.  In the first test we call `wrapper.state('count')` to get the initial `state.counter` value and verify it is zero.  

The second test calls `wrapper.instance().increment()`, then we verify that `state.count` is one rather than zero.  

Finally, we test the `props` of `wrapper` to ensure it receives both `count` and `increment`, then we verify that the rendered component is of type `Counter`.

> #### Why did we call `instance` in our second test?
The `wrapper` object is just that, a wrapper *around* our component.  So if we want to access the component itself we first need to call `instance`.

Let's create our component and make our tests pass now!

```javascript
// containers/Counter/CounterContainer.js
import React, { Component } from 'react';
import Counter from '../../components/Counter/Counter';

class CounterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <Counter count={this.state.count} increment={this.increment} />;
  }
}

export default CounterContainer;

```

##### What's going on here?
- `constructor`: called when the class is instantiated to *construct* the instance.  We first call `super` which calls the parent class' constructor (`React.Component`).  Next we set our initial `state` to an object with one key of `count` equal to zero.  Here the `props` object would be any properties passed into `CounterContainer` by the component that rendered it.  The final line in our constructor is binding our `increment` function to our `CounterContainer` component so that when we pass it down to our `Counter` the function can still be called.
- `increment`: calls `setState`, a function inherited from `React.Component` that is used to update our component's `state`.  You **never** want to directly modify `state` with anything like `this.state.count = 10;`, so anytime you need to update `state` you'll want to create a new object or clone the existing one and update that.  React is written under the assumption that existing `state` is never mutated.
- `render`: covered previously.

> The `this` keyword in JavaScript can be confusing, if it is foreign to you I would suggest reading more [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).

#### Spring Cleaning
Start your dev server and open up your browser to "/counter".  First things first - that button looks like shit.  Add a new file "Counter.scss" in components/Counter with the contents below.  Then import the SASS file into "Counter.js" and add the class as shown further down.

```css
$red: #ff1744;

.button {
  background-color: $red;

  /* round corners */
  border-radius: 3px;

  /* remove border */
  border: none;

  /* force button onto next line */
  display: block;

  /* font */
  color: white;
  font-size: 1.2rem;

  /* turn cursor into a hand */
  cursor: pointer;

  /* add space around and inside of button */
  margin: 15px auto;
  padding: 7px 15px;

  /* remove outline when button is focused */
  &:focus {
    outline: none;
  }

  /* lighten background on click */
  &:active {
    background-color: lighten($red, 15%);
  }
}
```

```javascript
// components/Counter/Counter.js
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classes from './Counter.scss';

const Counter = (props) => (
  <div>
    <h2>Hello from Counter!</h2>
    <Link to="/">Go Home!</Link>
    <button className={classes.button} onClick={props.increment}>
      Increment
    </button>
    <div>{props.count}</div>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number,
  increment: PropTypes.func.isRequired
};

export default Counter;

```

Let's make sure our tests are still working after adding our CSS import.  Run `npm test`...and we have an error now of "Unexpected character '#'".  

Remember when we setup Webpack and used several CSS loaders to compile SASS to CSS and enable CSS Modules?  During testing, Webpack isn't doing anything for us so we need to be able to handle our SASS import statements in our JavaScript files.  We can fix that with the `css-modules-require-hook` library which will perform the tasks we need.  

```bash
npm install --save-dev css-modules-require-hook
```

Now update your test/setup.js file as shown below so that our ".scss" files are compiled to CSS and CSS Modules via Node's `require` function.

```javascript
// ...more imports
import hook from 'css-modules-require-hook';
import sass from 'node-sass';

// ...more config...

// compile CSS Modules via require()
hook({
  extensions: ['.scss'],
  preprocessCss: data => sass.renderSync({ data }).css
});

```

If you rerun your tests now, they should all be passing again!

![Dancing Kid](http://i.imgur.com/KnWUMK2.gif)

#### Does the button work? Kind of.
Fire up your server and visit "/counter" again.  Click the button and watch the number go up.  Now click the link to Home then back to Counter and you'll notice that our counter is back at zero.  Shoot, we wanted to keep our hard work.

The reason it reset is that when you navigated to "/" our `CounterContainer` was unmounted which removed it from the DOM and hence any data associated with it was lost.  Then when you went back to "/counter" it was recreated and `state.count` was reinitialized to zero.

There are situations where this is completely appropriate, but there are also situations where you want to persist your application state.  That's where Redux comes in.  Because we're going to be using Redux with React we need to first discuss React `context` which can be thought of as implicit `props`.  

`context` allows you to pass data from a parent component to a descendent, the number of levels deep doesn't matter.  This can be convenient when you don't want to explicitly pass it from component to component through `props` all the way down the chain, but it can also make it more difficult to reason about because of the fact that data is "magically" available.  We'll see `context` in action shortly.

#### Redux + React Redux (react-redux)
Open up your "index.js" file in "src" and make the changes below.  We're not testing our "index.js" file for now since it is difficult to do so and if it wasn't rendering our app that would be very obvious.

```javascript
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { browserHistory, Router } from 'react-router';
import routes from './routes';

const MOUNT_NODE = document.getElementById('root');
const reducer = (state) => state;
const initialState = { count: 10 };
const store = createStore(reducer, initialState);

const App = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
);

render(App, MOUNT_NODE);

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(<AppContainer>{App}</AppContainer>, MOUNT_NODE);
  });
}

```

Here we've added two new imports: `createStore` from `redux` and `Provider` from `react-redux`.  We're then creating a `reducer` that just returns the first argument passed to it, `state`, and an `initialState` object for our `count`.  Next we call `createStore` with our `reducer` and `initialState`.

What we have done is create a Redux `store` with a default state of `initialState` and a `reducer` that just returns our old state.  Later we'll update our `reducer` so it actually does something, but I wanted to start with a simple example to show how the Redux store is used in components.

We've wrapped our `Router` component with `Provider` and passed our store to it as a property.  Remember a little while ago when I talked about React `context`?  That is the mechanism used by `Provider` to pass the `store` down the component hierarchy which enables us to extract data (our `count` value) at any depth we please.  Let's see how we would access our store.

At this point we're going to pause our TDD approach because we're going to be make several changes back to back and it would be a waste of time to keep rewriting our tests.  Feel free to implement the tests necessary to get coverage to 100%.

```javascript
// containers/Counter/CounterContainer.js

// ...dependencies
class CounterContainer extends Component {
  static contextTypes = {
    store: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props);
    this.state = { count: context.store.getState().count };
    this.increment = this.increment.bind(this);

    // delete this after you have a chance to see
    // what context/store look like
    console.log('context', context);
  }

  // increment & render...
}

```

> ##### Console
> There's a "Console" tab in your developer tools where you can output strings, objects, etc. with `console.log` statements in your code

What have we changed?  So we added `contextTypes` with a `store` property that looks just like `propTypes` as we've already seen.  That's because it *is* very similar...we're just defining our `context` instead of our `props`.

In our `constructor` we've added a new argument for `context`.  Then we call `context.store.getState()` which returns the current state from the Redux `store`.  Finally, we're accessing the `count` property on that state.  A little further down we've added a `console.log` statement so that we can inspect the `context` object, specifically the `store` property.

![Redux Store](../../images/redux-store.jpg)

We're concerned with three functions exposed on the `store` object: `dispatch`, `getState`, and `subscribe`.  `dispatch` is how we tell the `store` to update itself, we already discussed `getState`, and `subscribe` is how we listen for changes in the `store`.

If you look at your app you'll notice that `state.count` starts at 10 now because that's the default value in the Redux store.  Click the button a few times and you'll see your number increment as before, then click the link to leave the page and come back again.  We're back to 10...dammit.  We have the same issue as before because our `increment` function is updating the local component `state` rather than the Redux `store`.  

How do we update the Redux store `count` value?  Our `reducer` of course!  Time to make our `reducer` actually do something.  Make the changes shown below.

```javascript
// src/index.js

// ...more stuff
const reducer = (state, action) => {
  if (action.type === 'INCREMENT') {
    return { count: state.count + action.increment };
  }
  return state;
};
// more stuff...
```

We've added a new `action` argument to our `reducer` which will be passed to the `reducer` anytime we `dispatch` an `action`.  If `action.type` equals "INCREMENT" then the `reducer` returns a new object with `count` set to its old value plus `action.increment`, otherwise return the old `state`.

Let's update our `CounterContainer`'s `increment` function to dispatch an "INCREMENT" action instead of updating its local `state`.

```javascript
{
  // ...constructor

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState({ count: this.context.store.getState().count });
    });
  }

  increment() {
    const action = { type: 'INCREMENT', increment: 2 };
    this.context.store.dispatch(action);
  }

  // render...
}
```

Here we've made two changes.  Let's look at `increment` first.  Instead of updating `CounterContainer`'s local `state` with `setState` we're now creating an `action` object with `type` of "INCREMENT" and setting `increment` to 2.  

`componentWillMount` is a component lifecycle hook that allows us to run code at certain times during the component's lifecycle.  In this case `constructor` and `componentWillMount` are essentially identical, but I've separated them for clarity.  Via the `subscribe` method on the `store` object we're able to respond to changes in our Redux store's `state`.  Here we're just updating our *local* `state.count` to the corresponding property in our Redux store when a change occurs.

Fire up your app again if it isn't already running and click the button a few times, then navigate between routes and you should see `count` retain its value.  Awesome!  Increment it again after you switched routes and check the console, we have an error...ugh.

![setState error](../../images/setState-error.jpg)

Why are we getting this and what does it mean?  Well if we read it tells us exactly what the problem is.  We're calling `setState` on an unmounted component which is a no-no.  

How is this happening?  Remember earlier when I said our component is unmounted when we change routes (which is why we were losing our `count` state)?  Well that is still happening, but that listener we added to the Redux store with `subscribe` in our `componentWillMount` hook is still there long after our component unmounts.  So we need to `unsubscribe` from the store before our component unmounts.  How?

```javascript
// containers/Counter/CounterContainer.js

// ...more stuff

componentWillMount() {
  this.unsubscribe = this.context.store.subscribe(() => {
    this.setState({ count: this.context.store.getState().count });
  });
}

componentWillUnmount() {
  this.unsubscribe();
}

// more stuff...
```

When we call `subscribe` it returns an `unsubscribe` object we can call to remove the listener from the store.  Simple as that.  `componentWillUnmount` is, you guessed it, another lifecycle hook.

Now click the button all you want and go back and forth between routes.  No errors!

![Dancing Trevor](http://i.imgur.com/vyPIi9M.gif)

#### React Redux connect
If you're thinking there has to be a better way to go about getting data from the store, you would be correct.  I just wanted to show you how things are implemented manually first.

`react-redux` exposes a `connect` function in addition to the `Provider` component.  Let's see how we can simplify our component using that.

```javascript
// containers/Counter/CounterContainer.js

import React from 'react';
import { connect } from 'react-redux';
import Counter from '../../components/Counter/Counter';

const CounterContainer = (props) => (
  <Counter count={props.count} increment={props.increment} />
);

CounterContainer.propTypes = {
  count: React.PropTypes.number.isRequired,
  increment: React.PropTypes.func.isRequired,
};

const stateToProps = (state) => ({ count: state.count });
const dispatchToProps = {
  increment: () => ({ type: 'INCREMENT', increment: 2 }),
};

export default connect(stateToProps, dispatchToProps)(CounterContainer);

```

We're importing `connect` from `react-redux` and using it at the very bottom.  `connect` is what's known as a [higher order component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.70hzkn6mh) which is a component that wraps another component and augments it with new `props`.  All of the interactions we were doing with `context` are handled for us by `connect` now, we just have to tell `connect` what data we want from the `store` and what actions we want to be able to `dispatch`.  It then maps those pieces of state and action creators to `props` on our component.

`connect` accepts two main arguments `mapStateToProps` and `mapDispatchToProps` (we've abbreviated slightly).  The first is how we access data from the `store` and the `second` is how we `dispatch` actions to the store.  We've created two `props`: `count` and `increment`.  Now when we call `props.increment` it will update the `count` value in Redux, then pass the updated value to our components as `props.count` and we just pass that along to our presentational component for rendering.  Much more elegant.

#### Reorganization
Update/create the files below and then we'll discuss what we've done here.

```javascript
// src/index.js

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './redux/store';
import routes from './routes';

const MOUNT_NODE = document.getElementById('root');
const history = syncHistoryWithStore(browserHistory, store);

const App = (
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
);

render(App, MOUNT_NODE);

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(<AppContainer>{App}</AppContainer>, MOUNT_NODE);
  });
}

```

```javascript
// src/redux/modules/counter/counterModule.js

// Actions
const INCREMENT = 'counter/INCREMENT';

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

```

```javascript
// src/redux/combinedReducer.js

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import counter from './modules/counter/counterModule';

export default combineReducers({
  counter,
  routing: routerReducer,
});

```

```javascript
// src/redux/store.js

import { createStore } from 'redux';
import combinedReducer from './combinedReducer';

export default createStore(combinedReducer);

```

```javascript
// src/containers/Counter/CounterContainer.js

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment } from '../../redux/modules/counter/counterModule';
import Counter from '../../components/Counter/Counter';

export const CounterContainer = (props) => (
  <Counter count={props.count} increment={props.increment} />
);

CounterContainer.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};

export const stateToProps = (state) => ({ count: state.counter.count });
export const dispatchToProps = { increment };

export default connect(stateToProps, dispatchToProps)(CounterContainer);


```

In src/index.js we've moved our `reducer` and `store` into external files and we're now creating a `history` object.  If you remember earlier when we talked about `react-router-redux` we said we needed to sync `react-router` with `redux` which is what we're doing here.  We then pass `history` to our `Router` instead of our raw `browserHistory` object.

Next we've created a new "redux" directory where all of our Redux related code will go to keep things better organized.  

Nested in this folder is another named "modules" which is where we'll keep all of our reducers (we'll combine multiple reducers into a single one we pass to the `store`).  Additionally, we'll keep our action definitions (`INCREMENT`), and our action creators (`increment`), in the same file.  

This approach was suggested by Erik Rasmussen, which he calls [Ducks](https://github.com/erikras/ducks-modular-redux).  The reason we've nested the file in a "counter" directory is so that if the file gets unruly we can split it up into multiple files without changing our imports all over our codebase.  

The action definition is scoped ("counter/INCREMENT") for better clarity when viewing historical actions taken by the user.  You can see in our `reducer` that we're now applying our `initialState` as a default value to the `state` argument (`state = { count: 10 }`).  We also have a new action creator called `increment` that we can import anywhere in our code where we want to increment our counter (in case we wanted to do that in multiple places).

The next new file is src/redux/combinedReducer.js which is where we're combining all of our reducers into a single `reducer`.  You'll notice another import from `react-router-redux` of `routerReducer` which is also necessary to sync `react-router` with `redux`.  One other thing to note is that we're now putting our old reducer on a new `counter` key.  The Redux `combineReducers` function is self-explanatory.

In src/redux/store.js we're just creating our `store` as before using our new, combined `reducer`.

Finally, we make the necessary changes to get `CounterContainer` working again.  We now need to map `state.counter.count` to our `props` instead of `state.count`.  We also import our `increment` action creator from our "counterModule" "duck" rather than defining it locally.  Also, note that we're exporting `CounterContainer`, `stateToProps`, and `dispatchToProps` as well as our `connect`ed component for testing purposes.

#### Test Fixes
We've obviously broken our `CounterContainer` tests and have many other files we need to test as well.  We're just going to fix the `CounterContainer` tests right now, later on I'll add more tests for the other components.

Update your test as shown below.

```javascript
// containers/Counter/CounterContainer.spec.js

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { CounterContainer, dispatchToProps, stateToProps } from './CounterContainer';
import Counter from '../../components/Counter/Counter';

describe('CounterContainer', () => {
  it('passes props.count and props.increment to Counter', () => {
    const count = 5;
    const increment = () => {};
    const wrapper = shallow(<CounterContainer count={count} increment={increment} />);
    expect(wrapper.prop('count')).to.equal(count);
    expect(wrapper.prop('increment')).to.equal(increment);
    expect(wrapper.type()).to.equal(Counter);
  });

  describe('stateToProps', () => {
    it('maps state.counter.count to props.count', () => {
      const state = { counter: { count: 5 } };
      expect(stateToProps(state).count).to.equal(state.counter.count);
    });
  });

  describe('dispatchToProps', () => {
    it('has an increment key of type function', () => {
      expect(typeof dispatchToProps.increment).to.equal('function');
    });
  });
});

```

#### Commit our changes

```bash
git add .
git commit -m 'added Redux...closes #7'
git push origin master
```

[My repo after this commit](https://github.com/bschnelle/react-starter-kit/tree/ca9a677ee902684cbe0bc1d8b11179c8bece8c38)

#### Summary
We've got our Redux store all setup now and ready to hold our application state.  Next we'll look at Immutable.js and the benefits it brings to the table.
