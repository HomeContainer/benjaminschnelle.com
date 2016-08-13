import React from 'react';
import ReactDOM from 'react-dom';
import classes from './classes.scss';

class Test extends React.Component {
  render() {
    return <div className={classes.title}>Hey dude!</div>;
  }
}

ReactDOM.render(<Test />, document.getElementById('root'));
