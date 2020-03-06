// styles
// external
import React from 'react';
import {connect} from 'react-redux';
import {loadReCaptcha} from 'react-recaptcha-google';
// internal
import Routes from './Routes';
import Modals from './Modals';
import Toasts from './components/cabinet/Toasts/Toasts';
import CookieUsage from './components/site/CookieUsage/CookieUsage';
import * as UI from '../ui';
import LogoLoader from '../ui/components/LogoLoader/LogoLoader';
import * as actions from '../actions';
import * as internalNotifications from '../actions/cabinet/internalNotifications';
import * as storage from '../services/storage';
import { getLang, setLang } from '../services/lang';
import * as utils from '../utils';
import {Helmet} from 'react-helmet';

class App extends React.Component {
  state = {
    isLoading: true,
    error: null
  };

  componentDidMount() {
    document.body.classList.add(['theme', this.props.theme].join('-'));
    loadReCaptcha();
    this._loadAssets();
  }

  componentDidCatch(error, info) {
    this.setState({ error: {
      name: error.name,
      message: error.message,
      // message: error.message + " " + error.stack.toString(),
    }});
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.theme !== this.props.theme) {
      document.body.classList.remove(['theme', prevProps.theme].join('-'));
      document.body.classList.add(['theme', this.props.theme].join('-'));
    }
    const { params } = this.props.route;
    if (params.modal || params.modal_group) {
      document.body.classList.add('modal-open');
      document.body.style.marginRight = utils.getScrollbarWidth() + "px";
    } else {
      document.body.classList.remove('modal-open');
      document.body.style.marginRight = 0;
    }
  }

  render() {
    const acceptedCookies = storage.getItem('acceptedCookies');
    const { error } = this.state;

    if (this.state.isLoading) {
      return (
        <LogoLoader className="AppLoading" />
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

    return <div>
      <Helmet>
        <title>{utils.getLang('global_meta_title', true)}</title>
      </Helmet>
      <Modals />
      <Routes />
      <Toasts />
      {!acceptedCookies ? <CookieUsage /> : null}
    </div>
  }

  _loadAssets = () => {
    const lang = getLang();
    setLang(lang);
    Promise.all([
      actions.loadLang(lang),
      actions.loadCurrencies()
    ])
      .then(() => {
        this.setState({isLoading: false});
      })
      .catch(() => setTimeout(this._loadAssets, 3000));
  };
}


export default connect(state => ({
  route: state.router.route,
  theme: state.default.cabinet ? state.default.theme : 'light'
}), {
  loadInternalNotifications: internalNotifications.load
})(App);
