# In Depth Beginner's Guide to the React Ecosystem - Part 3

## 6. Configure Webpack for production
Now that we have Webpack mostly configured for development let's go ahead and get started with our production build setup.  Later on we'll worry about deployment.

If you're new to development you generally add certain features or fixes during development, then when you're ready to release them to users (production) you apply optimizations to make the user's experience as good as possible.  This includes minifying/uglifying our code (as we saw in the last part) among others.

Update your "webpack.config.js" file again as shown below.

```javascript
// ...dependencies, host, and port

// environment flag used below
const isProduction = process.env.NODE_ENV === 'production';

// new variable that will be exported further down
const webpackConfig = {
  devServer: {
    contentBase: './dist',
    host,
    hot: !isProduction, // set to true if NOT in production
    port,
  },

  devtool: 'source-map',

  entry: {
    app: [
      './src/index.js',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.(css|scss)$/,
        // here we've just broken our loaders into individual
        // lines rather than concatenating them with "!"...
        // we've also conditionally added the "minimize" param
        // to css-loader using an ES6 template string during our
        // production build to reduce the size of our CSS file
        loader: ExtractTextPlugin.extract([
          `css?modules&sourceMap&importLoaders=1${isProduction ? '&minimize' : ''}`,
          'postcss',
          'sass',
        ]),
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
  },

  plugins: [
    new ExtractTextPlugin('styles-[contenthash].css'),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
    }),
  ],

  postcss: [autoprefixer],
};

// new section to apply config based on our environment (dev or prod)
if (isProduction) {
  // add optimizations
  webpackConfig.plugins.push(
    new webpack.optimize.DedupePlugin(), // remove duplicate code
    new webpack.optimize.OccurrenceOrderPlugin(), // webpack optimization
    new webpack.optimize.UglifyJsPlugin({
      comments: false, // remove comments
      compress: {
        warnings: false, // disable command line warnings
      },
    }),
    // create global constants at compile time...
    // this enables the minification step to remove
    // entire environment specific code blocks
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })
  );
} else {
  // add HMR
  webpackConfig.entry.app.unshift(
    `webpack-dev-server/client?http://${host}:${port}/`,
    'webpack/hot/only-dev-server'
  );
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

// export our config variable
module.exports = webpackConfig;

```

For our build script we're going to install the `rimraf` library which will make it easy for use to delete the contents of our "dist" folder before we rebuild our application each time.

```bash
npm install --save rimraf
```

Now let's add a script to our "package.json" file to do our builds.  Add `"build": "rimraf dist && NODE_ENV=production webpack",` to the top of the `scripts` section.  Now this can be executed with `npm run build`, notice you must include the keyword `run`.  Why?  Well the reason you *didn't* have to use it with `npm start` is because `start` is a default NPM script.  Any custom scripts need the `run` keyword.  If it's easier for you to just always use the keyword you can do that as well (i.e. `npm run start`).

So what is our build script doing?  First it runs `rimraf dist` which cleans out the "dist" folder, then it runs `NODE_ENV=production webpack` (you can run multiple command by joining them with `&&`) which sets our `NODE_ENV` variable to "production" which is how we tell our app we're in production mode.  `NODE_ENV` is a ubiquitous environment variable in the Node ecosystem that is used for all sorts of things.

If you run the `build` script now and inspect the contents of the "dist" folder you'll see everything has been nicely minimized for optimal distribution to our users!  Great!

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added Webpack production config...closes #4'
git push origin master
```

## 7. React, Redux, and Immutable.js

Go ahead and delete the "setHTML.js" and "classes.scss" files as we're done with them.  Also, delete `<input type="text" />` from "index.html".

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
