import React from 'react';

// Components
import TransactionModal from '../TransactionModal/TransactionModal';
import SVG from 'utils/svg-wrap';
import { NumberFormat } from 'src/ui';

// Styles
import './TransactionWaitingModal.less';

function TransactionWaitingModal({ token0, token1, ...props }) {
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
        <p className="medium-text">
          Supplying&nbsp;
          <NumberFormat number={token0.number} currency={token0.symbol} />
          &nbsp;and&nbsp;
          <NumberFormat number={token1.number} currency={token1.symbol} />
          &nbsp;
        </p>
        <p className="small-text">Confirm this transaction in your wallet</p>
      </div>
    </TransactionModal>
  );
}

export default TransactionWaitingModal;
