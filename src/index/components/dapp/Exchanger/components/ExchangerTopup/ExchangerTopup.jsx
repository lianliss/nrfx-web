import React from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import { web3RatesSelector, adaptiveSelector } from 'src/selectors';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
import { getLang } from "src/utils";
import * as actions from "src/actions";

// Components
import SVG from 'utils/svg-wrap';
import { ContentBox, Button, Timer, BankLogo, Input } from 'src/ui';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import Lang from "src/components/Lang/Lang";
import DexSwapInput from 'src/index/containers/dapp/DexSwap/components/DexSwapInput/DexSwapInput';
import limits from 'src/index/constants/fiats';
import * as toast from "src/actions/toasts";

// Styles
import './ExchangerTopup.less';

const SVGContainer = ({ icon }) => {
  return (
    <div className={`${icon} ExchangerTopup__bg-icon`}>
      <SVG src={require(`asset/backgrounds/${icon}.svg`)} />
    </div>
  );
};

function ExchangerTopup(props) {

  const isAdaptive = useSelector(adaptiveSelector);
  const rates = useSelector(web3RatesSelector);
  const commissions = useSelector(state => _.get(state, 'web3.commissions', {}));
  const context = React.useContext(Web3Context);
  const {
    connectWallet, isConnected, addTokenToWallet,
    tokens, loadAccountBalances, exchange,
  } = context;
  const {
    fiats, fiat, coins, coin,
    setFiat, setCoin,
    reservation, setReservation
  } = props;
  const [isSelectFiat, setIsSelectFiat] = React.useState(false);
  const [isSelectCoin, setIsSelectCoin] = React.useState(false);

  // Symbols
  const fiatSymbol = _.get(fiat, 'symbol', '');
  const coinSymbol = _.get(coin, 'symbol', '');

  // Fiat price
  const fiatBalance = wei.from(_.get(fiat, 'balance', "0"));
  const fiatPrice = _.get(rates, fiatSymbol.toLowerCase(), 0);

  // Calculate coin price
  let coinPrice;
  switch (coinSymbol) {
    case 'NRFX': coinPrice = _.get(rates, 'nrfx', 0); break;
    case 'USDT': coinPrice = 1; break;
    default: coinPrice = _.get(rates, `${coinSymbol}USDT`, 0);
  }

  const limits = props.limits.find(l => l.coin === coinSymbol);
  const minCoinAmount = Math.max(_.get(limits, 'min', 0), 20 / coinPrice);
  const maxCoinAmount = _.get(limits, 'max', Infinity);

  // Fiat input value
  const [fiatValue, setFiatValue] = React.useState(null);
  const handleFiatInput = newValue => {
    if (isAdaptive) {
      setFiatValue(newValue);
      return;
    }
    let value = `${newValue}`;
    value = value.replace(',', '.');
    if (value.length >= 2 && value[0] === '0' && value[1] !== '.') {
      value = _.trimStart(value, '0');
    }
    if (!_.isNaN(Number(value)) || value === '.') {
      setFiatValue(value);
    }
  };

  // Calculate amount
  const commission = (Number(_.get(commissions, `${coinSymbol.toLowerCase()}`, commissions.default)) || 0) / 100;
  const rate = fiatPrice / coinPrice;
  const fiatAmount = Number(fiatValue) || 0;
  const coinAmount = fiatAmount * rate * (1 - commission);
  const rateDisplay = 1 / rate / (1 - commission);

  // Button availability
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingTime, setProcessingTime] = React.useState(false);
  const isAvailable = coinAmount >= minCoinAmount
    && coinAmount <= maxCoinAmount
    && fiatBalance >= fiatAmount;

  function fiatSelector() {
    if (!isConnected) {
      connectWallet()
        .then(() => setIsSelectFiat(true))
        .catch(error => {
          setIsSelectFiat(false);
        })
    } else {
      setIsSelectFiat(true);
    }
  }

  function coinSelector() {
    if (!isConnected) {
      connectWallet()
        .then(() => setIsSelectCoin(true))
        .catch(error => {
          setIsSelectCoin(false);
        })
    } else {
      setIsSelectCoin(true);
    }
  }

  function topUp() {
    if (reservation) {
      actions.openModal("deposit_choose_bank", {
        currency: fiatSymbol,
      });
    } else {
      actions.openModal("deposit_balance", {
        currency: fiatSymbol,
        amount: fiatAmount,
      });
    }
  }

  const swapTokens = async () => {
    setIsProcessing(true);
    setProcessingTime(Date.now() + 60000 * 5);
    try {
      const result = await exchange(fiatSymbol, coinSymbol, fiatAmount);
      console.log('[swapTokens]', result);
      toast.success('Exchange confirmed');
    } catch (error) {
      console.error('[swapTokens]', error);
      toast.error(_.get(error, 'data.message', error.message));
    }
    setIsProcessing(false);
    setProcessingTime(null);
  };

  return (
    <ContentBox className={`ExchangerTopup ${isAdaptive && 'adaptive'}`}>
      {!isAdaptive && <SVGContainer icon="exchanger-topup" />}
      <div className="ExchangerTopup__info">
        <div className="ExchangerTopup__info-label">
          {getLang('dapp_global_your_balance')}:
        </div>
        <div className={`ExchangerTopup__info-balance ${!!fiatBalance && 'active'}`}
             onClick={() => !!fiatBalance && addTokenToWallet(fiat)}>
          {getFinePrice(fiatBalance)} {fiatSymbol}
        </div>
      </div>
      <div className="ExchangerTopup__actions">
        {isConnected ? <>
          {!!reservation ? <>
          {(reservation.status !== 'wait_for_review' && reservation.status !== 'wait_for_admin_review')
            ? <Timer
              hiddenAfterFinish
              onFinish={() => setReservation(null)}
              time={reservation.book_expiration * 1000}
            /> : <span className="ExchangerTopup__waiting">{getLang('dapp_global_waiting_for_confirmation')}</span>}
          <Button type="secondary" onClick={topUp}>
            {getLang('dapp_global_view_details')}
          </Button>
          </> : <Button type="secondary" onClick={topUp}>
            {getLang('topup_button')}
          </Button>}
        </> : <Button type="secondary" onClick={connectWallet}>
          {getLang('dapp_global_connect_wallet')}
        </Button>}
      </div>
    </ContentBox>
  )

}

export default ExchangerTopup;
