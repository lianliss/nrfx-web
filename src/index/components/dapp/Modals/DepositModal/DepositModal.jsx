import React from 'react';

// Components
import { Modal } from 'src/ui';
import CabinetBlock from '../../CabinetBlock/CabinetBlock';
import CabinetModal from '../CabinetModal/CabinetModal';

// Styles
import './DepositModal.less';

function DepositModal({ children, className, ...props }) {
  return (
    <CabinetModal custom {...props} className={`DepositModal ${className}`}>
      <CabinetBlock className="DepositModal__container">
        {children}
      </CabinetBlock>
    </CabinetModal>
  );
}

export default DepositModal;
