import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { List as iList } from 'immutable';
import BlogPostListItem from '../BlogPostListItem/BlogPostListItem';
import classes from './BlogPostList.scss';

export const BlogPostList = (props) => {
  const sortedPosts = props.posts.sort((p1, p2) => {
    const p1Date = p1.get('date');
    const p2Date = p2.get('date');
    if (p1Date === p2Date) return 0;
    return p1Date < p2Date ? 1 : -1;
  });
  const mappedPosts = sortedPosts.map((post) => {
    const onClick = () => props.router.push(`/blog/${post.get('slug')}`);
    return <BlogPostListItem key={post.get('slug')} onClick={onClick} post={post} />;
  }).toJS();
  return (
    <div className={classes.blogPostList}>
      <h1>Blog.</h1>
      {mappedPosts}
    </div>
  );
};

BlogPostList.propTypes = {
  posts: PropTypes.instanceOf(iList).isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(BlogPostList);
