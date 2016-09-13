import React, { Component, PropTypes } from 'react';
import NavGrid from './Grid/NavGrid';
import NavList from './List/NavList';
import classes from './Nav.scss';

class Nav extends Component {

  static childContextTypes = {
    navOpen: PropTypes.bool
  }

  static propTypes = {
    image: PropTypes.object,
    open: PropTypes.bool,
    screen: PropTypes.string.isRequired
  }

  getChildContext() {
    return { navOpen: this.props.open };
  }

  render() {
    const { image, open, screen } = this.props;
    const className = `${classes.nav} ${open ? classes.open : ''}`;
    const navStyle = {};
    if (image) {
      navStyle.backgroundImage = `url(${image.getIn(['urls', 'custom'])})`;
    }

    return (
      <nav className={className} style={navStyle}>
        {screen === 'extraSmall' ? <NavList /> : <NavGrid screen={screen} />}
      </nav>
    );
  }
}

export default Nav;
