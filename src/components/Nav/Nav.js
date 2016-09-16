import React, { Component, PropTypes } from 'react';
import NavGrid from './Grid/NavGrid';
import NavList from './List/NavList';
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

  componentWillReceiveProps(nextProps) {
    document.body.style.overflow = nextProps.open ? 'hidden' : '';
  }

  render() {
    const { open, screen } = this.props;
    const className = `${classes.nav} ${open ? classes.open : ''}`;

    return (
      <nav className={className}>
        {screen === 'extraSmall' ? <NavList /> : <NavGrid screen={screen} />}
      </nav>
    );
  }
}

export default Nav;
