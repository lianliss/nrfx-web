import React from 'react';

//Styles
import './RecentTransactions.less';

function RecentTransactions() {
  return (
    <div className="RecentTransactions">
      <div className="RecentTransactions__header">
        <span>Recent transactions</span>
        <span>Clear All</span>
      </div>
      <div className="RecentTransactions__list">
        <div className="RecentTransactions__item">
          <span>Swap 11.9 USDT for 21 BSW  </span>
          <span>o</span>
        </div>
      </div>
    </div>
  );
}

export default RecentTransactions;
