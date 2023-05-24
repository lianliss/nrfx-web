import React from 'react';

// Components
import { Row, NumberFormat } from 'ui';
import { OrderInfoWrapper } from '..';

// Utils
import { classNames as cn } from 'utils';
import { p2pMode } from 'src/index/constants/dapp/types';

const OrderAmountItems = ({ mode, maxTrade, commission, fiat }) => (
  <Row
    className="p2p-modal-create-order-amount-items"
    justifyContent="space-between"
    gap="7px 0"
    wrap
  >
    <OrderInfoWrapper title="Commission">
      <span
        className={cn(
          {
            'green-color': mode === p2pMode.buy,
            'orange-red-color': mode === p2pMode.sell,
          },
          ' medium-fw'
        )}
      >
        <NumberFormat number={commission * 100} currency="%" />
      </span>
    </OrderInfoWrapper>
    <OrderInfoWrapper title="Avaible">
      <span className="black-gunmetal-color medium-fw">
        <NumberFormat number={maxTrade} currency={fiat.symbol} />
      </span>
    </OrderInfoWrapper>
  </Row>
);

export default OrderAmountItems;
