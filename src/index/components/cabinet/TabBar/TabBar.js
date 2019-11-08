import './TabBar.less';
import React from 'react';
import { BaseLink } from 'react-router5';
import router from '../../../../router';
import SVG from 'react-inlinesvg';
import * as PAGES from '../../../constants/pages';


const ToastsItem = props => (
  <BaseLink
    router={router}
    routeName={props.route}
    className="TabBar__item"
    activeClassName="active"
  >
    {props.children}
  </BaseLink>
)

export default function Toasts(props) {
  return (
    <div className="TabBar">
      <ToastsItem route={PAGES.PROFILE}><SVG src={require('../../../../asset/24px/user.svg')} /></ToastsItem>
      <ToastsItem route={PAGES.CABINET_WALLET}><SVG src={require('../../../../asset/24px/wallet.svg')} /></ToastsItem>
      <ToastsItem route={PAGES.INVESTMENTS}><SVG src={require('../../../../asset/24px/invest.svg')} /></ToastsItem>
      {/*<ToastsItem route={PAGES.EXCHANGE}><SVG src={require('../../../asset/24px/loop.svg')} /></ToastsItem>*/}
      <ToastsItem route={PAGES.MENU}><SVG src={require('../../../../asset/24px/menu.svg')} /></ToastsItem>
    </div>
  )
}