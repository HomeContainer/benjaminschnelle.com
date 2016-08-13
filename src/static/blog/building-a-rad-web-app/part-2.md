# Building a Rad Web App - Initial Setup Continued...

### As a reminder, here are the steps we're following (starting with #5 here)
1. Create our project
2. Add version control with Git and use Github as our repo host
3. Initialize Node Package Manager (NPM)
4. Setup ESLint
5. Add React and Configure Webpack
6. Add our testing framework
7. Use test driven development (TDD) to build the app (to be expanded)
8. Setup continuous integration/continuous delivery with Codeship

## 5. Add React and Configure Webpack
Per the React site, React makes it painless to create interactive UIs.  That is no understatement.  React is all *component* (you can think of them as widgets of functionality) based meaning you break your UI into separate components and *compose* your UI from those components.  I highly recommend reading [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) by [Pete Hunt](https://twitter.com/floydophone) for a quick overview of using React.

Webpack is an amazing bundling tool written with single page applications (SPAs) like the one we're going to build with React and Redux in mind.  Webpack by itself doesn't actually do much, the real power comes from *loaders* and *plugins*.

#### What will be using Webpack for?
- Development Server: Webpack has a built in development server powered by Node and [Express](https://expressjs.com/) (a web framework for Node)
 - Hot module replacement: edit our application and see the changes in realtime *without* losing the current application state! (it isn't just an automatic page refresh)
- Loaders (put files in, transform them, get bundle out)
 - JSX/ES6/ES7 (React specific syntax and new JavaScript) --> ES5 (old, but well supported JavaScript)
 - SASS (supercharged CSS) --> regular CSS
 - Possibly others, but I'll explain them if we need them
- Plugins (add bundle related functionality)
 - Hot module replacement: necessary for dev server functionality above
 - Minify/Uglify our code
 - Dynamically create our HTML file

So we'll get started by first installing React, creating a placeholder component to make sure it's working.  Then we'll get Webpack installed and setup and add to our simple component to demonstrate what we're doing with Webpack.  Ultimately, we'll delete our placeholder component and replace it with our actual application, but I find it helpful to demonstrate ideas with extremely simple demonstrations.

Let's install React and React DOM (React package for working with the DOM).

```bash
npm install --save react react-dom
```
