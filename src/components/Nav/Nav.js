import React, { Component, PropTypes } from 'react';
import NavGrid from './components/NavGrid/NavGrid';
import classes from './Nav.scss';

class Nav extends Component {

  static childContextTypes = {
    navOpen: PropTypes.bool
  }

  static propTypes = {
    open: PropTypes.bool
  }

  getChildContext() {
    return { navOpen: this.props.open };
  }

  render() {
    return (
      <nav className={`${classes.nav} ${this.props.open ? classes.open : ''}`}>
        <NavGrid />
      </nav>
    );
  }
}

export default Nav;
