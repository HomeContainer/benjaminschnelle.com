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
    this.props.getPost(this.props.params.slug);
  }

  render() {
    const { fetchingPost, post } = this.props;
    return (
      post && !fetchingPost ? <BlogPost post={this.props.post} /> : <Loader />
    );
  }
}

const stateToProps = (state) => ({
  fetchingPost: state.blog.get('fetchingPost'),
  post: blogService.selectActivePost(state.blog)
});

const dispatchToProps = { getPost };

export default connect(stateToProps, dispatchToProps)(BlogPostContainer);
