import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { List as iList } from 'immutable';
import Post from '../Post/Post';
import classes from './BlogPostList.scss';

export const BlogPostList = (props) => {
  const sortedPosts = props.posts.sort((p1, p2) => p1.get('date') <= p2.get('date'));
  const mappedPosts = sortedPosts.map((post) => {
    const onClick = () => props.router.push(`/blog/${post.get('slug')}`);
    return <Post key={post.get('id')} onClick={onClick} post={post} />;
  });
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
