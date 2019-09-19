import React from 'react';
import { connect } from 'react-redux';
import { loadReCaptcha } from 'react-recaptcha-google';

import Routes from './Routes';
import Modals from './Modals';
import ModalGroup from './ui/components/ModalGroup/ModalGroup';
import Toasts from './components/cabinet/Toasts/Toasts';

import * as actions from './actions';
import * as testActions from './actions/test';
import * as storage from './services/storage';

import CookieUsage from './components/site/CookieUsage/CookieUsage';
import UI from './ui';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {
    loadReCaptcha();
    this._loadAssets();
  }

  componentDidCatch(error, info) {
    this.setState({ error: {
      name: error.name,
      message: error.message
    }});
  }

  componentDidUpdate() {
    if (this.props.router.getState().params.modal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }

  render() {
    const acceptedCookies = storage.getItem('acceptedCookies');
    const { error } = this.state;

    if (this.state.isLoading) {
      return (
        <div className="AppLoading">Loading...</div>
      )
    }

    if (error) {
      return (
        <div className="Error_wrapper">
          <UI.Message type="error">
            <h2>{error.name}</h2>
            <p>{error.message}</p>
          </UI.Message>
        </div>
      )
    }

    return (
      <div>
        <ModalGroup {...this.props} />

        <Modals {...this.props} />

        <Routes {...this.props} />

        <Toasts />

        {!acceptedCookies
          ? <CookieUsage />
          : null}

      </div>
    )
  }

  _loadAssets = () => {
    const lang = storage.getItem('lang');

    Promise.all([
      actions.loadLang(lang || 'en'),
      actions.loadCurrencies()
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
