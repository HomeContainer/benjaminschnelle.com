import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classes from './Nav.scss';

const Nav = (props) => (
  <nav className={`${classes.nav} ${props.open ? classes.open : ''}`}>
    <div><span>Benjamin Schnelle</span></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div><span>blog.</span></div>
    <div></div>
    <div><span>home.</span></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div><span>O</span></div>
  </nav>
);

Nav.propTypes = {
  open: PropTypes.bool
};

export default Nav;
