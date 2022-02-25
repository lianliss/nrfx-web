import "./Header.less";
import React, {useEffect, useState,} from "react";

import Logo from "../../../ui/components/Logo/Logo";
import * as auth from "../../../actions/auth";
import { BaseLink } from "react-router5";
import router from "../../../router";
import * as PAGES from "../../constants/pages";
import ContentBox from "../../../ui/components/ContentBox/ContentBox";
import web3Backend from 'services/web3-backend';
import {WEI_ETHER} from 'src/index/constants/cabinet';
import currencies from 'src/currencies';
import getFinePrice from 'utils/get-fine-price';

const renderBalance = balance => {
  return Object.keys(balance).map(token => {
    const wei = balance[token];
    const amount = Number(wei) / WEI_ETHER;
    const currency = currencies[token];
    let color = currency && currency.gradient
      ? `linear-gradient(0deg, ${currency.gradient[0]} 0%, ${currency.gradient[1]} 100%)`
      : currency && currency.color
        ? currency.color
        : '#00B277';
    return <div className="Header-balance" key={token}>
      <div className="Header-balance-circle" style={{
        background: color,
      }} />
      <div className="Header-balance-amount">
        {getFinePrice(amount)}
      </div>
      <div className="Header-balance-currency">
        {token}
      </div>
    </div>
  })
}

export default props => {

  const [balance, setBalance] = useState(null);
  useEffect(() => {
    web3Backend.getDefaultAccountBalances().then(data => {
      setBalance(data);
    });
  }, []);

  console.log('balance', balance);

  return (
    <ContentBox className="Header">
      <BaseLink router={router} routeName={PAGES.PANEL}>
        <Logo />
      </BaseLink>
      <div className="Header__title">Control Panel</div>
      <div className="Header__menu">
        {!!balance && <div className="Header-balances">
          {renderBalance(balance)}
        </div>}
        <div className="Header__menu_item" onClick={auth.logout}>
          Logout
        </div>
      </div>
    </ContentBox>
  );
};
