import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classes from './Nav.scss';

const Nav = (props) => (
  <nav className={`${classes.nav} ${props.open ? classes.open : ''}`}>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/blog">Blog</Link></li>
    </ul>
  </nav>
);

Nav.propTypes = {
  open: PropTypes.bool
};

export default Nav;
