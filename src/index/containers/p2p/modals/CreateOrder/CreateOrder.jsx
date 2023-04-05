import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { CabinetModal } from 'dapp';
import { Row } from 'ui';
import { UserOrdersInfo } from 'src/index/components/p2p';
import {
  Form,
  TermsAndConditions,
  OrderAmountItems,
  PaymentItems,
} from './components';

// Utils
import { adaptiveSelector } from 'src/selectors';
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './CreateOrder.less';

const Wrapper = ({ children, adaptive, ...props }) => (
  <CabinetModal
    className="p2p-modal-create-order__wrapper"
    closeOfRef={adaptive}
    closeButton={adaptive}
    {...props}
  >
    <Row
      className="p2p-modal-create-order"
      alignItems="stretch"
      wrap={adaptive}
    >
      {children}
    </Row>
  </CabinetModal>
);

function CreateOrder({ mode = 'sell', ...props }) {
  const adaptive = useSelector(adaptiveSelector);
  const selectedPayment = null;

  return (
    <Wrapper adaptive={adaptive} {...props}>
      <div>
        <UserOrdersInfo
          name="mail****@gmail.com"
          ordersNumber={287}
          completion={85.7}
        />
        <OrderAmountItems mode={mode} />
        {!adaptive && (
          <PaymentItems
            selected={selectedPayment}
            mode={mode}
            adaptive={adaptive}
          />
        )}
        {mode === p2pMode.sell && !adaptive && (
          <TermsAndConditions mode={mode} />
        )}
      </div>
      <Form mode={mode} adaptive={adaptive} selectedPayment={selectedPayment} />
    </Wrapper>
  );
}

export default CreateOrder;
