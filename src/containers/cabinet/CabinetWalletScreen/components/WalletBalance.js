import React from 'react';
import SVG from 'react-inlinesvg';
import PieChart from 'react-minimal-pie-chart';

import { formatNumber } from '../../../../utils';
import { getGradientByCurrency, getColorByCurrency } from '../../../../utils/currencies';

const getWalletsBalance = (wallets) => {
  let walletsAmount = 0;
  let walletsBalanceInUSD = 0;
  let balancePieStyle = '';
  let walletsCurrencies = [];
  
  wallets.forEach(item => {
    walletsAmount += item.amount;
  });

  if (walletsAmount === 0) {
    return null;
  }

  wallets.forEach((wallet, i) => {
    if (wallet.amount !== 0) {
      const color = getColorByCurrency(wallet.currency);
      walletsBalanceInUSD += (wallet.amount * wallet.to_usd);

      walletsCurrencies.push({
        color,
        currency: wallet.currency,
        value: Math.floor(wallet.amount / walletsAmount * 100),
      });
    } 
  });

  return {
    walletsBalanceInUSD,
    walletsCurrencies,
    balancePieStyle,
  }
}

function WalletBalance({ wallets }) {
  const walletsBalance = getWalletsBalance(wallets);

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
                animate
                lineWidth={20}
                paddingAngle={1}
                data={walletsBalance.walletsCurrencies}
              />

              <div className="WalletBalance__pie__balance">
                <h3>${formatNumber(walletsBalance.walletsBalanceInUSD)}</h3>
                <div>
                  <p className="active">USD</p>
                  <p>BTC</p>
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