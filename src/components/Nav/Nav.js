import React, { Component, PropTypes } from 'react';
import NavGrid from './Grid/NavGrid';
// import NavList from './List/NavList';
import classes from './Nav.scss';

class Nav extends Component {

  static childContextTypes = {
    navOpen: PropTypes.bool
  }

  static propTypes = {
    open: PropTypes.bool,
    screen: PropTypes.string.isRequired
  }

  getChildContext() {
    return { navOpen: this.props.open };
  }

  render() {
    const { open, screen } = this.props;

    const className = `${classes.nav} ${open ? classes.open : ''}`;
    const nav = screen === 'extraSmall' ? null : <NavGrid screen={screen} />;

    return <nav className={className}>{nav}</nav>;
  }
}

export default Nav;
