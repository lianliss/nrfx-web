import './SiteNotFoundScreen.less';

import React from 'react';
import { connect } from 'react-redux';

import BaseScreen from '../../BaseScreen';
import * as UI from '../../../../ui';
import router from '../../../../router';
import { getLang } from 'src/utils/index';
import * as pages from '../../../../index/constants/pages';


class SiteNotFoundScreen extends BaseScreen {
  render() {

    return (
      <div className="SitePageNotFoundScreen">
        <div className="SitePageNotFoundScreen__content">
          <h2>404</h2>
          <p>{getLang('global_pageNotFound')}<br />{getLang('global_pageNotFoundDescription')}</p>
          {this.props.isLogin ? (
            <UI.Button onClick={() => router.navigate(pages.DASHBOARD)}>{getLang('global_pageNotFoundGoToProfile')}</UI.Button>
          ) : (
            <UI.Button onClick={() => router.navigate(pages.MAIN)}>{getLang('global_pageNotFoundGoToMainPage')}</UI.Button>
          )}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  isLogin: !!state.default.profile.user
}))(SiteNotFoundScreen);
