import React from 'react';

// Components
import DepositModal from '../../DepositModal';
import Sidebar from './components/Sidebar/Sidebar';
import { Row } from 'src/ui';

// Styles
import './Bank.less';

function Bank({ children, ...props }) {
  return (
    <DepositModal className="DepositModal__Bank" {...props}>
      <Row className="DepositModal__Bank__container">
        <Sidebar />
        {children}
      </Row>
    </DepositModal>
  );
}

export default Bank;
