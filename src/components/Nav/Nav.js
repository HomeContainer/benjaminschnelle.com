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
    console.log('image', image);
    const imageUrl = image && image.getIn(['urls', 'custom']);

    return (
      <nav className={className} style={{ backgroundImage: `url(${imageUrl})` }}>
        {screen === 'extraSmall' ? <NavList /> : <NavGrid screen={screen} />}
      </nav>
    );
  }
}

export default Nav;
