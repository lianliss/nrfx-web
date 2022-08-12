import React from 'react';

// Components
import { Col, NumberFormat } from 'src/ui';
import Lang from 'src/components/Lang/Lang';

// Styles
import './Sidebar.less';

function Sidebar({ amount, currency, fee }) {
  return (
    <div className="DepositModal__Bank__sidebar">
      <h4 className="default small secondary">
        <Lang name="cabinet_balanceDeposit" />
      </h4>
      <div className="DepositModal__Bank__sidebar-item">
        <p className="small default secondary">
          <Lang name="global_amount" />
        </p>
        <p className="small default dark">
          <NumberFormat number={amount} currency={currency} />
        </p>
      </div>
      <div className="DepositModal__Bank__sidebar-item">
        <p className="small default secondary">Fee</p>
        <p className="small default dark">
          <NumberFormat number={fee} currency={currency} />
        </p>
      </div>
      <div className="DepositModal__Bank__sidebar-item line" />
      <div className="DepositModal__Bank__sidebar-item">
        <p className="small default secondary">
          <Lang name="cabinet_fiatRefillModal_total" />
        </p>
        <p className="small default dark">
          <NumberFormat number={amount - fee} currency={currency} />
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
