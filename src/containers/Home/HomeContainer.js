import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getRandomImage } from '../../redux/modules/images/imagesModule';
import Home from '../../components/Home/Home';

export class HomeContainer extends Component {
  static propTypes = {
    getRandomImage: PropTypes.func.isRequired,
    image: PropTypes.object
  }

  componentWillMount() {
    if (!this.props.image) {
      this.props.getRandomImage();
    }
  }

  render() {
    return <Home image={this.props.image} />;
  }
}

export const stateToProps = (state) => {
  const currentImage = state.images.get('currentImage');
  const image = state.images.getIn(['images', currentImage]);
  return { image };
};

const dispatchToProps = { getRandomImage };

export default connect(stateToProps, dispatchToProps)(HomeContainer);
