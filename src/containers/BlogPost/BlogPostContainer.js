import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map as iMap } from 'immutable';
import blogService from '../../services/blog/blogService';
import { getPost } from '../../redux/modules/blog/blogModule';
import BlogPost from '../../components/BlogPost/BlogPost';
import Loader from '../../components/Loader/Loader';

export class BlogPostContainer extends Component {

  static propTypes = {
    fetchingPost: PropTypes.bool,
    getPost: PropTypes.func.isRequired,
    params: PropTypes.object,
    post: PropTypes.instanceOf(iMap)
  }

  componentWillMount() {
    const { params: { slug }, post } = this.props;
    if (!post || !post.get('content')) {
      this.props.getPost(slug);
    }
  }

  render() {
    const { fetchingPost, post } = this.props;
    return (
      post && !fetchingPost ? <BlogPost post={post} /> : <Loader />
    );
  }
}

export const stateToProps = (state, props) => ({
  fetchingPost: state.blog.get('fetchingPost'),
  post: blogService.selectPost(state.blog, props.params.slug)
});

const dispatchToProps = { getPost };

export default connect(stateToProps, dispatchToProps)(BlogPostContainer);
