import React, { Component, PropTypes } from 'react';
import { List as iList } from 'immutable';
import BlogPostList from '../BlogPostList/BlogPostList';
import classes from './Blog.scss';

class Blog extends Component {
  static propTypes = {
    children: PropTypes.node,
    posts: PropTypes.instanceOf(iList),
    screen: PropTypes.string.isRequired,
    setMenuColor: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.setMenuColor = this.setMenuColor.bind(this);
  }

  componentWillMount() {
    this.setMenuColor(this.props.screen);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.screen !== nextProps.screen) {
      this.setMenuColor(nextProps.screen);
    }
  }

  componentWillUnmount() {
    this.setMenuColor(false);
  }

  setMenuColor(screen) {
    const shouldInvertMenuColor = ['extraSmall', 'small', 'medium'].includes(screen);
    this.props.setMenuColor(shouldInvertMenuColor);
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.content}>
          {this.props.children || <BlogPostList posts={this.props.posts} />}
        </div>
      </div>
    );
  }
}

Blog.propTypes = {
  children: PropTypes.node,
  posts: PropTypes.instanceOf(iList),
  screen: PropTypes.string.isRequired,
  setMenuColor: PropTypes.func.isRequired
};

export default Blog;
