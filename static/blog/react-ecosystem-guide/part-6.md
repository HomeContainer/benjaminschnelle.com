# In Depth Beginner's Guide to the React Ecosystem - Part 6

## 9. Redux and Immutable.js
React has got our UI covered, but what about application state?  How should we manage that?  [Redux](http://redux.js.org/)!

Redux is an simplified implementation of [flux](http://facebook.github.io/flux/), application pattern created/used by Facebook.  Flux and Redux take approach than more traditional design patterns like MVC ([client MVC](http://stackoverflow.com/questions/33447710/mvc-vs-flux-bidirectional-vs-unidirectional)).  Many client frameworks like Ember and Angular 1 implemented two-way data binding which means if you have (for example) a `Person` model with a `firstName` property that has been wired up to an `input` and you change the value of the `input` the `firstName` property of the `Person` is updated to that new value.  Similarly, if you were to update the `firstName` property on the model directly using JavaScript your `input` would reflect the new value as well, hence two-way.  This binding can be convenient and results in less boilerplate code, but there are also performance implications in complex applications and it can make reasoning about your app more difficult.

Redux takes a different approach (borrowing from Flux concepts) which makes it easier to reason about.  In Redux all state is maintained by a central `store` and your application can `subscribe` to changes so that anytime your state is changed in the `store` your application is notified and can respond accordingly.  So how do you actually change the data in the `store`?  You `dispatch` an `action` via the `store` which updates the state via a `reducer` which is a *pure* function that takes the old state + your `action` and returns the next state.  All data flow is one-way, meaning those changes you made to that `input` wouldn't update our `Person` unless you explicitly dispatch an `action` to do so.  We'll see how this all works below in the context of React, **BUT** you do **NOT** have to use Redux with React.  It can be used entirely on its own or with any other view library or you can write your own views using raw HTML and JavaScript.

Let's install the libraries we'll need.

```bash
npm install --save redux react-redux react-router-redux
```

#### What are those?
- `redux`: self-explanatory
- `react-redux`: bindings between React and Redux...remember how I said you need to `subscribe` to state changes in order to respond to them?  Well, this library provides an easy mechanism to do that.  Via a `connect` function provided by `react-redux` you're able to bind our Redux state and/or Redux action creators to component `props`.
- `react-router-redux`: remember our router from before? It keeps track of when we navigate around our app (such as going from "/" to "/blog") which is just more of our application state.  Since we're using Redux to manage all of our application state it would probably be smart to keep the two in sync, right?  This is especially helpful using a feature of Redux called "time-travel" which allows you to undo `actions` and essentially go back in time.  If your `action` changed your route from "/" to "/blog" and you want to undo it `react-router` needs to know about it.  This library, `react-router-redux`, provides that for us.
