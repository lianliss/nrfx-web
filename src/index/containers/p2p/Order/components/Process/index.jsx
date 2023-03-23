import React from 'react';

// Components
import { Row } from 'ui';
import { CabinetBlock } from 'dapp';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function Process() {
  const Step = ({ number, title, active }) => (
    <div className={cn('p2p-order-process-step', { active })}>
      <div className="p2p-order-process-step__number">
        <div>{number}</div>
      </div>
      <p>{title}</p>
    </div>
  );

  return (
    <CabinetBlock className="p2p-order-process">
      <div className="p2p-order-process-steps">
        <Step active number={1} title="Transfer payment to Seller" />
        <Step number={2} title="Pending Seller to Realease Cryptos" />
        <Step number={3} title="Completed" />
      </div>
    </CabinetBlock>
  );
}

export default Process;
