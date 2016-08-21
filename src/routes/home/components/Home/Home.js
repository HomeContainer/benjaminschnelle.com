import React from 'react';
import { Link } from 'react-router';

const Home = (props) => (
  <div>
    <Link to="/counter">Go to Counter!</Link>
    <div>{props.count}</div>
    <button onClick={props.increment}>Increment</button>
  </div>
);

Home.propTypes = {
  count: React.PropTypes.number,
  increment: React.PropTypes.func.isRequired
};

export default Home;
