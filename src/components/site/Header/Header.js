import './Header.less';

import * as utils from '../../../utils/index';
import React from 'react';
import SVG from 'react-inlinesvg';

import UI from '../../../ui';

export default class Header extends React.PureComponent {
  render() {
    const { showLightLogo } = this.props;

    return (
      <div className="SiteHeader">
        <div className="SiteHeader__cont">
          <div className="SiteHeader__logo">
            {showLightLogo
              ? <SVG src={require('../../../asset/logo_big_white.svg')} />
              : <SVG src={require('../../../asset/logo_big_orange.svg')} />
            }
          </div>
          <div className="SiteHeader__menu">
            <MenuItem arrow>{utils.getLang('site__headerProducts')}</MenuItem>
            <MenuItem arrow>{utils.getLang('site__headerCompany')}</MenuItem>
            <MenuItem arrow>{utils.getLang('site__headerHelp')}</MenuItem>
            <div className="SiteHeader__menu_controls">
              <MenuItem>{utils.getLang('site__headerLogIn')}</MenuItem>
              <UI.Button type="outline_white" rounded>{utils.getLang('site__headerRegistration')}</UI.Button>
              <MenuItem arrow>Ru</MenuItem>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function MenuItem(props) {
  return (
    <div className="SiteHeader__menu__item">
      {props.children}
      {props.arrow && <SVG src={require('../../../asset/menu_arrow.svg')} />}
    </div>
  )
}
