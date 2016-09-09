import React, { PropTypes } from 'react';
import Cell from '../Cell/Cell';
import ContentCell from '../ContentCell/ContentCell';
import IconButton from '../../IconButton/IconButton';
import userInfo from '../../userInfo/userInfo';
import classes from './NavGrid.scss';

/**
 * Nav component for anything larger than mobile
 */
export const NavGrid = (props) => {
  const { email, github, name } = props.userInfo;
  const info = {
    content: (
      <div className={classes.info}>
        <span>{name}</span>
        <span>{email}</span>
      </div>
    )
  };
  const blog = {
    clickable: true,
    content: 'blog.'
  };
  const home = {
    clickable: true,
    content: 'home.'
  };
  const social = {
    className: classes.social,
    content: <IconButton href={github} icon="github" />
  };

  let className;
  let cellMapping;
  let cells = [];
  let totalCells;

  switch (props.screen) {
    case 'small': {
      className = classes.smallCell;
      totalCells = 8;
      cellMapping = {
        0: info,
        3: blog,
        4: home,
        7: social
      };
      break;
    }
    case 'medium': {
      className = classes.mediumCell;
      totalCells = 12;
      cellMapping = {
        0: info,
        5: blog,
        7: home,
        11: social
      };
      break;
    }
    default: {
      className = classes.largeCell;
      totalCells = 16;
      cellMapping = {
        0: info,
        7: blog,
        9: home,
        15: social
      };
    }
  }

  for (let i = 0; i < totalCells; i++) {
    const mapping = cellMapping[i];
    if (mapping) {
      cells.push(
        <ContentCell
          className={mapping.className ? `${className} ${mapping.className}` : className}
          clickable={mapping.clickable}
          key={i}
        >
          {mapping.content}
        </ContentCell>
      );
    } else {
      cells.push(<Cell className={className} key={i} />);
    }
  }

  return <div className={classes.navGrid}>{cells}</div>;
};

NavGrid.propTypes = {
  screen: PropTypes.string,
  userInfo: PropTypes.object.isRequired
};

export default userInfo(NavGrid);
