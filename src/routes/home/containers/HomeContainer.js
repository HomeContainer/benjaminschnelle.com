import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../../../redux/modules/counterModule';
import Home from '../components/Home/Home';

export const HomeContainer = (props) => (
  <Home count={props.count} increment={props.increment} />
);

HomeContainer.propTypes = {
  count: React.PropTypes.number.isRequired,
  increment: React.PropTypes.func.isRequired,
};

export const stateToProps = (state) => ({ count: state.counter.count });
export const dispatchToProps = { increment };

export default connect(stateToProps, dispatchToProps)(HomeContainer);
