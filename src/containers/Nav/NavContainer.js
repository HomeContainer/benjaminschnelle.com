import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uiService from '../../services/ui/uiService';
import Nav from '../../components/Nav/Nav';

const NavContainer = (props) => <Nav screen={props.screen} />;

NavContainer.propTypes = {
  screen: PropTypes.string.isRequired
};

const stateToProps = (state) => ({
  screen: uiService.getScreen(state.ui)
});

export default connect(stateToProps)(NavContainer);
