import React from 'react';

// Components
import { Modal } from 'src/ui';
import CabinetBlock from '../../CabinetBlock/CabinetBlock';

// Styles
import './DepositModal.less';

function DepositModal({ children, className, ...props }) {
  return (
    <Modal custom {...props} className={`DepositModal ${className}`}>
      <CabinetBlock className="DepositModal__container">
        {children}
      </CabinetBlock>
    </Modal>
  );
}

export default DepositModal;
