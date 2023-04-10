import React from 'react';
import PropTypes from 'prop-types';
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
import { adaptiveSelector, dappP2PPaymentSelector } from 'src/selectors';
import { p2pMode } from 'src/index/constants/dapp/types';
import { closeStateModal } from 'src/actions';

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

const getTitle = (mode) => {
  if (mode === p2pMode.buy) {
    return 'Buy';
  }

  if (mode === p2pMode.sell) {
    return 'Sell';
  }
};

function CreateOrder({ mode, onClose, ...props }) {
  const adaptive = useSelector(adaptiveSelector);
  const selectedPayment = useSelector(dappP2PPaymentSelector(mode));

  return (
    <Wrapper adaptive={adaptive} onClose={closeStateModal} {...props}>
      <div>
        {adaptive && <h2>{getTitle(mode)} IDR</h2>}
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
      <Form
        mode={mode}
        adaptive={adaptive}
        selectedPayment={selectedPayment}
        onCancel={closeStateModal}
      />
    </Wrapper>
  );
}

CreateOrder.propTypes = {
  mode: PropTypes.oneOf(Object.values(p2pMode)),
};

export default CreateOrder;
