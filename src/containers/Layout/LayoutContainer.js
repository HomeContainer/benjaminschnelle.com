import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getRandomImage } from '../../redux/modules/images/imagesModule';
import Layout from '../../components/Layout/Layout';

export class LayoutContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    getRandomImage: PropTypes.func.isRequired,
    image: PropTypes.object
  }

  componentWillMount() {
    if (!this.props.image) {
      this.props.getRandomImage();
    }
  }

  render() {
    const { children, image } = this.props;
    return <Layout image={image}>{children}</Layout>;
  }
}

export const stateToProps = (state) => {
  const activeImage = state.images.get('activeImage');
  const image = state.images.getIn(['images', activeImage]);
  return { image };
};

const dispatchToProps = { getRandomImage };

export default connect(stateToProps, dispatchToProps)(LayoutContainer);
