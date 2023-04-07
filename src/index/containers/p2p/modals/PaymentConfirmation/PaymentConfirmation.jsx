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

function PaymentConfirmation({ mode = 'buy', ...props }) {
  const adaptive = useSelector(adaptiveSelector);

  const renderBody = () => {
    let Component = <></>;

    if (mode === p2pMode.buy) {
      Component = Buy;
    }

    if (mode === p2pMode.sell) {
      Component = Sell;
    }

    return (
      <Component prefix="p2p-modal-payment-confirmation" adaptive={adaptive} />
    );
  };

  return (
    <CabinetModal
      className="p2p-modal-payment-confirmation__wrapper"
      closeOfRef={adaptive}
      closeButton
      {...props}
    >
      {renderBody()}
    </CabinetModal>
  );
}

PaymentConfirmation.propTypes = {
  mode: PropTypes.oneOf(Object.keys(p2pMode)),
};

export default PaymentConfirmation;
