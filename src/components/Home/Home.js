import React from 'react';
import { Link } from 'react-router';

// we've removed our message as well
const Home = () => (
  <div>
    <h2>Hello from Home!</h2>
    <Link to="/counter">Go to Counter!</Link>
  </div>
);

export default Home;
