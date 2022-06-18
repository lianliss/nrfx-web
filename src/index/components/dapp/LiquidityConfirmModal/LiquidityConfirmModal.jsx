import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { Modal, Button, BottomSheetModal, NumberFormat } from 'src/ui';
import { WalletIcon } from 'src/index/components/dapp';
import SVG from 'utils/svg-wrap';

// Utils
import { openStateModal } from 'src/actions';

// Styles
import './LiquidityConfirmModal.less';

function LiquidityConfirmModal(props) {
  const adaptive = useSelector((store) => store.default.adaptive);
  const Component = adaptive ? BottomSheetModal : Modal;

  return (
    <Component
      className="LiquidityConfirmModal"
      prefix="LiquidityConfirmModal"
      skipClose
      {...props}
    >
      <div className="LiquidityConfirmModal__row">
        <h2>You will receive</h2>
        <div className="close" onClick={props.onClose}>
          <SVG src={require('src/asset/icons/close-popup.svg')} />
        </div>
      </div>
      <div className="LiquidityConfirmModal__row">
        <span className="large-text">
          <NumberFormat number={4.78749} />
        </span>
        <WalletIcon currency="nrfx" size={41} />
        <WalletIcon currency="nrfx" size={41} />
      </div>
      <div className="LiquidityConfirmModal__row">
        <p className="medium-text">USDT/DUSD Pool Tokens</p>
      </div>
      <div className="LiquidityConfirmModal__row">
        <p className="small-text">
          Output is estimated. If the price changes by more than 0.8% your
          transaction will revert.
        </p>
      </div>
      <div className="LiquidityConfirmModal__row">
        <div className="LiquidityConfirmModal__result">
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark">USDT Deposited</span>
            <span className="default-text-dark">
              <WalletIcon currency="nrfx" size={24} marginRight={10} />
              <NumberFormat number={4.99437} />
            </span>
          </div>
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark">BUSD Deposited</span>
            <span className="default-text-dark">
              <WalletIcon currency="nrfx" size={24} marginRight={10} />
              <NumberFormat number={4.99437} />
            </span>
          </div>
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark">Rates</span>
            <span className="default-text-dark">
              <NumberFormat number={15.05} currency="usdt" />
              &nbsp;=&nbsp;
              <NumberFormat number={15.05} currency="busd" />
            </span>
          </div>
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark"></span>
            <span className="default-text-dark">
              <NumberFormat number={15.05} currency="usdt" />
              &nbsp;=&nbsp;
              <NumberFormat number={15.05} currency="busd" />
            </span>
          </div>
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark">Share of Pool:</span>
            <span className="default-text-dark">
              <NumberFormat number={0.01653} percent />
            </span>
          </div>
        </div>
      </div>
      <div className="LiquidityConfirmModal__row">
        <Button
          size="extra_large"
          type="lightBlue"
          onClick={() => {
            openStateModal('transaction_waiting');
          }}
        >
          Confirm Suppy
        </Button>
      </div>
    </Component>
  );
}

export default LiquidityConfirmModal;
