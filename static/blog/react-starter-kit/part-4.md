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

We'll start by making the necessary config changes to get `react-hot-loader` working, then we'll create our first React component.

Update the very bottom of your "webpack.config.js" file as shown below.

```javascript
// ...more config
{
  // add HMR
  webpackConfig.entry.app.unshift(
    'react-hot-loader/patch', // this is new
    `webpack-dev-server/client?http://${config.host}:${config.port}`,
    'webpack/hot/only-dev-server'
  );
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}
```

Add a new `plugins` section to your ".babelrc" to enable `react-hot-loader`.

```json
{
  "presets": [["es2015", { "modules": false }], "react", "stage-0"],
  "plugins": ["react-hot-loader/babel"]
}
```

Update your "index.js" file as shown below.

```javascript
import React from 'react';
import { render } from 'react-dom';
import HomeContainer from './containers/HomeContainer';

const MOUNT_NODE = document.getElementById('root');
const App = (
  <HomeContainer />
);

render(App, MOUNT_NODE);

```

That weird looking syntax (`<HomeContainer />`) is JSX, it's just JavaScript in disguise.  You can read more [here](https://facebook.github.io/react/docs/jsx-in-depth.html) where they give before and after code examples.

##### What's going on here?
- `React`: required to be in scope when using JSX
- `render`: a function provided by the `react-dom` library which is used to inject our root component into the DOM
- `HomeContainer`: the first React component we'll build momentarily
- `MOUNT_NODE`: reference to our "root" `div`
- `App`: our application...we'll be adding to this a little later
- `render()`: render our app into the DOM

#### Container vs. Presentational
If you looked closely at the `HomeContainer` import it is referencing our component in a sibling folder named "containers".  There's a useful philosophy in the React community of splitting up your components into two groups: containers and presentational components (smart and dumb).

Basically, container components implement business logic (connect to Redux store...we'll get to this in detail later on) and presentational components are only concerned with rendering the UI.  Dan Abramov has a good [post](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.f4mqb6y14) on the concepts.

Next, create two new folders under "src" named "containers" and "components" where we'll put our two types of components.  You can then create "HomeContainer.js" in the "containers" folder and paste in the code below.  We'll follow a convention of appending "Container" to our container component names for clarity and to avoid naming collisions with our presentational components.

We'll create our first presentational component a little later, for now this will work as a starting point.

```javascript
import React from 'react';

const HomeContainer = () => (
  <div>Hello from Home!</div>
);

export default HomeContainer;

```

#### Ways to Create Components
If you read through [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) you would have seen components written by calling `React.createClass` (as of this writing anyway) rather than how we're doing it above.  There are actually three way to create components in React, the first of which follows.

```javascript
var HomeContainer = React.createClass({})
```

The second way you can create components is using [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

```javascript
class HomeContainer extends React.Component {}
```

Finally, you can create *functional stateless components* (FSC).  There are certain limitations to this approach, but they're also simpler and Facebook has [stated](https://github.com/facebook/react/issues/5677) that they're planning future optimizations for components written in this way.  FSCs cannot use component lifecycle hooks or internal state (hence, stateless).  I'll demonstrate how some of the lifecycle hooks work shortly so you can make an informed decision when choosing how to implement components in your own app.  They're just implemented as a regular JavaScript function.

```javascript
function HomeContainer() {}
// or
const HomeContainer = () => {}
```

#### React Hot Loader
When we updated our "index.js" file earlier we broken HMR.  Make the changes below to fix it.

```javascript
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import HomeContainer from './containers/HomeContainer';

const MOUNT_NODE = document.getElementById('root');
const App = (
  <HomeContainer />
);

render(App, MOUNT_NODE);

if (module.hot) {
  module.hot.accept('./containers/HomeContainer', () => {
    render(<AppContainer>{App}</AppContainer>, MOUNT_NODE);
  });
}

```

The only big difference between how we were using HMR before and using it with `react-hot-loader` is the use of `AppContainer` when applying updates.  This component hasn't received documentation yet nor have I dug into the code thoroughly to explain it.  For now, just know its use is required by `react-hot-loader`.

We're overriding ESLint on line 3 to avoid a rule that we otherwise want applied.

#### Props
React enables you to pass data from parent components to child components via a `props` object.  Let's demonstrate that and also create our first presentational component.  Update/create the components below.

```javascript
// containers/HomeContainer.js
import React from 'react';
import Home from '../components/Home/Home';

const HomeContainer = () => (
  <Home message="Hello from HomeContainer!" />
);

export default HomeContainer;

```

```javascript
// components/Home/Home.js
import React from 'react';

const HomeContainer = (props) => (
  <div>
    <div>Hello from Home!</div>
    <div>{props.message}</div>
  </div>
);

HomeContainer.propTypes = {
  message: React.PropTypes.string.isRequired
};

export default HomeContainer;

```

##### HomeContainer
- We're importing our `Home` presentational component from components/Home...the reason we've nested it inside a "Home" directory is because we'll be SASS files a little later.
- When we render the `Home` component, we're passing a `message` property to it of "Hello from HomeContainer"

##### Home
- We're rendering output similar to what we had before in `HomeContainer`, but we're also now rendering the message passed in from `HomeContainer` in `<div>{props.message}</div>`.  React will interpolate `props.message` replacing it with "Hello from HomeContainer" in the rendered output.
- Further down we're explicitly telling our component what `props` to expect.  Adding static typing and making `props` required can improve debugging during development.

If you fire up your dev server you should be able to see your first React component in action!  Not very exciting, but we *are* using React now.

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
