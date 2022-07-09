import React from 'react';
import { useSelector } from 'react-redux';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';

// Components
import { Modal, Button, BottomSheetModal, NumberFormat } from 'src/ui';
import { WalletIcon } from 'src/index/components/dapp';
import SVG from 'utils/svg-wrap';
import { Web3Context } from 'services/web3Provider';
import LoadingStatus from 'src/index/components/cabinet/LoadingStatus/LoadingStatus';

// Utils
import { openStateModal } from 'src/actions';

// Styles
import './LiquidityConfirmModal.less';

function LiquidityConfirmModal(props) {
  const {
    selectedTokens,
    reserves,
    rate0,
    rate1,
    share,
    amount0,
    amount1,
    pairAddress,
  } = props;
  const context = React.useContext(Web3Context);
  const {pairs, getReserves} = context;
  const adaptive = useSelector((store) => store.default.adaptive);
  const Component = adaptive ? BottomSheetModal : Modal;

  React.useEffect(() => {
    getReserves();
  }, []);

  const pair = pairs[pairAddress];
  if (!pair) return (<Component
    className="LiquidityConfirmModal"
    prefix="LiquidityConfirmModal"
    skipClose
    {...props}
  >
    <LoadingStatus status={'loading'} />
  </Component>);

  console.log('pair', pair);
  const totalSupply = wei.from(pair.totalSupply);
  const reserve0 = wei.from(pair[selectedTokens[0].symbol]);
  const reserve1 = wei.from(pair[selectedTokens[1].symbol]);
  const lpTokens = Math.min(amount0 * totalSupply / reserve0, amount1 * totalSupply / reserve1);

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
          <NumberFormat number={lpTokens} />
        </span>
        <WalletIcon currency={selectedTokens[0].symbol} size={41} />
        <WalletIcon currency={selectedTokens[1].symbol} size={41} />
      </div>
      <div className="LiquidityConfirmModal__row">
        <p className="medium-text">{selectedTokens[0].symbol}/{selectedTokens[1].symbol} Pool Tokens</p>
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
            <span className="default-text-dark">{selectedTokens[0].symbol} Deposited</span>
            <span className="default-text-dark">
              <WalletIcon currency={selectedTokens[0].symbol} size={24} marginRight={10} />
              {getFinePrice(amount0)}
            </span>
          </div>
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark">{selectedTokens[1].symbol} Deposited</span>
            <span className="default-text-dark">
              <WalletIcon currency={selectedTokens[1].symbol} size={24} marginRight={10} />
              {getFinePrice(amount1)}
            </span>
          </div>
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark">Rates</span>
            <span className="default-text-dark">
              <NumberFormat number={1} currency={selectedTokens[0].symbol} />
              &nbsp;=&nbsp;
              <NumberFormat number={rate1} currency={selectedTokens[1].symbol} />
            </span>
          </div>
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark"></span>
            <span className="default-text-dark">
              <NumberFormat number={1} currency={selectedTokens[1].symbol} />
              &nbsp;=&nbsp;
              <NumberFormat number={rate0} currency={selectedTokens[0].symbol} />
            </span>
          </div>
          <div className="LiquidityConfirmModal__item">
            <span className="default-text-dark">Share of Pool:</span>
            <span className="default-text-dark">
              <NumberFormat number={share} percent />
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
