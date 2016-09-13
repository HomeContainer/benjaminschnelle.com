import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uiService from '../../services/ui/uiService';
import Nav from '../../components/Nav/Nav';

export const NavContainer = (props) =>
  <Nav image={props.image} open={props.open} screen={props.screen} />;

NavContainer.propTypes = {
  image: PropTypes.object,
  open: PropTypes.bool,
  screen: PropTypes.string.isRequired
};

export const stateToProps = (state) => {
  const activeImage = state.images.get('activeImage');
  const image = state.images.getIn(['images', activeImage]);
  const screen = uiService.getScreen(state.ui);

  return { image, screen };
};

export default connect(stateToProps)(NavContainer);
