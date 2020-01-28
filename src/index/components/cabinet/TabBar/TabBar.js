import './TabBar.less';
import React from 'react';
import { connect } from 'react-redux';
import { BaseLink } from 'react-router5';
import router from '../../../../router';
import SVG from 'react-inlinesvg';
import * as PAGES from '../../../constants/pages';


const Tab = props => (
  <BaseLink
    router={router}
    routeName={props.route}
    className="TabBar__item"
    activeClassName="active"
  >
    {props.children}
  </BaseLink>
)

const Tabs = props => {
  return (
    <div className="TabBar">
      <Tab route={PAGES.DASHBOARD}><SVG src={require('../../../../asset/24px/user.svg')} /></Tab>
      <Tab route={PAGES.CABINET_WALLET}><SVG src={require('../../../../asset/24px/wallet.svg')} /></Tab>
      <Tab route={PAGES.INVESTMENTS}><SVG src={require('../../../../asset/24px/invest.svg')} /></Tab>
      <Tab route={PAGES.EXCHANGE}><SVG src={require('../../../../asset/24px/loop.svg')} /></Tab>
      <Tab route={PAGES.MENU}><SVG src={require('../../../../asset/24px/menu.svg')} /></Tab>
    </div>
  )
}

export default connect(state => ({
  router: state.router,
}))(Tabs);
