import React, { Component, PropTypes } from 'react';
import NavGrid from './components/NavGrid/NavGrid';
import classes from './Nav.scss';

class Nav extends Component {

  static childContextTypes = {
    navOpen: PropTypes.bool
  }

  static propTypes = {
    open: PropTypes.bool,
    size: PropTypes.string // TODO add NavContainer
  }

  getChildContext() {
    return { navOpen: this.props.open };
  }

  render() {
    return (
      <nav className={`${classes.nav} ${this.props.open ? classes.open : ''}`}>
        <NavGrid size="large" />
      </nav>
    );
  }
}

export default Nav;
