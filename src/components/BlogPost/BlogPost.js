import React, { PropTypes } from 'react';
import { Map as iMap } from 'immutable';

const BlogPost = (props) => {
  return (
    <div>
      <h1>{props.post.get('title')}</h1>
      <p>{props.post.get('content')}</p>
    </div>
  );
};

BlogPost.propTypes = {
  post: PropTypes.instanceOf(iMap)
};

export default BlogPost;
