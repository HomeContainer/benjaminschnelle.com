import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { getRandomImage } from '../../redux/modules/images/imagesModule';
import Blog from '../../components/Blog/Blog';

export class BlogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { content: undefined };
  }

  componentWillMount() {
    // TODO fetch config json from S3
  }

  render() {
    return <Blog content={this.state.content} />;
  }
}

/* export const stateToProps = (state) => {
  const currentImage = state.images.get('currentImage');
  const image = state.images.getIn(['images', currentImage]);
  return { image };
};

const dispatchToProps = { getRandomImage };

export default connect(stateToProps, dispatchToProps)(BlogContainer); */

export default BlogContainer;
