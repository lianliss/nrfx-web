import React from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import { web3RatesSelector, adaptiveSelector } from 'src/selectors';
import wei from 'utils/wei';
import { classNames, getLang } from "src/utils";
import getFinePrice from 'utils/get-fine-price';
import * as actions from "src/actions";

// Components
import SVG from 'utils/svg-wrap';
import { ContentBox, Button, Timer, BankLogo, Input } from 'src/ui';
import TokenSelect from 'src/index/containers/dapp/DexSwap/components/TokenSelect/TokenSelect';
import DappInput from '../../../DappInput/DappInput';
import Lang from "src/components/Lang/Lang";
import DexSwapInput from 'src/index/containers/dapp/DexSwap/components/DexSwapInput/DexSwapInput';
import limits from 'src/index/constants/fiats';
import * as toast from "src/actions/toasts";
import CabinetModal from '../../../Modals/CabinetModal/CabinetModal';

// Styles
import './ExchangerSwap.less';

function ExchangerSwap(props) {
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
  const [fiatValue, setFiatValue] = React.useState('');
  const handleFiatInput = newValue => {
    setFiatValue(newValue);
  };

  // Calculate amount
  const fiatCommission = (Number(_.get(commissions, `${fiatSymbol.toLowerCase()}`, 0)) || 0) / 100;
  const coinCommission = (Number(_.get(commissions, `${coinSymbol.toLowerCase()}`, commissions.default)) || 0) / 100;
  const rate = (fiatPrice * (1 - fiatCommission)) / coinPrice;
  const fiatAmount = Number(fiatValue) || 0;
  const coinAmount = fiatAmount * rate * (1 - coinCommission);
  const rateDisplay = 1 / rate / (1 - coinCommission);

  // Button availability
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingTime, setProcessingTime] = React.useState(false);
  const isAvailableOfFiat = fiatBalance >= fiatAmount;
  const isAvailableOfMax = coinAmount <= maxCoinAmount;
  const isAvailableOfMin = coinAmount >= minCoinAmount;
  const isAvailable = isAvailableOfMin && isAvailableOfMax && isAvailableOfFiat;

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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
      const result = await exchange(fiatSymbol, coinSymbol, fiatAmount, {
        symbol: coinSymbol,
        isInProgress: true,
        text: `Your tokens will be sent to your wallet\nwithin five minutes`,
        token: coin,
      });
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
    <ContentBox className={`ExchangerSwap ${isAdaptive && 'adaptive'}`}>
      <div className="SwapForm__formWrapper">
        <div className="SwapForm__form">
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__dropdown" onClick={fiatSelector}>
              <div className="ExchangerSwap__icon" style={{
                backgroundImage: `url('${_.get(fiat, 'logoURI', '')}')`
              }} />
              <div className="ExchangerSwap__select">
                {/*<span>{_.get(fiat, 'name', 'Unknown')}</span>*/}
                <div className="ExchangerSwap__currency">
                  <span>{_.get(fiat, 'symbol', 'Unknown')}</span>
                  <SVG
                    src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
                  />
                </div>
              </div>
              <div className="ExchangerSwap__dropdown-rate">
                1 {fiatSymbol} ≈ {getFinePrice(1 / rateDisplay)} {coinSymbol}
              </div>
            </div>
          </div>
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__fiat-amount">
              <DappInput placeholder="0.00"
                     onChange={handleFiatInput}
                     value={fiatValue}
                     type="number"
                     textPosition="right" />
              <span className="ExchangerSwap__link" onClick={() => handleFiatInput(fiatBalance)}>
                Balance: {getFinePrice(fiatBalance)} {fiatSymbol}
              </span>
              {isAdaptive && <div className="ExchangerSwap__rate">
                1 {fiatSymbol} ≈ {getFinePrice(1 / rateDisplay)} {coinSymbol}
              </div>}
            </div>
          </div>
        </div>
        <div className="SwapForm__separator">
          <div
            className="SwapForm__switchButton"
            onClick={() => {
              return; // TODO unlock swap switch buttun
            }}
          >
            {isAdaptive ? (
              <SVG src={require('src/asset/icons/swap.svg')} />
            ) : (
              <SVG src={require('src/asset/24px/switch.svg')} />
            )}
          </div>
        </div>
        <div className="SwapForm__form">
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__dropdown" onClick={coinSelector}>
              <div className="ExchangerSwap__icon" style={{
                backgroundImage: `url('${_.get(coin, 'logoURI', '')}')`
              }} />
              <div className="ExchangerSwap__select">
                {/*<span>{_.get(coin, 'name', 'Unknown')}</span>*/}
                <div className="ExchangerSwap__currency">
                  <span>{_.get(coin, 'symbol', 'Unknown')}</span>
                  <SVG
                    src={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
                  />
                </div>
              </div>
              <div className="ExchangerSwap__dropdown-rate">
                1 {coinSymbol} ≈ {getFinePrice(rateDisplay)} {fiatSymbol}
              </div>
            </div>
          </div>
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__fiat-amount">
              <DappInput placeholder="0.00"
                     disabled
                     value={`≈ ${getFinePrice(coinAmount)}`}
                     textPosition="right"
                     error={!!(coinAmount && !isAvailableOfMin)} />
              <span
                className={classNames({
                  ['error-orange']:
                    coinAmount && !isAvailableOfMin,
                })}
              >
                Min: {getFinePrice(minCoinAmount)} {coinSymbol}
              </span>
              {isAdaptive && (
                <div
                  className={classNames({
                    ExchangerSwap__rate: true,
                    ['error-orange']:
                      coinAmount && !isAvailableOfMin,
                  })}
                >
                  1 {coinSymbol} ≈ {getFinePrice(rateDisplay)} {fiatSymbol}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isConnected ? <div className="ExchangerSwap__actions-buy">
        <Button className=""
                state={isProcessing ? 'loading' : ''}
                disabled={!isAvailable}
                onClick={swapTokens}>
          Exchange
        </Button>
      </div> : <div className="ExchangerSwap__actions-buy"><Button className="" onClick={connectWallet}>
        {getLang('dapp_global_connect_wallet')}
      </Button></div>}
      {isSelectFiat && 
        <CabinetModal onClose={() => setIsSelectFiat(false)}>
          <TokenSelect
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
            disableName
            loadAccountBalances={() => {
              console.log('LOAD');
            }}
            size="small"
          />
        </CabinetModal>
      }
      {isSelectCoin &&
      <CabinetModal onClose={() => setIsSelectCoin(false)}>
        <TokenSelect
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
        />
      </CabinetModal>
      }
    </ContentBox>
  )
}

export default ExchangerSwap;
