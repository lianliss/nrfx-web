import React from 'react';
import {connect} from 'react-redux';
import UI from '../ui/';

import Toasts from '../index/components/cabinet/Toasts/Toasts';
import Routes from './Routes';
import Modals from './Modals';
import DynamcModals from './DynamcModals';
import {getLang, setLang} from '../services/lang';
import * as actions from '../actions';
import * as adminActions from '../actions/admin/';

class App extends React.Component {
  state = {
    isLoading: true
  }

  componentDidMount() {
    this._loadAssets();
  }

  render() {
    if (this.state.isLoading) return 'Loading...';

    return <div>
      <Routes {...this.props} />
      <Modals {...this.props} />
      <DynamcModals modals={this.props.state.admin.modals} />
      <Toasts />
    </div>
  }

  _loadAssets = () => {
    const lang = getLang();
    setLang(lang);
    Promise.all([
      actions.loadLang(lang),
      adminActions.init()
    ])
      .then(() => {
        this.setState({isLoading: false});
      })
  };
}


export default connect(state => {
  return {state};
})(App);
