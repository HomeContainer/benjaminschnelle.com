import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List as iList } from 'immutable';
import { getPosts } from '../../redux/modules/blog/blogModule';
import { setMenuColor } from '../../redux/modules/ui/uiModule';
import uiService from '../../services/ui/uiService';
import Blog from '../../components/Blog/Blog';

export class BlogContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    fetchingPosts: PropTypes.bool,
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.instanceOf(iList),
    screen: PropTypes.string.isRequired,
    setMenuColor: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    const { children, fetchingPosts, posts, screen, setMenuColor: setMenuClr } = this.props;
    return (
      <Blog
        fetchingPosts={fetchingPosts}
        posts={posts}
        setMenuColor={setMenuClr}
        screen={screen}
      >
        {children}
      </Blog>
    );
  }
}

export const stateToProps = (state) => ({
  fetchingPosts: state.blog.get('fetchingPosts'),
  posts: state.blog.get('posts'),
  screen: uiService.getScreen(state.ui)
});

const dispatchToProps = { getPosts, setMenuColor };

export default connect(stateToProps, dispatchToProps)(BlogContainer);
