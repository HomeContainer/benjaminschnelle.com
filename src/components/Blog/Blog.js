import React, { PropTypes } from 'react';
import { List as iList } from 'immutable';
import classes from './Blog.scss';

const Blog = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        Blog
      </div>
    </div>
  );
};

Blog.propTypes = {
  posts: PropTypes.instanceOf(iList)
};

export default Blog;
