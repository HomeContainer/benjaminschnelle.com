import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map as iMap } from 'immutable';
import blogService from '../../services/blog/blogService';
import { getPost } from '../../redux/modules/blog/blogModule';
import BlogPost from '../../components/BlogPost/BlogPost';

export class BlogPostContainer extends Component {

  static propTypes = {
    getPost: PropTypes.func.isRequired,
    params: PropTypes.object,
    post: PropTypes.instanceOf(iMap)
  }

  componentWillMount() {
    this.props.getPost(this.props.params.slug);
  }

  render() {
    const { post } = this.props;
    return post ? <BlogPost post={this.props.post} /> : null;
  }
}

const stateToProps = (state) => ({
  post: blogService.selectActivePost(state.blog)
});

const dispatchToProps = { getPost };

export default connect(stateToProps, dispatchToProps)(BlogPostContainer);
