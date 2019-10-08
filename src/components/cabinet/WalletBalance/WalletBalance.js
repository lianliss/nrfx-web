import './WalletBalance.less';
import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import PieChart from 'react-minimal-pie-chart';

import { formatNumber, classNames } from '../../../utils/index';
import { getGradientByCurrency, getColorByCurrency } from '../../../utils/currencies';
import * as actions from "../../../actions/index";
import * as utils from "../../../utils/index";
import UI from '../../../ui/index';
import * as currencies from "../../../utils/currencies";
import * as modalGroupActions from "../../../actions/modalGroup";

const getWalletsBalance = (wallets, isInFiat) => {
  let walletsAmount = 0;
  let balancePieStyle = '';
  let walletsBalanceInUSD = 0;
  let walletsBalanceInAlign = 0;
  let walletsCurrencies = [];
  
  wallets.forEach(item => {
    walletsAmount += item.amount;
    walletsBalanceInUSD += item.amount * item.to_usd;
    walletsBalanceInAlign += item.align;
  });

  if (walletsAmount === 0) {
    return null;
  }

  wallets.forEach((wallet, i) => {
    if (wallet.amount !== 0) {
      const color = getColorByCurrency(wallet.currency);
      walletsCurrencies.push({
        color,
        currency: wallet.currency,
        value: (wallet.amount * wallet.to_usd) / walletsBalanceInUSD * 100
      });
    } 
  });

  return {
    walletsBalanceInUSD,
    walletsBalanceInAlign,
    walletsCurrencies,
    balancePieStyle,
  }
};

function WalletBalance({ wallets, adaptive, title }) {
  const [ isInFiat, setIsInFiat ] = useState(true);
  const [ convert_currency, setConvert_currency ] = useState('BTC');
  const walletsBalance = getWalletsBalance(wallets, isInFiat);
  if (arguments[0].hasOwnProperty('walletSelected')) {
    if (arguments[0].walletSelected !== null) {
      const {amount, currency, to_usd, align} = arguments[0].walletSelected;
      const currencyInfo = actions.getCurrencyInfo(currency);
      const currencyName = utils.ucfirst(currencyInfo.name);
      const buttonBackgroundColor = currencies.getGradientByCurrency(currency);
      const convertBlock = <div className="WalletBalance__convert" onClick={() => {
        convert_currency === 'BTC' ? setConvert_currency('USD') : setConvert_currency('BTC')
      }}>
        <span>
          {amount > 0 ? ( convert_currency === 'BTC' ? align.toFixed(6) : (amount * to_usd).toFixed(2) ) : 0}
          {' ' + convert_currency}
        </span>
      </div>;
      return <div className="WalletBalance Content_box">
        {!adaptive && convertBlock}
        <div className="WalletBalance__selected_wallet">
          <div className="WalletBalance__currency_name">{utils.getLang('cabinet_walletTransactionModal_my')} {currencyName} {utils.getLang('cabinet_wallet')}</div>
          <div className="WalletBalance__selected_amount">
            {adaptive ? convertBlock : amount + ' ' + currency.toUpperCase()}
          </div>
          <div className="WalletBalance__selected_buttons">
            <UI.Button
              size={adaptive ? 'small' : 'large'}
              disabled={amount === 0}
              onClick={() => {modalGroupActions.openModalPage('send', {
                preset: currencyName
              })}}
              style={{background: buttonBackgroundColor}}
            >
              {utils.getLang('site__contactSend')}
            </UI.Button>
            <UI.Button
              size={adaptive ? 'small' : 'large'}
              onClick={() => {modalGroupActions.openModalPage('receive', {
                preset: currencyName
              })}}
              style={{background: buttonBackgroundColor}}
            >
              {utils.getLang('cabinet_walletTransactionModal_receive')}
            </UI.Button>
          </div>
        </div>
      </div>
    }
  }

  const balanceHeader = <h3 className="WalletBalance__header">
    {title || utils.getLang('cabinet_walletBalance_name')}
  </h3>;
  return (
    <div className="WalletBalance Content_box">
      {walletsBalance
        ? (
          <>
            {adaptive && balanceHeader}
            {adaptive && <div>
              <div className="WalletBalance__pie__balance" onClick={() => setIsInFiat(!isInFiat)}>
                <h3 style={!isInFiat ? {fontSize:20} : {}}>
                  <span>
                    {
                      isInFiat ? formatNumber(walletsBalance.walletsBalanceInUSD) +
                        '$' : (walletsBalance.walletsBalanceInAlign).toFixed(3) + ' BTC'
                    }
                  </span>
                </h3>
              </div>
            </div>}
            <div className="WalletBalance__adaptiveHelper">
              <div className="WalletBalance__list">
                {!adaptive && balanceHeader}
                <ul>
                  {walletsBalance.walletsCurrencies.map(wallet => {
                    const gradient = getGradientByCurrency(wallet.currency);
                    return (
                      <div key={wallet.currency} className="WalletBalance__list__item">
                        <span className="WalletBalance__list__item_dot" style={{ background: gradient }} />
                        <li key={wallet.currency}>
                          <span>{utils.formatDouble(wallet.value, 2)}%</span>
                          {wallet.currency.toUpperCase()}
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>

              <div className="WalletBalance__pie">
                {adaptive ? <PieChart
                  data={walletsBalance.walletsCurrencies}
                  paddingAngle={1}
                /> : <PieChart
                  lineWidth={20}
                  paddingAngle={1}
                  data={walletsBalance.walletsCurrencies}
                />}

                {!adaptive && <div className="WalletBalance__pie__balance">
                  <h3 style={!isInFiat ? {fontSize:20} : {}}>
                    {
                      isInFiat ? formatNumber(walletsBalance.walletsBalanceInUSD) +
                        '$' : (walletsBalance.walletsBalanceInAlign).toFixed(3) + ' BTC'
                    }
                  </h3>
                  <div>
                    <p className={classNames({ active: isInFiat })} onClick={() => setIsInFiat(true)}>USD</p>
                    <p className={classNames({ active: !isInFiat })} onClick={() => setIsInFiat(false)}>BTC</p>
                  </div>
                </div>}
              </div>
            </div>
          </>
        ) : (
          <div className="Empty_box">
            <SVG src={require('../../../asset/cabinet/wallet_colorful.svg')} />
            <h3>
              {utils.getLang('cabinet_walletBalance_statistics_placeholder')}
            </h3>
          </div>
        )
      }
    </div>
  )
}

export default React.memo(WalletBalance);