In the last part we looked add Redux and added it to our project.  It was a pretty intense read, but this one is much short.

## 10. Immutable.js
If you remember from the last post, I mentioned that with Redux best practice is to never modify existing state, but to always return a new object.  Redux is written under the assumption that the `state` object passed to your `reducer` will never be mutated (it is immutable) so if you do modify it you'll likely break something.

Because of this and the fact that immutable data is easier to reason about introducing a library like Immutable.js is a good idea.  If you haven't surmised what Immutable.js actually is, let me tell you: it's a library of immutable objects!  Some of the syntax can be a little verbose, but the benefits are quite nice once you get accustomed to using it.

```bash
npm install --save immutable
```

```javascript
// Regular JS vs. Immutable.js (just an example)

// plain JS
// --------------------------------------
const person = {
  name: 'Rick',
  age: '45'
}
// create shallow copy of person
const newPerson = Object.assign({}, person);
// update and return new state
newPerson.name = 'Bobby';
return newPerson;

// Immutable.js
// --------------------------------------
import { Map as iMap } from 'immutable';
const person = iMap({
  name: 'Rick',
  age: '45'
})
// update and return new state
return person.set('name', 'Bobby');

```

The benefits become even more apparent when you're mutating deeply nested data.

For now, we just want to make Immutable.js available in our project because we'll use it in the future when we use our starter kit to build an app.

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added Immutable.js...closes #8'
git push origin master
```

## 11. Misc development tools
There are two great development tools that can be installed as Chrome addons: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).

React Developer Tools should work out of the box after you install and enable them.  Redux DevTools need a small kickstart from our application though.  We need to make small changes to three files.  

```javascript
// webpack.config.js

// ...else block at very bottom of file
{
  // ...more config

  plugins: [
    new webpack.DefinePlugin({ __DEV__: !config.production }), // new

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ]

  // more config...
}

```

```javascript
// src/redux/store.js

import { createStore } from 'redux';
import combinedReducer from './combinedReducer';

let devTools;
if (__DEV__) {
  devTools = window.devToolsExtension && window.devToolsExtension();
}

export default createStore(combinedReducer, devTools);

```

```javascript
// .eslintrc

{
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "mocha": true // remove when eslint adds glob matching
  },
  "extends" : "airbnb",
  "globals": {
    "__DEV__": true // ignore this global variable
  },
  "rules": {
    "comma-dangle": 0,
    "no-unused-expressions": 0, // remove when eslint adds glob matching
    "react/jsx-filename-extension": 0
  }
}
```

We're creating a global variable `__DEV__` that Webpack will evaluate at runtime and replace with `true` or `false` in our bundle.  In src/redux/store.js we enable Redux DevTools if we're currently in our development environment.  Finally, we don't want ESLint throwing an undefined variable error so we update our .eslintrc file.

If you restart your server and open your Chrome DevTools you should have two new tabs: "React" and "Redux".  On the React tab you can explore your application from a React component perspective.  The Redux tab allows you to view your store at any point in time and also undo actions.  If you click the "Increment" button a few times you should see actions appear and your counter increment.  If you then click the "skip" button on the last action in the Redux tab you'll see the counter decrement back to its value before that action.  Awesome!

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added React Developer Tools and Redux DevTools...closes #9'
git push origin master
```

Since that was the last issue of our milestone, we can confidently close it as well.  Hop over to GitHub, navigate to your milestone, and close that old thing.

#### Summary
That's it!  We now have a functional starter kit with a lot of great tools to make building apps a pleasure!  Thanks for reading and stay tuned for the next post where we'll get started on our first app (this site you're reading this from).
