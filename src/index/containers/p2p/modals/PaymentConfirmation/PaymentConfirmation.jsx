import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Components
import { CabinetModal } from 'dapp';
import { Buy, Sell } from './components';

// Utils
import { adaptiveSelector } from 'src/selectors';
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './PaymentConfirmation.less';

function PaymentConfirmation({ order, onConfirm, onCancel, onClose, ...props }) {

  const adaptive = useSelector(adaptiveSelector);

  const renderBody = () => {
    let Component = <></>;

    if (order.isBuy) {
      Component = Buy;
    } else {
      Component = Sell;
    }


    return (
      <Component
        prefix="p2p-modal-payment-confirmation"
        onConfirm={onConfirm}
        onCancel={onCancel}
        onClose={onClose}
        adaptive={adaptive}
        order={order}
      />
    );
  };

  return (
    <CabinetModal
      className="p2p-modal-payment-confirmation__wrapper"
      closeOfRef={adaptive}
      closeButton
      onClose={onClose}
      {...props}
    >
      {renderBody()}
    </CabinetModal>
  );
}

PaymentConfirmation.propTypes = {
  mode: PropTypes.oneOf(Object.values(p2pMode)),
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

PaymentConfirmation.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
};

export default PaymentConfirmation;
