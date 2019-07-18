import React from 'react';
import { connect } from 'react-redux';
import { loadReCaptcha } from 'react-recaptcha-google';

import Routes from './Routes';
import * as actions from './actions';
import * as testActions from './actions/test';
import * as storage from './services/storage';
import * as pages from './constants/pages';
import CookieUsage from './components/site/CookieUsage/CookieUsage';
import SiteWrapper from './wrappers/Site/SiteWrapper';

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
    const acceptedCookies = storage.getItem('acceptedCookies');
    const route = this.props.state.router.route.name;
    const isWithOrangeBg = route === pages.CONTACT || route === pages.FAQ || route === pages.ABOUT || route === pages.HISTORY || route === pages.MISSION || route === pages.NOT_FOUND || route === pages.SAFETY || route === pages.TECHNOLOGY;

    if (this.state.isLoading) {
      return (
        <div className="AppLoading">Loading...</div>
      )
    }

    return (
      <div>

        {/* TODO: This is handled ONLY for site routes */}
        <SiteWrapper isHomepage={route === pages.MAIN} withOrangeBg={isWithOrangeBg}>
          <Routes {...this.props} />
        </SiteWrapper>

        {!acceptedCookies
          ? <CookieUsage />
          : null}

      </div>
    )
  }

  _loadAssets = () => {
    const lang = storage.getItem('lang');

    Promise.all([
      actions.loadLang(lang || 'en')
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
