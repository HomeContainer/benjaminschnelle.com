Last time we saw how to setup our testing environment and couple different ways to organize our tests.  This time we'll get into our state management with Redux.

## 9. Redux
React has got our UI covered, but what about application [state](http://stackoverflow.com/a/8102731/2482993)?  How should we manage that?  [Redux](http://redux.js.org/)!

Redux is a simplified implementation of the [Flux](http://facebook.github.io/flux/) application pattern created/used by Facebook.  Flux and Redux take a different approach than more traditional design patterns like MVC ([client MVC](http://stackoverflow.com/questions/33447710/mvc-vs-flux-bidirectional-vs-unidirectional)).

Many client frameworks like Ember and Angular 1 implement two-way data binding which means if you have, for example, a `Person` model with a `firstName` property that has been wired up to an `input` and you change the value of the `input` the `firstName` property of the `Person` is updated to that new value.  Similarly, if you were to update the `firstName` property on the model directly using JavaScript your `input` would reflect the new value as well, hence two-way.  This type of binding can be convenient and results in less boilerplate code, but there are also performance implications in complex applications and it can make reasoning about your app more difficult.

Redux takes a different approach (borrowing from Flux concepts) which makes it easier to reason about.  In Redux all state is maintained by a central `store` and your application can `subscribe` to changes so that anytime your state is changed in the `store` your application is notified and can respond accordingly.  So how do you actually change the data in the `store`?  You `dispatch` an `action` via the `store` which updates the state using a `reducer` which is a *pure* function (a function that doesn't have side effects...if you call it with the same arguments over and over it will always return the same value) that takes the old state + your `action` and returns the next state.  All data flow is one-way, meaning those changes you made to that `input` wouldn't update our `Person` unless you explicitly dispatch an `action` to do so.  

We'll see how this all works below in the context of React, **BUT** you do not *have* to use Redux with React.  It can be used entirely on its own, with any other view library, or you can write your own views using raw HTML and JavaScript.

Let's install the libraries we'll need.

```bash
npm install --save redux react-redux react-router-redux
```

##### What are those?
- `redux`: self-explanatory
- `react-redux`: bindings between React and Redux...remember how I said you need to `subscribe` to state changes in order to respond to them?  Well, this library provides an easy mechanism to do that for React components.  Via a `connect` function provided by `react-redux` you're able to bind Redux state and/or Redux action creators to component `props` (explained shortly).
- `react-router-redux`: remember our router from before? It keeps track of when we navigate around our app (such as going from "/" to "/blog") which is just part of our application state.  Since we're using Redux to manage all of our application state it would probably be smart to keep the two in sync, right?  This is especially helpful using a feature of Redux called "time-travel" which allows you to undo `actions` and essentially go back in time (we'll see this a little later).  If your `action` changed your route from "/" to "/blog" and you want to undo it `react-router` needs to know about it.  This library, `react-router-redux`, provides that for us.

Back in the initial discussion of React I mentioned we would cover the concepts of `state` and `context` in this post.  Let's do that now.  I've now mentioned `state` twice in two different contexts (not to be confused with React `context`)!

#### Component State
In React you can store data that changes over time as component `state`.  Anytime a change is made to your component's `state` the component rerenders and the UI is updated to reflect those changes.  Let's demonstrate how that would work.

We're going to create a new "Counter" route with corresponding container and presentational components.  In these component we'll add a button that can be clicked to increment a counter as well as a link to go from our "Counter" route back to our "Home" route.  The counter will be maintained by the container component and the current counter value will be passed to the presentational component for display.  

#### Test Driven Development (TDD) - Counter
As mentioned in the last post, we're going to build our components using a TDD approach going forward.  Let's start by writing the tests for our "Counter" presentational component.

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

Our first test is checking if the `Counter` component render the right elements/components.  Here we're checking that an `h2`, `Link`, `button`, and `div`.  We're also checking that `props.count` is rendering into the `div`.  We pass the `increment` function to `Counter` because we want that property to be required and if we didn't pass anything our test would throw an error due to a missing required property (after we create our component).

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

If you run your tests now, they'll both fail.  Let's create our component and add the necessary features to get make those lights go green!  Create the component as shown here.

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

Gnarly, let's add our tests now.  Also, note that we are now nesting our containers under a directory ("Counter" in this case) since they will have a sibling ".spec.js" file.

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

We have three tests that verify our component requirements we stated a moment ago.  In the first test we call `wrapper.state('count')` to get the initial value and verify it is zero.  The second test calls `wrapper.instance().increment()`, then we verify that `state.count` is one rather than zero.  Finally, we test the `props` of `wrapper` to ensure it receive both `count` and `increment` then we verify that the rendered component is of type `Counter`.

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
- `increment`: calls `setState`, a function inherited from `React.Component` that is used to update our component's `state`.  You **never** want to directly modify `state` with anything like `this.state.count = 10;`, so anytime you need to update `state` you'll want to create a new object or clone the existing one and update that.  React is written under the assumption that existing `state` is never modified.
- `render`: covered previously.

> The `this` keyword in JavaScript can be confusing, if it is foreign to you I would suggest reading more [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this).

#### Running our App
Start your dev server and open up your browser to localhost:8080/counter - you should see a pretty ugly page with a header, link, butt, and a number.  If you click the button the number goes up by one.  Neat!

Now click the "Go Home!" link...shoot, now we're stuck on our Home route.  Let's fix that and do a little spring cleaning at the same time.  First let's get rid of our Blog route and components.  In "index.js" delete the `BlogContainer` import line and the "/blog" `Route`.

Next, move containers/HomeContainer.js into containers/Home/HomeContainer.js.  Finally, update the files shown below.

```javascript
// components/Home/Home.js
import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <div>Hello from Home!</div>
    <Link to="/counter">Go to Counter!</Link>
  </div>
);

export default Home;

```

```javascript
// containers/Home/HomeContainer.js
import React from 'react';
import Home from '../../components/Home/Home';

const HomeContainer = () => (
  <Home />
);

export default HomeContainer;

```

```javascript
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import { browserHistory, Route, Router } from 'react-router';
import HomeContainer from './containers/Home/HomeContainer';
import CounterContainer from './containers/Counter/CounterContainer';

const MOUNT_NODE = document.getElementById('root');
const App = (
  <Router history={browserHistory}>
    <Route path="/" component={HomeContainer} />
    <Route path="/counter" component={CounterContainer} />
  </Router>
);

render(App, MOUNT_NODE);

if (module.hot) {
  module.hot.accept('./containers/Home/HomeContainer', () => {
    render(<AppContainer>{App}</AppContainer>, MOUNT_NODE);
  });
}

```



Our number went back to zero.  Shoot, we wanted to keep our hard work.  The reason it reset is that when you navigated to "/blog" our `AppContainer` was `unmounted` which removed it from the DOM and hence any data associated with it was lost.  Then when you went back to "/" it was recreated and the `counter` was reinitialized to zero.

There are situations where this is completely appropriate, but there are also situations where you want to persist your application state.  That's where Redux comes in.  Because we're going to be using Redux with React we need to first discuss `context` which can be thought of as implicit `props`.  It allows you to pass data from a parent component to a descendent, the number of levels deep doesn't matter.  This can be convenient when you don't want to explicitly pass it from component to component through `props` all the way down the chain, but it can also make it more difficult to reason about because of the fact that data is "magically" available.  We'll see `context` in action shortly.

#### Redux + React Redux (react-redux)
Open up your "index.jsx" file in "src" and make the changes below.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import App from './containers/App';
import Blog from './containers/Blog';

const reducer = (state) => state;
const initialState = { counter: 10 };
const store = createStore(reducer, initialState);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="/blog" component={Blog} />
    </Router>
  </Provider>
), document.getElementById('root'));

