import "../index.less";
// import '../index/vars.less';

import React from "react";
import { connect } from "react-redux";

import Toasts from "../index/components/cabinet/Toasts/Toasts";
import Routes from "./Routes";
import Modals from "./Modals";
import { getLang, setLang } from "../services/lang";
import * as actions from "../actions";
import * as UI from "src/ui/index";

class App extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this._loadAssets();
  }

  render() {
    if (this.state.isLoading || this.props.profile.pending) {
      return <UI.LogoLoader />;
    }

    return (
      <div>
        <Routes />
        <Modals />
        <Toasts />
      </div>
    );
  }

  _loadAssets = () => {
    const lang = getLang();
    setLang(lang);
    Promise.all([actions.loadLang(lang), actions.loadCurrencies()]).then(() => {
      this.setState({ isLoading: false });
    });
  };
}

export default connect(state => ({
  ...state,
  profile: state.default.profile
}))(App);
