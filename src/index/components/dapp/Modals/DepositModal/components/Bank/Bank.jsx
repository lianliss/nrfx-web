import React from 'react';

// Components
import DepositModal from '../../DepositModal';
import Sidebar from './components/Sidebar/Sidebar';
import { Row, Col } from 'src/ui';

// Styles
import './Bank.less';

function Bank() {
  return (
    <DepositModal className="DepositModal__Bank">
      <Row>
        <Sidebar />
        <Col></Col>
      </Row>
    </DepositModal>
  );
}

export default Bank;
