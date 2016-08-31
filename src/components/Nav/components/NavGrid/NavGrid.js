import React, { PropTypes } from 'react';
import Cell from '../Cell/Cell';
import ContentCell from '../ContentCell/ContentCell';
import IconButton from '../../../IconButton/IconButton';
import classes from './NavGrid.scss';

const NavGrid = (props) => {
  let className;
  let cells = [];

  if (props.small) {
    className = classes.small;
  } else {
    className = classes.large;
    const cellMapping = {
      0: {
        content: (
          <div className={classes.info}>
            <span>Benjamin Schnelle</span>
            <span>618.303.6355</span>
            <span>benjamin.schnelle@gmail.com</span>
          </div>
        )
      },
      7: {
        clickable: true,
        content: 'blog.'
      },
      9: {
        clickable: true,
        content: 'home.'
      },
      15: {
        className: `${classes.cell} ${classes.social}`,
        content: <IconButton href="https://github.com/bschnelle" icon="github" />
      }
    };

    for (let i = 0; i < 16; i++) {
      const mapping = cellMapping[i];
      if (mapping) {
        cells.push(
          <ContentCell
            className={mapping.className || classes.cell}
            clickable={mapping.clickable}
            key={i}
          >
            {mapping.content}
          </ContentCell>
        );
      } else {
        cells.push(<Cell className={classes.cell} key={i} />);
      }
    }
  }

  return <div className={className}>{cells}</div>;
};

NavGrid.propTypes = {
  small: PropTypes.bool
};

export default NavGrid;
