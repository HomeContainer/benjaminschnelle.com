import React, { Component, PropTypes } from 'react';
import MenuIconButton from '../MenuIconButton/MenuIconButton';
import NavContainer from '../../containers/Nav/NavContainer';
import classes from './Layout.scss';

export class Layout extends Component {
  static childContextTypes = {
    toggleMenu: PropTypes.func
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  getChildContext() {
    return { toggleMenu: this.toggleMenu };
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
        <NavContainer open={this.state.menuOpen} />
      </div>
    );
  }
}

export default Layout;