```

Here we've added two new imports: `createStore` from `redux` and `Provider` from `react-redux`.  We're then creating a `reducer` that just returns the first argument passed to it and an `initialState` object for our `counter`.  Next we call `createStore` with our `reducer` and `initialState`.  What we have done is create a Redux store with a default state of `initialState` and a `reducer` that just returns our old state.  Later we'll update our `reducer` so it actually does something, but I wanted to start with a simple example to show how the Redux store is used in components.

Below we've wrapped our `Router` component with `Provider` and passed our store to it as a property.  Remember a little while ago when I talked about React `context`?  `context` is exactly how `Provider` passes the `store` down the component hierarchy enabling us to extract data (our `counter` value) at any depth we please.  Let's see how we would access our store.

```javascript
// containers/App.jsx

// ...dependencies
export default class AppContainer extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props);
    this.state = { counter: context.store.getState().counter };
    this.increment = this.increment.bind(this);

    // delete this after you have a chance to see what context/store look like
    console.log('context', context);
  }

  // increment & render...
}

```

What have we changed?  So we added a `contextTypes` with a `store` property that looks just like `propTypes` on our presentational component.  That's because it *is* very similar...we're just defining our `context` instead of our `props`.  In our `constructor` we've added a new argument for `context` on which we're then calling `store.getState()` which returns the current state from the Redux `store`.  Finally, we're accessing the `counter` property on that state.  A little further down we've added a `console.log` statement so that we can inspect the `context` object, specifically the `store` property.  If you view it in your Chrome developer tools you should see an object that looks like the one below.  

![Redux Store](../../images/redux-store.jpg)

We're concerned with three functions exposed on the `store` object: `dispatch`, `getState`, and `subscribe`.  `dispatch` is how we tell the `store` to update the state, we already discussed `getState`, and `subscribe` is how we listen for changes in the `store`.

If you look at our app now you'll notice that our `counter` starts at 10 because that's the default value in our Redux store.  Click the button a few times and you'll see your number increment as before, then click the link to leave the page and come back again.  We're back to 10...dammit.  We have the same issue as before because our `increment` function is updating the local component `state` rather than the Redux `store`.  

How do we update the Redux store `counter`?  Our `reducer` of course!  Time to make our `reducer` actually do something.  Update it in "index.jsx" as shown below.

```javascript
{
  const reducer = (state, action) => {
    if (action.type === 'INCREMENT') {
      return { counter: state.counter + action.increment };
    }
    return state;
  };
}
```

We've added a new `action` argument to our `reducer` which the function will receive anytime we call `dispatch` with an `action` object as you'll see momentarily.  If `action.type` equals "INCREMENT" then return a new object with `counter` set to its old value plus `action.increment`, otherwise return the old `state`.

Let's update our `AppContainer`'s `increment` function to dispatch an "INCREMENT" action instead of updating its local `state`.

```javascript
{
  // ...constructor

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState({ counter: this.context.store.getState().counter });
    });
  }

  increment() {
    const action = { type: 'INCREMENT', increment: 2 };
    this.context.store.dispatch(action);
  }

  // render...
}
```

Here we've made two changes.  Let's look at `increment` first.  Instead of updating `AppContainer`'s local `state` with `setState` we're now creating an `action` of `type` "INCREMENT" and setting `increment` to 2.  `componentWillMount` is a component lifecycle hook that allows us to run code at certain times during the component's lifecycle.  In this case `constructor` and `componentWillMount` are essentially identical, but I've separated them for clarity here.  Via the `subscribe` method on the `store` object we're able to respond to changes to our Redux store's `state`.  Here we're just updating our *local* `state.counter` to the corresponding property in our Redux store anytime the store is updated.

Fire up your app again if it isn't already running and increment our counter, then navigate between routes, and you should see it retain its value.  Awesome!  Increment it again after you switched routes and check the console, we have an error...shit.

![setState error](../../images/setState-error.jpg)

Why are we getting this and what does it mean?  Well if we read it tells us exactly what the problem is.  We're calling `setState` on an unmounted component which is a no-no.  How is this happening?  Remember earlier when I said our component is unmounted when we change routes (which is why we were losing our `counter` state)?  Well that is still happening, but that listener we added to the Redux store with `subscribe` in our `componentWillMount` hook is still there long after our component unmounts.  So we need to `unsubscribe` from the store before our component unmounts.  How?

```javascript
// ...more stuff

