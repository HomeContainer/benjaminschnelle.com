import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment } from '../../redux/modules/counter/counterModule';
import Counter from '../../components/Counter/Counter';

export const CounterContainer = (props) => (
  <Counter count={props.count} increment={props.increment} />
);

CounterContainer.propTypes = {
  count: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
};

export const stateToProps = (state) => ({ count: state.counter.get('count') });
export const dispatchToProps = { increment };

export default connect(stateToProps, dispatchToProps)(CounterContainer);
