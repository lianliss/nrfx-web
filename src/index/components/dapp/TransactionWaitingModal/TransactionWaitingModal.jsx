import React from 'react';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import SVG from 'utils/svg-wrap';

// Styles
import './TransactionWaitingModal.less';

function TransactionWaitingModal(props) {
  return (
    <TransactionModal
      title="Waiting for confirmation"
      className="TransactionWaitingModal__wrap"
      {...props}
    >
      <div className="TransactionWaitingModal">
        <div className="TransactionWaitingModal__icon">
          <SVG src={require('src/asset/icons/narfex/app-logo.svg')} />
        </div>
        <p className="medium-text">Sapplying 4.9943 USDT and 4.98754 BUSD</p>
        <p className="small-text">Confirm this transaction in your wallet</p>
      </div>
    </TransactionModal>
  );
}

export default TransactionWaitingModal;
