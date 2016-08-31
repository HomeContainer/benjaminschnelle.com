import React, { PropTypes } from 'react';
import Cell from '../Cell/Cell';
import ContentCell from '../ContentCell/ContentCell';
import IconButton from '../../../IconButton/IconButton';
import classes from './NavGrid.scss';

const NavGrid = (props) => {
  let className;
  let cellMapping;
  let cells = [];
  let totalCells;
  const info = {
    content: (
      <div className={classes.info}>
        <span>Benjamin Schnelle</span>
        <span>618.303.6355</span>
        <span>benjamin.schnelle@gmail.com</span>
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
    content: <IconButton href="https://github.com/bschnelle" icon="github" />
  };

  switch (props.size) {
    case 'extraSmall': {
      break;
    }
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
  size: PropTypes.string
};

export default NavGrid;
