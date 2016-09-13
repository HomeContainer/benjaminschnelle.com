import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uiService from '../../services/ui/uiService';
import Nav from '../../components/Nav/Nav';

export const NavContainer = (props) =>
  <Nav open={props.open} screen={props.screen} />;

NavContainer.propTypes = {
  open: PropTypes.bool,
  screen: PropTypes.string.isRequired
};

export const stateToProps = (state) => ({
  screen: uiService.getScreen(state.ui)
});

export default connect(stateToProps)(NavContainer);
