import React from 'react';

// Components
import { Modal } from 'src/ui';
import CabinetBlock from '../CabinetBlock/CabinetBlock';

// Styles
import './LiquidityConfirmModal.less';

function LiquidityConfirmModal(props) {
  return (
    <Modal className="LiquidityConfirmModal" skipClose {...props}>
      <CabinetBlock>asd</CabinetBlock>
    </Modal>
  );
}

export default LiquidityConfirmModal;
