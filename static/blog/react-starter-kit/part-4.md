To recap, we have our project under source control with Git/GitHub, we're managing our dependencies with NPM, ESLint is configured to ensure code consistency, and Webpack is configured for development and production.

## 7. React and React Router
Per the React site, React makes it painless to create interactive UIs.  That is no understatement.  React is all *component* based (you can think of them as widgets of functionality) meaning you break your UI into separate components and *compose* your UI from those pieces.  I highly recommend reading [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) by [Pete Hunt](https://twitter.com/floydophone) for a quick overview of using React.

Go ahead and install React and related packages.

```bash
npm install --save react react-dom
npm install --save-dev react-hot-loader@3.0.0-beta.2
```

##### What did we just install?
- `react`: React.js
- `react-dom`: React package for working with the DOM
- `react-hot-loader`: HMR with React in mind...we're using a beta version for compatibility with functional stateless components

Update "index.js" as shown below.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('root'));

```

Here we're using `react-dom` to render our `App` component into the "root" `div`.

The changes below need to be made to "webpack.config.js" as well.

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

That weird looking syntax in "index.jsx" is JSX, it's just JavaScript in disguise.  You can read more [here](https://facebook.github.io/react/docs/jsx-in-depth.html) where they give before and after code examples.

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

Because `react-hot-loader` doesn't support FSCs (the next version will) go ahead and add the section below to your ".eslintrc" file to change that rule.  Later when we upgrade to the next version of `react-hot-loader` (or remove it entirely) we'll remove the rule and update our components to use FSCs where possible.

```javascript
{
  // more config

  "rules": {
    // remove after upgrading to react-hot-loader 3
    "react/prefer-stateless-function": 0,
  }
}
```

Your app should now be error free and if you start up your server you should be able to view it in the browser.  Our first React components!

There are a few fundamental React concepts we've glossed over so far like `props` and `state` as well as more advanced concepts like `context`.  We'll discuss those when we reach our post on Redux so that we can compare and contrast the two.

#### React Router
To make our app more interesting and useful we need to add a router which enables us to change paths within our app (e.g., my.site.com --> my.site.com/blog).  React Router interfaces with the HTML5 [history api](https://developer.mozilla.org/en-US/docs/Web/API/History) which works flawlessly with single page apps.

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

##### What's going on here?
- React Router imports
 - `browserHistory`: use the HTML5 history api for the router's history
 - `Route`: an individual React route component
 - `Router`: our React router component which controls/maintains our navigation and history
- We've replaced `App` with `Router` and nested a `Route` inside.  Here we're telling React to render a `Router` that uses `browserHistory` and create a single `Route` at path `"/"` (which is just our root route).

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

Restart your server and visit "localhost:8080/blog".  Did you get a "Cannot GET /blog" error?  Me too.  The reason this is happening is that we don't have a file in our "dist" directory named "blog".  What we want is for our server to always serve our "index.html" file when it doesn't find what it is looking for (an HTTP 404 error).  Webpack has this covered!  Add `historyApiFallback: true,` to the `devServer` section of your "webpack.config.js" file, restart your server, then visit "localhost:8080/blog" again.  It works!

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
git commit -m 'added React and React Router...closes #5'
git push origin master
```

#### Summary
We now have React and React Router setup so we can create components for each piece of functionality and organize our app into multiple routes for our various purposes.  In the next section we'll look get our testing setup in place so we can take a [Test Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development) approach when we use our starter kit as our application basis later.
