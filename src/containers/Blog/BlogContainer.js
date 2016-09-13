import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List as iList } from 'immutable';
import { getPosts } from '../../redux/modules/blog/blogModule';
import Blog from '../../components/Blog/Blog';

export class BlogContainer extends Component {
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.instanceOf(iList)
  }

  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    return <Blog posts={this.props.posts} />;
  }
}

export const stateToProps = (state) => ({
  posts: state.blog.get('posts')
});

const dispatchToProps = { getPosts };

export default connect(stateToProps, dispatchToProps)(BlogContainer);
