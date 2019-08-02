import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import PieChart from 'react-minimal-pie-chart';

import { formatNumber, formatDouble, classNames } from '../../../../utils';
import { getGradientByCurrency, getColorByCurrency } from '../../../../utils/currencies';

const getWalletsBalance = (wallets, isInFiat) => {
  let walletsAmount = 0;
  let balancePieStyle = '';
  let walletsBalanceInUSD = 0;
  let walletsCurrencies = [];
  
  wallets.forEach(item => {
    walletsAmount += item.amount;
    walletsBalanceInUSD += item.amount * item.to_usd;
  });

  if (walletsAmount === 0) {
    return null;
  }

  wallets.forEach((wallet, i) => {
    if (wallet.amount !== 0) {
      const color = getColorByCurrency(wallet.currency);

      let value;
      if (isInFiat) {
        value = (wallet.amount * wallet.to_usd) / walletsBalanceInUSD * 100;
      } else {
        value = wallet.amount / walletsAmount * 100
      }

      walletsCurrencies.push({
        color,
        currency: wallet.currency,
        value: formatDouble(value, 100),
      });
    } 
  });

  return {
    walletsBalanceInUSD,
    walletsCurrencies,
    balancePieStyle,
  }
};

function WalletBalance({ wallets }) {
  const [ isInFiat, setIsInFiat ] = useState(true);
  const walletsBalance = getWalletsBalance(wallets, isInFiat);

  return (
    <div className="WalletBalance Content_box">
      {walletsBalance
        ? (
          <>
            <div className="WalletBalance__list">
              <h3>Wallets Balance</h3>

              <ul>
                {walletsBalance.walletsCurrencies.map(wallet => {
                  const gradient = getGradientByCurrency(wallet.currency);
                  return (
                    <div key={wallet.currency} className="WalletBalance__list__item">
                      <span className="WalletBalance__list__item_dot" style={{ background: gradient }} />
                      <li key={wallet.currency}>
                        <span>{wallet.value}%</span>
                        {wallet.currency.toUpperCase()}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>

            <div className="WalletBalance__pie">
              <PieChart
                lineWidth={20}
                paddingAngle={1}
                data={walletsBalance.walletsCurrencies}
              />

              <div className="WalletBalance__pie__balance">
                <h3>${formatNumber(walletsBalance.walletsBalanceInUSD)}</h3>
                <div>
                  <p className={classNames({ active: isInFiat })} onClick={() => setIsInFiat(true)}>USD</p>
                  <p className={classNames({ active: !isInFiat })} onClick={() => setIsInFiat(false)}>BTC</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="Empty_box">
            <SVG src={require('../../../../asset/cabinet/wallet_colorful.svg')} />
            <h3>
              Here will be balance statistics
            </h3>
          </div>
        )
      }
    </div>
  )
}

export default React.memo(WalletBalance);