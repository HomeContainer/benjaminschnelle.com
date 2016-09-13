import React, { Component, PropTypes } from 'react';
import Profile from '../Profile/Profile';
import TabbedDrawer from '../TabbedDrawer/TabbedDrawer';
import userInfo from '../userInfo/userInfo';
import classes from './Home.scss';

export class Home extends Component {
  static propTypes = {
    image: PropTypes.object,
    userInfo: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = { backgroundImage: undefined };
    this.tabs = [{ label: 'About', content: <Profile /> }];
  }

  componentWillReceiveProps(nextProps) {
    const newImage = new Image();
    newImage.onload = () => this.setState({ backgroundImage: newImage.src });
    newImage.src = nextProps.image && nextProps.image.getIn(['urls', 'custom']);
  }

  render() {
    const { image, userInfo: { name, slogan } } = this.props;
    const wrapperStyle = {};
    if (image) {
      wrapperStyle.backgroundColor = image.get('color');
    }
    if (this.state.backgroundImage) {
      wrapperStyle.backgroundImage = `url(${this.state.backgroundImage})`;
    }

    return (
      <div className={classes.wrapper} style={wrapperStyle}>
        <TabbedDrawer tabs={this.tabs} />

        <div className={classes.home}>
          <div className={classes.welcome}>
            <h1>{name}</h1>
            <h6>{slogan}</h6>
          </div>
        </div>

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

export default userInfo(Home);
