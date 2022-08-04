import React from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import { web3RatesSelector, adaptiveSelector } from 'src/selectors';
import wei from 'utils/wei';
import getFinePrice from 'utils/get-fine-price';
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
import './FiatSelector.less';

function FiatSelector(props) {
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
      actions.openModal("fiat_refill_card", {
        currency: fiatSymbol,
      });
    } else {
      actions.openModal("fiat_topup", {
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
    <ContentBox className="FiatSelector">
      <div className="FiatSelector__row">
        <div className="FiatSelector__dropdown">
          <div className="FiatSelector__icon" style={{
            backgroundImage: `url('${_.get(fiat, 'logoURI', '')}')`
          }} onClick={fiatSelector} />
          <div className="FiatSelector__select" onClick={fiatSelector}>
            <span>{_.get(fiat, 'name', 'Unknown')}</span>
            <div className="FiatSelector__currency">
              <span>{_.get(fiat, 'symbol', 'Unknown')}</span>
              <SVG
                src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
              />
            </div>
          </div>
        </div>
        <div className="FiatSelector__balance">
          <div className="FiatSelector__balance-number">
            {getFinePrice(fiatBalance)}
          </div>
          {(!!fiatBalance && !!fiatPrice) && <div className="FiatSelector__balance-price">
            {getFinePrice(fiatBalance * fiatPrice)}
          </div>}
          <div className="FiatSelector__track" onClick={() => addTokenToWallet(fiat)}>
            Track in wallet
          </div>
        </div>
      </div>
      {isSelectFiat && <TokenSelect
        onChange={value => {
          setFiat(value);
          setIsSelectFiat(false);
        }}
        onClose={() => setIsSelectFiat(false)}
        selected={fiat}
        isAdaptive={isAdaptive}
        {...context}
        tokens={fiats}
        disableSwitcher
        disableCommonBases
        loadAccountBalances={() => {
          console.log('LOAD');
        }}
      />}
      {isSelectCoin && <TokenSelect
        onChange={value => {
          setCoin(value);
          setIsSelectCoin(false);
        }}
        onClose={() => setIsSelectCoin(false)}
        selected={coin}
        isAdaptive={isAdaptive}
        {...context}
        tokens={coins}
        disableSwitcher
        loadAccountBalances={loadAccountBalances}
      />}
      <div className="FiatSelector__actions">
        {!!reservation
        ? <div className="FiatSelector__reservation">
            <div className="FiatSelector__reservation-bank">
              <BankLogo name={reservation.bank} />
            </div>
            <div className="FiatSelector__reservation-status">
              <span>
                <Lang
                  name={
                    reservation.status === "wait_for_pay"
                      ? "cabinet_fiatWallet_waitingForRefill"
                      : "cabinet_fiatWallet_waitingForReview"
                  }
                />
              </span>
              {reservation.status === "wait_for_pay" && <Timer
                hiddenAfterFinish
                onFinish={() => setReservation(null)}
                time={reservation.book_expiration * 1000}
              />}
            </div>
            <Button className="default middle"
                    onClick={() => actions.openModal("fiat_topup_card")}>
              <Lang name="global_open" />
            </Button>
          </div>
        : <>
          {isConnected
            ? <>
            <div className="FiatSelector__fiat-amount">
              <Input placeholder="0.00"
                     onTextChange={handleFiatInput}
                     value={fiatValue}
                     indicator={`From 5000 ${fiatSymbol}`} />
              <span onClick={() => handleFiatInput(fiatBalance)}>Max</span>
            </div>
            <Button className="default middle" onClick={topUp}>
              <Lang name="cabinet_fiatBalance_add" />
            </Button>
          </> : <Button className="default middle" onClick={connectWallet}>
            Connect Wallet
          </Button>}
        </>}
      </div>
      <div className="FiatSelector__swap">
        <div className="FiatSelector__dropdown">
          <div className="FiatSelector__icon" style={{
            backgroundImage: `url('${_.get(coin, 'logoURI', '')}')`
          }} onClick={coinSelector} />
          <div className="FiatSelector__select" onClick={coinSelector}>
            <span>{_.get(coin, 'name', 'Unknown')}</span>
            <div className="FiatSelector__currency">
              <span>{_.get(coin, 'symbol', 'Unknown')}</span>
              <SVG
                src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
              />
            </div>
          </div>
        </div>
        <div className="FiatSelector__coin">
          {!!coinAmount && <div className="FiatSelector__coin-amount">
            ≈ {!!coinAmount && getFinePrice(coinAmount)} <span>{coinSymbol}</span>
          </div>}
          {coinSymbol !== 'BNB' && <div className="FiatSelector__coin-track" onClick={() => addTokenToWallet(coin)}>
            Track in wallet
          </div>}
        </div>
        {isConnected && <div className="FiatSelector__actions-buy">
          <Button className="default middle"
                                state={isProcessing ? 'loading' : ''}
                                disabled={!isAvailable}
                                onClick={swapTokens}>
            Buy
          </Button>
          {isProcessing && <Timer
            hiddenAfterFinish
            onFinish={() => {}}
            time={processingTime}
          />}
        </div>}
      </div>
      <div className="FiatSelector__limits">
        <div className="FiatSelector__limits-row">
          <span>Price:</span>
          <span>
            1 {coinSymbol} ≈ {getFinePrice(rateDisplay)} {fiatSymbol}
          </span>
        </div>
        <div className="FiatSelector__limits-row">
          <span>Minimum:</span>
          <span>
            {getFinePrice(minCoinAmount)} {coinSymbol}
          </span>
        </div>
        <div className="FiatSelector__limits-row">
          <span>Maximum:</span>
          <span>
            {getFinePrice(maxCoinAmount)} {coinSymbol}
          </span>
        </div>
        <div className="FiatSelector__limits-row">
          <span>Time:</span>
          <span>
            ≈ {_.get(limits, 'time', 5)} min
          </span>
        </div>
      </div>
    </ContentBox>
  )
}

export default FiatSelector;
