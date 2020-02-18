import '../index.less';
// import '../index/vars.less';

import React from 'react';
import {connect} from 'react-redux';

import Toasts from '../index/components/cabinet/Toasts/Toasts';
import Routes from './Routes';
import Modals from './Modals';
import DynamcModals from './DynamcModals';
import {getLang, setLang} from '../services/lang';
import * as actions from '../actions';

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
      <DynamcModals modals={this.props.state.admin.modals} />
      <Modals {...this.props} />
      <Toasts />
    </div>
  }

  _loadAssets = () => {
    const lang = getLang();
    setLang(lang);
    Promise.all([
      actions.loadLang(lang)
    ])
      .then(() => {
        this.setState({isLoading: false});
      })
  };
}


export default connect(state => ({state}))(App);
