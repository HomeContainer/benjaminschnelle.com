import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import uiService from '../../services/ui/uiService';
import NavList from '../../components/NavList/NavList';
import NavGrid from '../../components/NavGrid/NavGrid';

const NavContainer = (props) => {

};

NavContainer.propTypes = {
  size: PropTypes.string.isRequired
};

const stateToProps = (state) = ({
  size: {

  }
});

export default connect(stateToProps)(NavContainer);
