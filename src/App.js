import React from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';

import * as testActions from './actions/test';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Routes {...this.props} />
      </div>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    testActions: {
      update: () => dispatch(testActions.update(...arguments))
    }
  };
}

export default connect((state) => {
    return { state };
}, mapDispatchToProps)(App);
