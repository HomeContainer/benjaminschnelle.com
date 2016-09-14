import React, { Component, PropTypes } from 'react';
import MenuIconButton from '../MenuIconButton/MenuIconButton';
import NavContainer from '../../containers/Nav/NavContainer';
import classes from './Layout.scss';

export class Layout extends Component {

  static childContextTypes = {
    toggleMenu: PropTypes.func
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    image: PropTypes.object,
    invertMenuColor: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = { backgroundImage: undefined, menuOpen: false };
    const fns = ['setImage', 'toggleMenu'];
    fns.forEach((fn) => { this[fn] = this[fn].bind(this); });

    if (props.image) {
      this.setImage(props.image);
    }
  }

  getChildContext() {
    return { toggleMenu: this.toggleMenu };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image) {
      this.setImage(nextProps.image);
    }
  }

  setImage(image) {
    const newImage = new Image();
    newImage.onload = () => this.setState({ backgroundImage: newImage.src });
    newImage.src = image.getIn(['urls', 'custom']);
  }

  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    const { children, image, invertMenuColor } = this.props;
    let contentWrapperClass = classes.contentWrapper;
    let layoutStyle = {};

    if (this.state.menuOpen) contentWrapperClass += ` ${classes.hide}`;
    if (image) layoutStyle.backgroundColor = image.get('color');
    if (this.state.backgroundImage) {
      layoutStyle.backgroundImage = `url(${this.state.backgroundImage})`;
    }

    return (
      <div className={classes.layout} style={layoutStyle}>
        <div className={contentWrapperClass}>{children}</div>

        <MenuIconButton
          className={classes.menu}
          invertColor={invertMenuColor}
          onClick={this.toggleMenu}
          open={this.state.menuOpen}
        />

        <NavContainer open={this.state.menuOpen} />

        {image ? (
          <span className={classes.credit}>
            <span>random </span>
            <a href="https://unsplash.com" alt="Unsplash">Unsplash</a>
            <span> photo by </span>
            <a href={image.getIn(['user', 'links', 'html'])} alt={image.getIn(['user', 'name'])}>
              {image.getIn(['user', 'name'])}
            </a>
          </span>
        ) : null}
      </div>
    );
  }
}

export default Layout;
