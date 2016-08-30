import React, { Component, PropTypes } from 'react';
import MenuIconButton from '../MenuIconButton/MenuIconButton';
import Nav from '../Nav/Nav';
import classes from './Layout.scss';

export class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    return (
      <div className={classes.layout}>
        <div>{this.props.children}</div>
        <MenuIconButton
          className={classes.menu}
          onClick={this.toggleMenu}
          open={this.state.menuOpen}
        />
        <Nav open={this.state.menuOpen} />
      </div>
    );
  }
}

export default Layout;
