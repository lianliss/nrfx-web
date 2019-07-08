import React from 'react';


function WalletBalance({ cryptoList }) {
  return (
    <div className="WalletBalance Content_box">
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
    </div>
  )
}

export default WalletBalance;