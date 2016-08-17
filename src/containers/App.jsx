import React from 'react';
import App from '../components/App';

export default class AppContainer extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props);
    this.state = { counter: context.store.getState().counter };
    this.increment = this.increment.bind(this);
  }

  componentWillMount() {
    this.unsubscribe = this.context.store.subscribe(() => {
      this.setState({ counter: this.context.store.getState().counter });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  increment() {
    const action = { type: 'INCREMENT', increment: 2 };
    this.context.store.dispatch(action);
  }

  render() {
    const linkMessage = 'Go to Blog!';
    return (
      <App
        counter={this.state.counter}
        increment={this.increment}
        linkMessage={linkMessage}
      />
    );
  }
}
