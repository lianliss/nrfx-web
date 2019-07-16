import React from 'react';
import SVG from 'react-inlinesvg';


function WalletBalance({ wallets }) {

  const getWalletsBalance = () => {
    let walletAmounts = 0;
    
    wallets.forEach(item => {
      walletAmounts += item.amount;
    });

    if (walletAmounts === 0) {
      return null;
    }
  }

  return (
    <div className="WalletBalance Content_box">
      {getWalletsBalance()
        ? (
          <>
            <div className="WalletBalance__list">
              <h3>Wallets Balance</h3>

              <ul>
                <li>
                  <span>50%</span>
                  BTC
                </li>
                <li>
                  <span>10%</span>
                  LTC
                </li>
                <li>
                  <span>32%</span>
                  ETH
                </li>
              </ul>
            </div>
            <div className="WalletBalance__pie">
              <div className="WalletBalance__pie__balance__wrapper">
                <div className="WalletBalance__pie__balance">
                  <h3>$2,999</h3>
                  <div>
                    <p className="active">BTN</p>
                    <p>LTC</p>
                  </div>
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

export default WalletBalance;