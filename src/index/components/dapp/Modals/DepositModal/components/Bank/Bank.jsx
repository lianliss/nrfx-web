import React from 'react';

// Components
import DepositModal from '../../DepositModal';
import ChooseBank from './components/ChooseBank/ChooseBank';
import Sidebar from './components/Sidebar/Sidebar';
import { Row, Col } from 'src/ui';

// Styles
import './Bank.less';

function Bank() {
  return (
    <DepositModal className="DepositModal__Bank">
      <Row className="DepositModal__Bank__container">
        <Sidebar />
        <ChooseBank />
      </Row>
    </DepositModal>
  );
}

export default Bank;
