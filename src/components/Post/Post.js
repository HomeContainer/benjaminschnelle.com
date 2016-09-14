import React, { PropTypes } from 'react';
import { Map as iMap } from 'immutable';
import moment from 'moment';
import classes from './Post.scss';

const Post = (props) => {
  const { author, date, preview, title } = props.post.toObject();
  return (
    <div className={classes.post} onClick={props.onClick}>
      <div className={classes.inner}>
        <div>{title}</div>
        <div>
          <p>{preview}</p>
          <div>
            <span>{author}</span>
            <span> | </span>
            <span>{moment(new Date(date)).format('MMM Do, YYYY')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  onClick: PropTypes.func.isRequired,
  post: PropTypes.instanceOf(iMap).isRequired
};

export default Post;
