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
  order,
  onNotifySeller,
  onPaymentReceived,
  onCancel,
}) {
  const {
    fiat,
    fiatAmount,
    moneyAmount,
  } = order;
  const symbol = _.get(fiat, 'symbol', '');
  
  const renderInfo = () => {
    const ItemsComponent = adaptive ? Col : Row;

    return (
      <div className="p2p-order-process-info">
        <h5 className="p2p-order-process__title">Confirm order info</h5>
        <ItemsComponent className="p2p-order-process-info__items">
          <Info
            adaptive={adaptive}
            title="Amount"
            number={moneyAmount}
            currency={symbol}
            className={
              mode === p2pMode.buy ? 'green-color' : 'orange-red-color'
            }
          />
          <Info
            adaptive={adaptive}
            title="Price"
            currency={symbol}
            number={fiatAmount}
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

  const renderContent = () => (
    <div
      className={cn('p2p-order-process-content', {
        sideline:
          order.status,
      })}
    >
      {renderInfo()}
      <Method
        selectedMethod={order.bank}
        process={order}
        adaptive={adaptive}
      />
      <Submit
        order={order}
        adaptive={adaptive}
        onNotifySeller={onNotifySeller}
        onPaymentReceived={onPaymentReceived}
        onCancel={onCancel}
      />
    </div>
  );

  return (
    <CabinetBlock className={cn('p2p-order-process', order)}>
      <Steps mode={mode} order={order} adaptive={adaptive} />
      {renderContent()}
    </CabinetBlock>
  );
}

export default Process;
