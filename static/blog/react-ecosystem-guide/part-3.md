# In Depth Beginner's Guide to the React Ecosystem - Part 3

# 6. React, Redux, and Immutable.js

Per the React site, React makes it painless to create interactive UIs.  That is no understatement.  React is all *component* (you can think of them as widgets of functionality) based meaning you break your UI into separate components and *compose* your UI from those components.  I highly recommend reading [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) by [Pete Hunt](https://twitter.com/floydophone) for a quick overview of using React.

Go ahead and install React and related packages., React DOM (React package for working with the DOM).

```bash
npm install --save react react-dom
npm install --save-dev react-hot-loader
```

#### What did we just install?
- react: React.js
- react-dom: React package for working with the DOM
- react-hot-loader: this is going to handle HMR for us so that we don't have to write our own `module.hot` code anymore

Change the file extension of src/index.js to ".jsx" and replace the contents with the code below.  If you prefer you can continue to use the original ".js" file extension, but you'll need to modify your ESLint rules because the Airbnb presets we're using dictate use of ".jsx".

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));

```

Assuming you updated the file extension you'll also need to make four changes to your "webpack.config.js" file.

```javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devServer: {
    hot: true,
  },

  devtool: 'source-map',

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
        test: /\.(js|jsx)$/, // match .js and .jsx files
        exclude: /node_modules/,
        loader: 'react-hot!babel', // add react-hot-loader
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('css?modules&sourceMap!sass'),
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),

    // new webpack.optimize.UglifyJsPlugin(),
  ],

  // new section...this is necessary so that we can import .jsx
  // files without explicitly providing their extensions...the
  // empty string is required by Webpack in order to resolve imports
  // where we DO provide the file extension
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
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

#### Back to our application
We got off on a tangent for a little bit there.  If you looked closely at the code we put in our "index.jsx" file, we're importing `App` from a sibling folder named "containers".  There's a useful philosophy in the React community of splitting up your components into two groups: containers and presentational components (smart and dumb).  Basically, container components implement business logic (connect to Redux store...we'll get to this in detail later on) and presentational components are only concerned with rendering the UI.  Dan Abramov has a good [post](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.f4mqb6y14) on the concepts.

Go ahead and create two new folders under "src" named "containers" and "components" where we'll put our two types of components.  You can then create "App.jsx" in the "containers" folder and paste in the code below.