componentWillMount() {
  this.unsubscribe = this.context.store.subscribe(() => {
    this.setState({ counter: this.context.store.getState().counter });
  });
}

componentWillUnmount() {
  this.unsubscribe();
}

// more stuff...
```

When we call `subscribe` it returns an `unsubscribe` object we can call to remove the listener from the store.  Simple as that.  `componentWillUnmount` is, you guessed it, another lifecycle hook.

Now increment all you want and click back and forth between routes.  No errors!

#### React Redux connect
If you're thinking there has to be a better way to go about getting data from the store, you would be correct.  I just wanted to show you how things are implemented manually first.

`react-redux` exposes a `connect` function in addition to the `Provider` component.  Let's see how we can simplify our component using that.

```javascript
// containers/App.jsx

import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

class AppContainer extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    increment: React.PropTypes.func.isRequired,
  }

  render() {
    const linkMessage = 'Go to Blog!';
    return (
      <App
        counter={this.props.counter}
        increment={this.props.increment}
        linkMessage={linkMessage}
      />
    );
  }
}

const stateToProps = (state) => ({ counter: state.counter });
const dispatchToProps = {
  increment: () => ({ type: 'INCREMENT', increment: 2 }),
};
export default connect(stateToProps, dispatchToProps)(AppContainer);

