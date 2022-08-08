import React from 'react';

// Components
import { Row, Col, NumberFormat } from 'src/ui';

// Styles
import './Sidebar.less';

function Sidebar() {
  return (
    <Col className="DepositModal__Bank__sidebar">
      <h4 className="default small secondary">Balance Deposit</h4>
      <div className="DepositModal__Bank__sidebar-item">
        <p className="small default secondary">Amount</p>
        <p className="small default dark">
          <NumberFormat number={5000} currency="rub" />
        </p>
      </div>
      <div className="DepositModal__Bank__sidebar-item">
        <p className="small default secondary">Fee</p>
        <p className="small default dark">
          <NumberFormat number={100} currency="rub" />
        </p>
      </div>
      <div className="DepositModal__Bank__sidebar-item line" />
      <div className="DepositModal__Bank__sidebar-item">
        <p className="small default secondary">To be credited</p>
        <p className="small default dark">
          <NumberFormat number={4900} currency="rub" />
        </p>
      </div>
    </Col>
  );
}

export default Sidebar;
