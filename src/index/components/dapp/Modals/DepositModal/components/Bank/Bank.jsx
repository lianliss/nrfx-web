import React from 'react';

// Components
import DepositModal from '../../DepositModal';
import Sidebar from './components/Sidebar/Sidebar';
import { Row } from 'src/ui';

// Styles
import './Bank.less';

function Bank({ children, amount, currency, fee, ...props }) {
  return (
    <DepositModal className="DepositModal__Bank" {...props}>
      <Row className="DepositModal__Bank__container">
        {children}
      </Row>
    </DepositModal>
  );
}

export default Bank;