```

We're importing `connect` from `react-redux` and using it at the very bottom.  `connect` is what's known as a [higher order component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.70hzkn6mh) which is a component that wraps another component and augments it with new `props`.  All of the interactions we were doing with `context` are handled by `connect` for us now, we just have to tell `connect` what data we want from the `store` and what actions we want to be able to `dispatch`.  It then maps those pieces of state and action creators to `props` on our component.  

`connect` accepts two main arguments `mapStateToProps` and `mapDispatchToProps` (we've abbreviated slightly).  The first is how we access data from the `store` and the `second` is how we `dispatch` actions to the store.  We've created two `props`: `counter` and `increment`.  Now when we call `this.props.increment` it will update the `counter` property in Redux, then pass the updated value to our components as `this.props.counter` and we just pass that along to our presentational component for rendering.  Much more elegant.

#### Misc
Update/create the files below and then we'll discuss what we've done here.

```javascript
// src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Route, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './redux/store';
import App from './containers/App';
import Blog from './containers/Blog';

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/blog" component={Blog} />
    </Router>
  </Provider>
), document.getElementById('root'));

```

```javascript
// src/redux/modules/home/index.js

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

```

```javascript
// src/redux/reducer.js

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home from './modules/home';

export default combineReducers({
  home,
  routing: routerReducer,
});

```

```javascript
// src/redux/store.js

import { createStore } from 'redux';
import reducer from './reducer';

export default createStore(reducer);

```

```javascript
// src/containers/App.jsx

import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../redux/modules/home';
import App from '../components/App';

class AppContainer extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    increment: React.PropTypes.func.isRequired,
  }

  render() {
    const linkMessage = 'Go to Blog!';
    return (
      <App
        counter={this.props.counter}
        increment={this.props.increment}
        linkMessage={linkMessage}
      />
    );
  }
}

const stateToProps = (state) => ({ counter: state.home.counter });
const dispatchToProps = { increment };

export default connect(stateToProps, dispatchToProps)(AppContainer);

```

In src/index.jsx we've moved our `reducer` and `store` into external files and we're now creating a `history` object.  If you remember earlier when we talked about `react-router-redux` we said we needed to sync `react-router` with `redux` which is what we're doing here.  We then pass `history` to our `Router` instead of our raw `browserHistory` object.

Next we've created a new "redux" directory.  We'll put all of our Redux related code in here to keep things better organized.  

Nested in this folder is another named "modules" which is where we'll keep all of our reducers (we'll combine multiple reducers into a single one we pass to the `store`).  Additionally, we'll keep our action definitions (`INCREMENT`), and our action creators (`increment`), in the same directory.  This approach was suggested by Erik Rasmussen, which he calls [Ducks](https://github.com/erikras/ducks-modular-redux).  The reason we've nested the file in a directory ("home") is so that if the file gets unruly we can split it up into multiple files without changing our imports all over our codebase.  The action definition is scoped so that we don't run into conflicts with our action dispatching libraries.  You can also see in our `reducer` that we're now applying our `initialState` as a default value to the `state` argument (`state = { counter: 10 }`).  We also have a new action creator called `increment` that we can import anywhere in our code where we want to increment our counter (in case we wanted to do that in multiple places).

The next new file is src/redux/reducer.js which is where we'll be combining all of our reducers into a single `reducer`.  You'll notice another import from `react-router-redux` of `routerReducer` which is also necessary to sync `react-router` with `redux`.  One other thing to note is that we're now putting our old reducer on a new `home` key.  The Redux `combineReducers` function is self-explanatory.

In src/redux/store.js we're just creating our `store` as before using our new, combined `reducer`.

Finally, we make the necessary changes to get `AppContainer` working again.  We now need to map `state.home.counter` to our `props` instead of `state.counter`.  We also import our `increment` action creator from our "home" "Duck" rather than defining it locally.

...Well that took longer than I anticipated.

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added Redux...closes #7'
git push origin master
```

#### Summary
We've got our Redux store all setup now and ready to hold our application state.  Next we'll look at Immutable.js and the benefits it brings to the table.
