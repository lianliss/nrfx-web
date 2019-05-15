import React from 'react';
import BaseScreen from './BaseScreen';

export default class TestScreen extends BaseScreen {
  render() {
    return (
      <div>
        <h1>Message: {this.props.testMessage}</h1>
        <br />
        <button onClick={() => this.props.update()}>Click</button>
      </div>
    )
  }
}
