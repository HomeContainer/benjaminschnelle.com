# In Depth Beginner's Guide to the React Ecosystem - Part 4

## 7. React and React Router
// TODO add discussion of `props` and `state`

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

Go ahead and delete the "setHTML.js" and "classes.scss" files as we're done with them.  Also, delete `<input type="text" />` from "index.html".

Change the file extension of src/index.js to ".jsx" and replace the contents with the code below.  If you prefer you can continue to use the original ".js" file extension, but you'll need to modify your ESLint rules because the Airbnb presets we're using dictate use of ".jsx".

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));

```

Assuming you updated the file extension you'll also need to make four changes to your "webpack.config.js" file.

```javascript
// ...dependencies

const webpackConfig = {
  devServer: {
    contentBase: './dist',
    host,
    hot: !isProduction,
    port,
  },

  devtool: 'source-map',

  entry: {
    app: [
      './src/index.jsx', // update file extension
    ],
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/, // match .js and .jsx files
        exclude: /node_modules/,
        loader: isProduction ? 'babel' : 'react-hot!babel', // add react-hot-loader
      },
      {
        test: /\.(css|scss)$/,
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

  // new section...this is necessary so that we can import .jsx
  // files without explicitly providing their extensions...the
  // empty string is required by Webpack in order to resolve imports
  // where we DO provide the file extension
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

// more config....

```

That weird looking syntax in "index.js" is JSX, it's just JavaScript in disguise.  You can read more [here](https://facebook.github.io/react/docs/jsx-in-depth.html) where they give before and after code examples.

If you looked closely at the code we put in our "index.jsx" file, we're importing `App` from a sibling folder named "containers".  There's a useful philosophy in the React community of splitting up your components into two groups: containers and presentational components (smart and dumb).  Basically, container components implement business logic (connect to Redux store...we'll get to this in detail later on) and presentational components are only concerned with rendering the UI.  Dan Abramov has a good [post](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.f4mqb6y14) on the concepts.

Create two new folders under "src" named "containers" and "components" where we'll put our two types of components.  You can then create "App.jsx" in the "containers" folder and paste in the code below.  We'll follow a convention of appending "Container" to our container names to avoid naming collisions with their related presentational components.

Now create "App.jsx" under containers.

```javascript
import React from 'react';
import App from '../components/App';

export default class AppContainer extends React.Component {
  render() {
    return <App />;
  }
}

```

Also, create "App.jsx" under components.

```javascript
import React from 'react';

export default class App extends React.Component {
  render() {
    return <div>Hello from App!</div>;
  }
}

```

You'll notice ESLint complaining about preferring pure functions now.  In React you can create your components a few different ways, if you read through [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) you would have seen components written by calling `createClass` (as of this writing anyway).  

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

Because `react-hot-loader` doesn't support FSCs (the next version will) go ahead and add the section below to your ".eslintrc" file to change that rule.  Later when we upgrade to the next version of `react-hot-loader` we'll remove the rule.

```javascript
{
  // more config

  "rules": {
    // remove after upgrading to react-hot-loader 3
    "react/prefer-stateless-function": 0,
  }
}
```

You app should now be error from and if you start up your server you should be able to view it in the browser.  Our first React components!

### React Router
For our app we want to have a landing page, a route for our blog, and a resume route.  To accomplish that with a single page application we need a router which interfaces with the browser's [history api](https://developer.mozilla.org/en-US/docs/Web/API/History).

Let's get the library.

```javascript
npm install --save react-router
```

Update "index.jsx" as follows.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import App from './containers/App';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
  </Router>
), document.getElementById('root'));

```

#### What's going on here?
- React Router imports
 - `browserHistory`: use the HTML5 history api for our browser history
 - `Route`: an individual React route component
 - `Router`: our router which controls/maintains our navigation and history
- We've replaced `App` with `Router` and nested a `Route` inside.  Here's we're telling React to render a `Router` that uses `browserHistory` and create a single `Route` at path `"/"` (which is just our root route (localhost:8080/)).

You should be able to refresh your browser and still see "Hello from App!", nothing *looks* different, but it *is*.  Let's add another route to demonstrate.  Below our existing route add `<Route path="/blog" component={Blog} />` and add `import Blog from './containers/Blog';` below your `App` import.  Finally, create the components below.

```javascript
// containers/Blog.jsx
import React from 'react';
import Blog from '../components/Blog';

export default class BlogContainer extends React.Component {
  render() {
    return <Blog />;
  }
}

```

```javascript
// components/Blog.jsx
import React from 'react';

export default class Blog extends React.Component {
  render() {
    return <div>Hi from Blog!</div>;
  }
}

```

Restart your server and visit "localhost:8080/blog".  Did you get a "Cannot GET /blog" error?  Me too.  The reason this is happening is that we don't have a file in our "dist" directory named "blog".  What we want is for our server to always serve our "index.html" file when it doesn't find what it is looking for (an HTTP 404 error).  Webpack has got our back!  Add `historyApiFallback: true,` to the `devServer` section of your "webpack.config.js" file, restart your server, then visit "localhost:8080/blog" again.  It works!

If you visit localhost:8080 you'll continue to get "Hello from App!".  Wouldn't it be even better if we could navigate between our routes without having to manually change the URL?  Let's do that.

```javascript
// components/App.jsx
import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return <Link to="/blog">Go to Blog</Link>;
  }
}
```

```javascript
// components/Blog.jsx
import React from 'react';
import { Link } from 'react-router';

export default class Blog extends React.Component {
  render() {
    return <Link to="/">Go to App</Link>;
  }
}

```

Here we're using React Router `Link` components to navigate between our routes.  You should now be able to navigate back and forth between routes.

Let's commit and close our next GitHub issue.

```bash
git add .
git commit -m 'added React and React Router...closes #5 and closes #6'
git push origin master
```

#### Summary
We now have React and React Router setup so we can create components for each piece of functionality and organize our app into multiple routes for our various purposes.  We'll add our resume route a little later.  In the next section we'll look get our testing setup in place so we can build the rest of our app using a [Test Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) approach.
