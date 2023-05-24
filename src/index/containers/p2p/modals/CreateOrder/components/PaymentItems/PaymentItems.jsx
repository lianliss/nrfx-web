import React from 'react';
import PropTypes from 'prop-types';

import { Row, NumberFormat } from 'ui';
import { OrderInfoWrapper } from '..';
import { PaymentItem } from 'src/index/components/p2p';
import { p2pMode } from 'src/index/constants/dapp/types';

const titles = {
  [p2pMode.buy]: {
    term: {
      desktop: 'Payment Time Limit',
      adaptive: 'Payment term',
    },
    payment: {
      desktop: 'Seller`s payment method',
      adaptive: 'Payment',
    },
  },
  [p2pMode.sell]: {
    term: {
      desktop: 'Payment Time Limit',
      adaptive: 'Payment term',
    },
    payment: {
      desktop: 'Buyer`s payment method',
      adaptive: 'Payment',
    },
  },
};

const getTitles = (text, mode, adaptive) => {
  return titles[mode][text][adaptive ? 'adaptive' : 'desktop'];
};

const PaymentItems = ({ adaptive, mode, selected, banks }) => (
  <Row
    className="p2p-modal-create-order-payment-items"
    justifyContent="space-between"
    gap="10px 0"
    wrap
  >
    <OrderInfoWrapper title={getTitles('term', mode, adaptive)}>
      <span className="black-gunmetal-color medium-fw">
        <NumberFormat number={15} /> Minutes
      </span>
    </OrderInfoWrapper>
    <OrderInfoWrapper title={getTitles('payment', mode, adaptive)}>
      <Row gap="10px 12px" wrap>
        {selected ? (
          <PaymentItem title={selected.title} />
        ) : (
          <>
            {banks.filter(b=>!!b).map((b, index) => <PaymentItem title={b.title} key={index} />)}
          </>
        )}
      </Row>
    </OrderInfoWrapper>
  </Row>
);

PaymentItems.propTypes = {
  adaptive: PropTypes.bool,
  selected: PropTypes.object,
  mode: PropTypes.oneOf(Object.keys(p2pMode)),
};

export default PaymentItems;
