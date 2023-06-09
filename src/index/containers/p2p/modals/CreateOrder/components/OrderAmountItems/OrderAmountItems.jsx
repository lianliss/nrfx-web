import React from 'react';

// Components
import { Row, NumberFormat } from 'ui';
import { OrderInfoWrapper } from '..';

// Utils
import { classNames as cn } from 'utils';
import { p2pMode } from 'src/index/constants/dapp/types';

const OrderAmountItems = ({ mode }) => (
  <Row
    className="p2p-modal-create-order-amount-items"
    justifyContent="space-between"
    gap="7px 0"
    wrap
  >
    <OrderInfoWrapper title="Price">
      <span
        className={cn(
          {
            'green-color': mode === p2pMode.buy,
            'orange-red-color': mode === p2pMode.sell,
          },
          ' medium-fw'
        )}
      >
        <NumberFormat number={39.93} currency="USDT" />
      </span>
    </OrderInfoWrapper>
    <OrderInfoWrapper title="Avaible">
      <span className="black-gunmetal-color medium-fw">
        <NumberFormat number={220.0} currency="USDT" />
      </span>
    </OrderInfoWrapper>
  </Row>
);

export default OrderAmountItems;
