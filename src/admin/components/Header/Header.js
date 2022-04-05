import "./Header.less";
import React, {useEffect, useState,} from "react";
import { useDispatch } from "react-redux";

import Logo from "../../../ui/components/Logo/Logo";
import * as auth from "../../../actions/auth";
import { BaseLink } from "react-router5";
import router from "../../../router";
import * as PAGES from "../../constants/pages";
import ContentBox from "../../../ui/components/ContentBox/ContentBox";
import web3Backend from 'services/web3-backend';
import {WEI_ETHER, NANO} from 'src/index/constants/cabinet';
import currencies from 'src/currencies';
import getFinePrice from 'utils/get-fine-price';
import {
  web3SetData,
} from 'actions/cabinet/web3';

const renderBalance = balance => {
  return Object.keys(balance).map(token => {
    const amount = balance[token];
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

  const dispatch = useDispatch();
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    Promise.all([
      web3Backend.getDefaultAccountBalances(),
      web3Backend.getAllRates(),
      web3Backend.getCommissions(),
      web3Backend.getDefaultAccountBalances('TON'),
    ]).then(data => {
      Object.keys(data[0]).map(token => {
        data[0][token] = Number(data[0][token]) / WEI_ETHER;
      });
      Object.keys(data[3]).map(token => {
        data[3][token] = Number(data[3][token]) / NANO;
      });

      const items = {...data[0], ...data[3]};
      setBalance(items);

      dispatch(web3SetData({
        balances: [{items}],
        rates: data[1],
        commissions: data[2],
      }));
    });
  }, []);

  console.log('BALANCE', balance);

  return (
    <ContentBox className="Header">
      <BaseLink router={router} routeName={PAGES.PANEL}>
        <Logo />
      </BaseLink>
      <div className="Header__title">Control Panel</div>
      <div className="Header__menu">
        <div className="Header-balances">
          {!!balance && renderBalance(balance)}
        </div>
        <div className="Header__menu_item" onClick={auth.logout}>
          Logout
        </div>
      </div>
    </ContentBox>
  );
};
