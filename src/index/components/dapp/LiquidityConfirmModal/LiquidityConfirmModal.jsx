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

const processError = error => {
  const {message} = error;
  try {
    if (message.indexOf('Internal JSON-RPC error.') >= 0) {
      const internal = JSON.parse(message.split('Internal JSON-RPC error.')[1]);
      return internal.message;
    } else {
      return message;
    }
  } catch (err) {
    console.log('ERRR', err);
    return message;
  }
};

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
  const {
    getReserves,
    transaction, getTransactionReceipt,
    routerAddress, web3,
    accountAddress, bnb,
    getBSCScanLink,
    addTokenToWallet,
  } = context;
  const [pair, setPair] = React.useState(null);
  const adaptive = useSelector((store) => store.default.adaptive);
  const Component = adaptive ? BottomSheetModal : Modal;
  const [slippageTolerance, setSlippageTolerance] = React.useState(0.08);
  const [isTransaction, setIsTransaction] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  React.useEffect(() => {
    getReserves(pairAddress).then(data => {
      setPair(data[2]);
    });
  }, [pairAddress]);

  if (!pair) return (<Component
    className="LiquidityConfirmModal"
    prefix="LiquidityConfirmModal"
    skipClose
    {...props}
  >
    <LoadingStatus status={'loading'} />
  </Component>);

  const totalSupply = wei.from(pair.totalSupply);
  const reserve0 = wei.from(pair[selectedTokens[0].symbol]);
  const reserve1 = wei.from(pair[selectedTokens[1].symbol]);
  const lpTokens = Math.min(amount0 * totalSupply / reserve0, amount1 * totalSupply / reserve1);
  const isBNB = !selectedTokens[0].address || !selectedTokens[1].address;

  const addToken = () => {
    addTokenToWallet({
      address: pairAddress,
      symbol: `${selectedTokens[0].symbol}-${selectedTokens[1].symbol}`,
      decimals: 18,
    })
  };

  const supply = async () => {
    setIsTransaction(true);
    setErrorText('');
    try {
      const routerContract = new (web3.eth.Contract)(
        require('src/index/constants/ABI/PancakeRouter'),
        routerAddress,
      );
      let method = 'addLiquidity';
      const params = [
        selectedTokens[0].address,
        selectedTokens[1].address,
        wei.to(amount0, selectedTokens[0].decimals || 18),
        wei.to(amount1, selectedTokens[1].decimals || 18),
        wei.to(amount0 - amount0 * slippageTolerance, selectedTokens[0].decimals || 18),
        wei.to(amount1 - amount0 * slippageTolerance, selectedTokens[1].decimals || 18),
        accountAddress,
        Number(Date.now() / 1000 + 60 * 15).toFixed(0),
      ];
      console.log('[supply]', method, params);
      const txHash = await transaction(routerContract, method, params);
      const receipt = await getTransactionReceipt(txHash);
      console.log('[supply] Success', txHash, receipt);
      openStateModal('transaction_submitted', {
        txLink: getBSCScanLink(txHash),
        symbol: `${selectedTokens[0].symbol}-${selectedTokens[1].symbol}`,
        addToken,
        onClose: props.onClose,
      });
    } catch (error) {
      console.error('[LiquidityConfirmModal][supply]', error);
      setErrorText(processError(error));
    }
    setIsTransaction(false);
  };

  const supplyBNB = async () => {
    setIsTransaction(true);
    setErrorText('');
    try {
      const routerContract = new (web3.eth.Contract)(
        require('src/index/constants/ABI/PancakeRouter'),
        routerAddress,
      );
      let method = 'addLiquidityETH';
      const tokenIndex = Number(!selectedTokens[0].address);
      const token = selectedTokens[tokenIndex];
      const amount = tokenIndex ? amount1 : amount0;
      const bnbAmount = !tokenIndex ? amount1 : amount0;
      const params = [
        token.address,
        wei.to(amount, token.decimals || 18),
        wei.to(amount - amount * slippageTolerance, token.decimals || 18),
        wei.to(bnbAmount - bnbAmount * slippageTolerance, bnb.decimals || 18),
        accountAddress,
        Number(Date.now() / 1000 + 60 * 15).toFixed(0),
      ];
      console.log('[supplyBNB]', method, params, bnbAmount);
      const txHash = await transaction(
        routerContract, method, params, wei.to(bnbAmount, bnb.decimals || 18)
      );
      const receipt = await getTransactionReceipt(txHash);
      console.log('[supplyBNB] Success', txHash, receipt);
      openStateModal('transaction_submitted', {
        txLink: getBSCScanLink(txHash),
        symbol: `${selectedTokens[0].symbol}-${selectedTokens[1].symbol}`,
        addToken,
        onClose: props.onClose,
      });
    } catch (error) {
      console.error('[LiquidityConfirmModal][supplyBNB]', error);
      setErrorText(processError(error));
    }
    setIsTransaction(false);
  };

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
          disabled={isTransaction}
          state={isTransaction ? 'loading' : ''}
          onClick={() => {
            if (isBNB) {
              supplyBNB();
            } else {
              supply();
            }
            //openStateModal('transaction_waiting');
          }}
        >
          Confirm Suppy
        </Button>
      </div>
      {!!errorText.length && <div className="FarmingPopup__error">{errorText}</div>}
    </Component>
  );
}

export default LiquidityConfirmModal;
