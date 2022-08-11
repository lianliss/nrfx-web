import React from 'react';

// Components
import { Col, NumberFormat } from 'src/ui';

// Styles
import './Sidebar.less';

function Sidebar({ amount, currency, fee }) {
  return (
    <Col className="DepositModal__Bank__sidebar">
      <h4 className="default small secondary">Balance Deposit</h4>
      <div className="DepositModal__Bank__sidebar-item">
        <p className="small default secondary">Amount</p>
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
        <p className="small default secondary">To be credited</p>
        <p className="small default dark">
          <NumberFormat number={amount - fee} currency={currency} />
        </p>
      </div>
    </Col>
  );
}

export default Sidebar;
