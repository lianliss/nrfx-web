import React from 'react';

// Components
import DepositModal from '../../DepositModal';
import Sidebar from './components/Sidebar/Sidebar';
import { Row } from 'src/ui';

// Utils
import { classNames } from 'src/utils';

// Styles
import './Bank.less';

function Bank({ children, amount, currency, fee, size = 'medium', ...props }) {
  return (
    <DepositModal
      className={classNames({ DepositModal__Bank: true, [size]: size })}
      closeOfRef={props.adaptive}
      {...props}
    >
      <Row
        className="DepositModal__Bank__container"
        alignItems="stretch"
        wrap={props.adaptive}
      >
        {children}
      </Row>
    </DepositModal>
  );
}

export default Bank;
