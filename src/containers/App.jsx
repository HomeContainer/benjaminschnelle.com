import React from 'react';
import { connect } from 'react-redux';
import { increment } from '../redux/modules/home';
import App from '../components/App';

class AppContainer extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    increment: React.PropTypes.func.isRequired,
  }

  render() {
    const linkMessage = 'Go to Blog!';
    return (
      <App
        counter={this.props.counter}
        increment={this.props.increment}
        linkMessage={linkMessage}
      />
    );
  }
}

const stateToProps = (state) => ({ counter: state.home.counter });
const dispatchToProps = { increment };

export default connect(stateToProps, dispatchToProps)(AppContainer);
