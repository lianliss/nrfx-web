import React from 'react';

// Components
import DepositModal from '../../DepositModal';
import ChooseBank from './components/ChooseBank/ChooseBank';
import ChoosedBank from './components/ChoosedBank/ChoosedBank';
import DepositTransfer from './components/DepositTransfer/DepositTransfer';
import Sidebar from './components/Sidebar/Sidebar';
import { Row } from 'src/ui';

// Styles
import './Bank.less';

function Bank() {
  return (
    <DepositModal className="DepositModal__Bank">
      <Row className="DepositModal__Bank__container">
        <Sidebar />
        {/* <ChooseBank /> */}
        <ChoosedBank />
        {/* <DepositTransfer /> */}
      </Row>
    </DepositModal>
  );
}

export default Bank;
