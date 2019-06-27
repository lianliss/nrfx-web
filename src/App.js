import React from 'react';
import { connect } from 'react-redux';
import { loadReCaptcha } from 'react-recaptcha-google';

import Routes from './Routes';
import * as actions from './actions';
import * as testActions from './actions/test';
import * as storage from './services/storage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    loadReCaptcha();
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
    const lang = storage.getItem('lang');

    Promise.all([
      actions.loadLang(lang || 'ru')
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
