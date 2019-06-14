import React from 'react';
import { connect } from 'react-redux';

import Routes from './Routes';
import * as actions from './actions';
import * as testActions from './actions/test';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this._loadAssets();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="AppLoading">Loading...</div>
      )
    }

    return (
      <div>
        <Routes {...this.props} />
      </div>
    )
  }

  _loadAssets = () => {
    Promise.all([
      actions.loadLang()
    ])
      .then(() => this.setState({isLoading: false}))
      .catch(() => setTimeout(this._loadAssets, 3000));
  };
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
