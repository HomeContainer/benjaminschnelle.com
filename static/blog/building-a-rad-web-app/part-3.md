# 6. React, Redux, and Immutable.js

### As a reminder, here are the steps we're following (starting with #6 here)
1. Create our project
2. Add version control with Git and use Github as our repo host
3. Initialize Node Package Manager (NPM)
4. Setup ESLint
5. Configure Webpack
6. React, Redux, and Immutable.js
7. Add our testing framework
8. Use test driven development (TDD) to build the app (to be expanded)
9. Setup continuous integration/continuous delivery with Codeship

Per the React site, React makes it painless to create interactive UIs.  That is no understatement.  React is all *component* (you can think of them as widgets of functionality) based meaning you break your UI into separate components and *compose* your UI from those components.  I highly recommend reading [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) by [Pete Hunt](https://twitter.com/floydophone) for a quick overview of using React.

Go ahead and install React and React DOM (React package for working with the DOM).

```bash
npm install --save react react-dom
```

Change the file extension of src/index.js to ".jsx" and replace the contents with the code below.  If you prefer you can continue to use the original ".js" file extension, but you'll need to modify your ESLint rules because the Airbnb presets we're using dictate use of ".jsx".

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import classes from './classes.scss';

class Test extends React.Component {
  render() {
    return <div className={classes.title}>Hey dude!</div>;
  }
}

ReactDOM.render(<Test />, document.getElementById('root'));

```

Assuming you updated the file extension you'll also need to make two changes to your "webpack.config.js" file.

```javascript
module.exports = {
  // more config...

  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
      './src/index.jsx', // update file extension
    ],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/, // update to match .js and .jsx
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('css?modules&sourceMap!sass'),
      },
    ],
  },

  // more config...
};
```

That weird looking syntax in "index.js" is JSX, it's just JavaScript in disguise.  You can read more [here](https://facebook.github.io/react/docs/jsx-in-depth.html) where they give before and after code examples.

You'll notice that ESLint is now throwing a fit about preferring pure functions (we'll fix it a little later when we get to Immutable.js).  In React you can create your components a few different ways, if you read through [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) you would have seen components written by calling `createClass` (as of this writing anyway).  

```javascript
var ProductCategoryRow = React.createClass({})
```

The second way you can create components is using [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

```javascript
class ProductCategoryRow extends React.Component {}
```

Finally, you can create *functional stateless components* (FSC).  There are certain limitations to this approach, but they're also simpler and Facebook has [stated](https://github.com/facebook/react/issues/5677) that they're planning future optimizations for components written in this way.  FSCs cannot use component lifecycle hooks or internal state (hence, stateless).  I'll demonstrate how some of the lifecycle hooks work shortly so you can make an informed decision when choosing how to implement components in your own app.  They're just implemented as a regular JavaScript function.

```javascript
function ProductCategoryRow(props) {}
```

We won't be using the first convention at all.

When we replaced the contents of "index.jsx" we broke our HMR live updates.  Let's fix that.  Rather than implementing it ourselves we'll use Dan Abramov's react-hot-loader library.

```bash
npm install --save-dev react-hot-loader
```

Update the `loaders` property of "webpack.config.js" as shown below.

```javascript
// more config
loaders: [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'react-hot!babel', // updated
  },
  {
    test: /\.(css|scss)$/,
    loader: ExtractTextPlugin.extract('css?modules&sourceMap!sass'),
  },
]
// more config
```
