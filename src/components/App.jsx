import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  render() {
    return <Link to="/blog">Go to Blog</Link>;
  }
}
