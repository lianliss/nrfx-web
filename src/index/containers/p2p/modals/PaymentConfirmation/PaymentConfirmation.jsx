import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { CabinetModal } from 'dapp';
import { Buy } from './components';

// Utils
import { adaptiveSelector } from 'src/selectors';
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './PaymentConfirmation.less';

function PaymentConfirmation({ mode = 'buy', ...props }) {
  const adaptive = useSelector(adaptiveSelector);

  const renderBody = () => {
    if (mode === p2pMode.buy) {
      return (
        <Buy prefix="p2p-modal-payment-confirmation" adaptive={adaptive} />
      );
    }
  };

  return (
    <CabinetModal
      className="p2p-modal-payment-confirmation__wrapper"
      closeOfRef={adaptive}
      closeButton={adaptive}
      {...props}
    >
      {renderBody()}
    </CabinetModal>
  );
}

export default PaymentConfirmation;
