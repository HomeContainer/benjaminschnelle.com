import React from 'react';
import { Link } from 'react-router';

export default class App extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number,
    increment: React.PropTypes.func.isRequired,
    linkMessage: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
        <Link to="/blog">{this.props.linkMessage}</Link>
        <div>{this.props.counter}</div>
        <button onClick={this.props.increment}>Increment</button>
      </div>
    );
  }
}
