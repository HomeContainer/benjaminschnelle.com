import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classes from './Counter.scss';

const Counter = (props) => (
  <div>
    <h2>Hello from Counter!</h2>
    <Link to="/">Go Home!</Link>
    <button className={classes.button} onClick={props.increment}>
      Increment
    </button>
    <div>{props.count}</div>
  </div>
);

Counter.propTypes = {
  count: PropTypes.number,
  increment: PropTypes.func.isRequired
};

export default Counter;
