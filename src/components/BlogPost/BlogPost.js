import React, { PropTypes } from 'react';
import { Map as iMap } from 'immutable';
import classes from './BlogPost.scss';

const BlogPost = (props) => {
  const content = props.post.get('content');

  return (
    <div className={classes.blogPost}>
      <h1>{props.post.get('title')}</h1>
      <div className="markdown-body" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

BlogPost.propTypes = {
  post: PropTypes.instanceOf(iMap).isRequired
};

export default BlogPost;
