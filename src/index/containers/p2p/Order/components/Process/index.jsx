import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, Col } from 'ui';
import { CabinetBlock } from 'dapp';
import { OrderCreatedInfo, Method } from '..';
import { Steps, Submit, Info } from './components';

// Utils
import { classNames as cn } from 'utils';
import {
  p2pMode,
  orderProcesses as processes,
} from 'src/index/constants/dapp/types';
import { testPayments } from '../../../Orders/components/Filters/testItems';

// Styles
import './index.less';

function Process({
  adaptive,
  mode,
  process,
  onNotifySeller,
  onPaymentReceived,
  onCancel,
  visitorMode = 'user',
}) {
  const visitorIsModerator = visitorMode === 'moderator';

  const renderInfo = () => {
    const ItemsComponent = adaptive ? Col : Row;

    return (
      <div className="p2p-order-process-info">
        <h5 className="p2p-order-process__title">Confirm order info</h5>
        <ItemsComponent className="p2p-order-process-info__items">
          <Info
            adaptive={adaptive}
            title="Amount"
            prefix="Rp"
            number={600812255}
            className={
              mode === p2pMode.buy ? 'green-color' : 'orange-red-color'
            }
          />
          <Info
            adaptive={adaptive}
            title="Price"
            prefix="Rp"
            number={15555000}
          />
          <Info
            adaptive={adaptive}
            title="Quantity"
            currency="USDT"
            number={389.88}
          />
          {adaptive && (
            <>
              <div className="p2p-order-process-info__line" />
              <OrderCreatedInfo adaptive={adaptive} />
              <div className="p2p-order-process-info__line" />
            </>
          )}
        </ItemsComponent>
      </div>
    );
  };

  const renderContent = () => {
    const isBuyPayment = process === processes.buy.payment;
    const isSellReleasing = process === processes.sell.releasing;
    const isSideline = !visitorIsModerator && (isBuyPayment || isSellReleasing);

    return (
      <div
        className={cn('p2p-order-process-content', {
          sideline: isSideline,
        })}
      >
        {renderInfo()}
        <Method
          selectedMethod={testPayments[0]}
          process={process}
          adaptive={adaptive}
        />
        <Submit
          process={process}
          adaptive={adaptive}
          onNotifySeller={onNotifySeller}
          onPaymentReceived={onPaymentReceived}
          onCancel={onCancel}
        />
      </div>
    );
  };

  return (
    <CabinetBlock className={cn('p2p-order-process', process)}>
      {!visitorIsModerator && (
        <Steps mode={mode} process={process} adaptive={adaptive} />
      )}
      {renderContent()}
    </CabinetBlock>
  );
}

Process.propTypes = {
  adaptive: PropTypes.bool,
  mode: PropTypes.oneOf(Object.values(p2pMode)),
  process: PropTypes.oneOf([
    ...Object.values(processes.buy),
    ...Object.values(processes.sell),
  ]),
  onNotifySeller: PropTypes.func,
  onPaymentReceived: PropTypes.func,
  onCancel: PropTypes.func,
  visitorMode: PropTypes.string,
};

export default Process;
