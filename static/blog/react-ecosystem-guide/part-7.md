# In Depth Beginner's Guide to the React Ecosystem - Part 7

## 10. Immutable.js
If you remember from the last post, I mentioned that with Redux best practice is to never modify existing state, but to always return a new object.  Redux is written under the assumption that the `state` object passed to your `reducer` will never be modified (it is immutable) so if you do modify it you'll likely break something.

Because of this and the fact that immutable data is easier to reason about, introducing a library like Immutable.js is a good idea.  If you haven't surmised what Immutable.js actually is, let me tell you: it's a library of immutable objects!  Some of the syntax can be a little verbose, but the benefits are quite nice once you get into the swing of using it.

```bash
npm install --save immutable
```

```javascript
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

The benefits become even more apparent when you're mutating deeply nested data as well.

For now, we just want to make Immutable.js available in our project because we'll use it in the future once we begin using Redux more heavily.

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added Immutable.js...closes #9'
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
    new webpack.DefinePlugin({ __DEV__: !isProduction }), // new

    new ExtractTextPlugin('styles-[contenthash].css'),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],

  // more config...
}

```

```javascript
// src/redux/store.js

import { createStore } from 'redux';
import reducer from './reducer';

let devTools;
if (__DEV__) {
  devTools = window.devToolsExtension && window.devToolsExtension();
}

export default createStore(reducer, devTools);

```

```javascript
// .eslintrc

{
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "extends" : "airbnb",
  "globals": {
    "__DEV__": true, // ignore this global variable
  },
  "rules": {
    // remove after upgrading to react-hot-loader 3
    "react/prefer-stateless-function": 0,
  }
}
```

We're creating a global variable `__DEV__` that Webpack will evaluate at runtime and replace with `true` or `false` in our bundle.  In src/redux/store.js we enable Redux DevTools if we're currently in our development environment.  Finally, we don't want ESLint throwing an undefined variable error so we update our .eslintrc file.

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added React Developer Tools and Redux DevTools...closes #9'
git push origin master
```

#### Summary
We're all done with our environment setup!  Now we can finally start building our actual app!  Head to the next part to see how.
