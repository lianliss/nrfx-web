import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

// Utils
import {
  setExchangeAmount,
  setExchangeFocus
} from 'src/actions/dapp/exchange';
import {
  dappExchangeAmountSelector,
  dappExchangeFocusSelector,
} from 'src/selectors';
import { getFixedNumber } from 'src/utils';

// Styles
import './ExchangerSwap.less';

function getTokenPrice(token) {
  const rates = useSelector(web3RatesSelector);
  const isFiat = _.get(token, 'isFiat', false);
  const symbol = _.get(token, 'symbol');
  let price;
  switch (symbol) {
    case 'NRFX': price = _.get(rates, 'nrfx', 0); break;
    case 'USDC':
    case 'USD': price = 1; break;
    default: price = isFiat
      ? _.get(rates, symbol.toLowerCase(), 0)
      : _.get(rates, `${symbol}USDT`, 0);
  }
  return price;
}

function getDefaultCommission(token, _commissions) {
  if (!token) return 0;
  const commissions = _commissions || useSelector(state => _.get(state, 'web3.commissions', {}));
  return token.isFiat
    ? _.get(commissions, 'FiatDefault', 0)
    : _.get(commissions, 'BinanceDefault', 0);
}

// For asynchronous amounts check
let inputAmount, outputAmount;

function ExchangerSwap(props) {
  const dispatch = useDispatch();
  const isAdaptive = useSelector(adaptiveSelector);
  const commissions = useSelector(state => _.get(state, 'web3.commissions', {}));
  const route = useSelector(state => state.router.route);
  const context = React.useContext(Web3Context);
  const {
    isConnected, loadAccountBalances,
    network, getTokenContract,
    getTokenBalance,
  } = context;
  const {
    fiats, fiat, coins, coin,
    setFiat, setCoin,
    fiatsLoaded,
  } = props;
  const [isSelectFiat, setIsSelectFiat] = React.useState(false);
  const [isSelectCoin, setIsSelectCoin] = React.useState(false);
  // Display rate
  const [outputRate, setOutputRate] = React.useState(0);
  const [isExactOut, setIsExactOut] = React.useState(false);
  const [paramsTokenLoaded, setParamsTokensLoaded] = React.useState({
    token: false,
    fiat: false
  });

  // Symbols
  const fiatSymbol = _.get(fiat, 'symbol', '');
  const coinSymbol = _.get(coin, 'symbol', '');

  // Fiat price
  const fiatBalance = wei.from(_.get(fiat, 'balance', "0"), _.get(fiat, 'decimals', 18));
  const fiatPrice = getTokenPrice(fiat);

  // Calculate coin price
  const coinPrice = getTokenPrice(coin);

  // input values
  const inputFocus = useSelector(dappExchangeFocusSelector);
  const fiatValue = useSelector(dappExchangeAmountSelector('from')) || 0;
  const coinValue = useSelector(dappExchangeAmountSelector('to')) || 0;

  // Calculate amount
  const fiatCommission = (Number(_.get(
    commissions,
    `${fiatSymbol.toLowerCase()}`,
    getDefaultCommission(fiat, commissions),
  ))) / 100;
  const coinCommission = (Number(_.get(
    commissions,
    `${coinSymbol.toLowerCase()}`,
    getDefaultCommission(coin, commissions)
    )) || 0) / 100;
  const rate = (fiatPrice * (1 - fiatCommission)) / coinPrice;
  const fiatAmount = Number(fiatValue) || 0;
  const coinAmount = Number(coinValue);

  // Button availability
  const [isProcessing] = React.useState(false);
  
  // Get output amount for connected and not connected states
  const getOutAmount = async inAmount => {
    try {
      if (isConnected) {
        const data = await getTokenContract(fiat).getOutAmount(coin, inAmount);
        return _.get(data, 'outAmount', 0);
      } else {
        return inAmount * rate * (1 - coinCommission);
      }
    } catch (error) {
      console.error('[ExchangerSwap][getOutAmount]', error);
      return 0;
    }
  };
  
  // Get input amount for connected and not connected states
  const getInAmount = async outAmount => {
    try {
      if (isConnected) {
        const data = await getTokenContract(fiat).getInAmount(coin, outAmount);
        return _.get(data, 'inAmount', 0);
      } else {
        return outAmount / (rate * (1 - coinCommission));
      }
    } catch (error) {
      console.error('[ExchangerSwap][getInAmount]', error);
      return 0;
    }
  };

  const handleFiatInput = newValue => {
    inputAmount = newValue;
    dispatch(setExchangeAmount(newValue, 'from'));
    setIsExactOut(false);
    
    if (newValue) {
      getOutAmount(newValue).then(outAmount => {
        if (inputAmount !== newValue) return;
        dispatch(setExchangeAmount(getFixedNumber(outAmount, 5), 'to'));
        outputAmount = outAmount;
      }).catch(e => console.error('[handleFiatInput]', e));
    } else {
      dispatch(setExchangeAmount(null, 'to'));
      outputAmount = 0;
    }
  };

  const handleCoinInput = newValue => {
    outputAmount = newValue;
    dispatch(setExchangeAmount(newValue, 'to'));
    setIsExactOut(true);
  
    if (newValue) {
      getInAmount(newValue).then(inAmount => {
        if (outputAmount !== newValue) return;
        dispatch(setExchangeAmount(getFixedNumber(inAmount, 5), 'from'));
        inputAmount = inAmount;
      }).catch(e => console.error('[handleCoinInput]', e));
    } else {
      dispatch(setExchangeAmount(null, 'from'));
      inputAmount = 0;
    }
  };

  function fiatSelector() {
    setIsSelectFiat(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  function coinSelector() {
    setIsSelectCoin(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  const handleFiatChange = (value) => {
    setFiat(value);
    setIsSelectFiat(false);
  };

  const handleCoinChange = (value) => {
    setCoin(value);
    setIsSelectCoin(false);
  };

  const setParamsCoin = (tokens) => {
    if(paramsTokenLoaded.token) return;

    const { params } = route;
    const paramCoinSymbol = params.coin && params.coin.toLowerCase();
    if(!paramCoinSymbol) return;
    const paramCoin = tokens.find(
      (coin) => coin.symbol.toLowerCase() === paramCoinSymbol
    );

    if (!paramCoin) return;
    handleCoinChange(paramCoin);
  };

  const setParamsFiat = async (tokens) => {
    const { params } = route;
    const paramFiatSymbol = params.currency && params.currency.toLowerCase();

    if(!paramFiatSymbol) {
      handleFiatChange(fiats[0]);
      return;
    }

    const paramFiat = tokens.find(
      (fiat) => fiat.symbol.toLowerCase() === paramFiatSymbol
    );

    if (!paramFiat) return;
    if (!paramFiat.balance) {
      const balance = await getTokenBalance(paramFiat.address);
      handleFiatChange({ ...paramFiat, balance });
      return;
    }

    handleFiatChange(paramFiat);
  };

  // Fetch the outAmount and set it to the state.
  const handleFetchOutAmount = async () => {
    const outAmount = await getOutAmount(1);
    if (!outAmount || !isFinite(outAmount)) return;

    setOutputRate(outAmount);
    return outAmount;
  }

  React.useEffect(() => {
    if (paramsTokenLoaded.fiat && paramsTokenLoaded.token) return;
    if (!isConnected) return;
    if (fiats.length <= 1 || coins.length <= 1) return;

    const allTokens = [...fiats, ...coins];
    setParamsFiat(allTokens);
    setParamsTokensLoaded((state) => ({ ...state, fiat: true }));
    setParamsCoin(allTokens);
    setParamsTokensLoaded((state) => ({ ...state, token: true }));
  }, [fiats, coins, isConnected]);

  React.useEffect(() => {
    if (inputFocus === 'to') {
      handleCoinInput(coinAmount);
      return;
    }

    handleFiatInput(fiatAmount);
  }, [fiat, coin]);

  // Get the out amount of coins changes.
  React.useEffect(() => {
    if (!fiat || !coin) return;

    setOutputRate(0);
    handleFetchOutAmount();
  }, [fiatSymbol, coinSymbol, isConnected]);

  // Get the out amount of fiatsLoaded.
  React.useEffect(() => {
    if (!fiatsLoaded) return;
    if (!fiat || !coin) return;
    if (!fiat.isFiat && !coin.isFiat) return;

    handleFetchOutAmount();
  }, [fiatsLoaded]);
  
  const isNoLiquidity = !!coinAmount !== !!fiatAmount;

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
                1 {fiatSymbol} ≈ {getFinePrice(outputRate)} {coinSymbol}
              </div>
            </div>
          </div>
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__fiat-amount">
              <DappInput placeholder="0.00"
                     onChange={handleFiatInput}
                     value={fiatValue}
                     type="number"
                     inputMode="decimal"
                     onFocus={() => {
                      dispatch(setExchangeFocus('from'));
                     }}
                     textPosition="right" />
              <span className="ExchangerSwap__link" onClick={() => handleFiatInput(fiatBalance)}>
                {getLang('dapp_global_balance')}:&nbsp;
                {getFinePrice(fiatBalance)} {fiatSymbol}
              </span>
              {isAdaptive && <div className="ExchangerSwap__rate">
                1 {fiatSymbol} ≈ {getFinePrice(outputRate)} {coinSymbol}
              </div>}
            </div>
          </div>
        </div>
        <div className="SwapForm__separator">
          <div
            className="ExchangerSwap__switchButton"
            onClick={() => {
              setFiat(coin);
              setCoin(fiat);
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
                1 {coinSymbol} ≈ {getFinePrice(outputRate ? 1 / outputRate : 0)}{' '}
                {fiatSymbol}
              </div>
            </div>
          </div>
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__fiat-amount">
              <DappInput placeholder="0.00"
                     value={coinAmount}
                     onChange={handleCoinInput}
                     type="number"
                     inputMode="decimal"
                     onFocus={() => {
                      dispatch(setExchangeFocus('to'));
                     }}
                     textPosition="right"
                     error={false} />
            </div>
          </div>
        </div>
      </div>
      {isConnected ? <div className="ExchangerSwap__actions-buy">
        <Button className=""
                disabled={!fiatAmount || !coinAmount}
                state={isProcessing ? 'loading' : ''}
                onClick={() => actions.openStateModal('exchanger', {
                  isExactOut,
                  fiat,
                  coin,
                  fiatAmount,
                  coinAmount,
                })}>
          {isNoLiquidity
            ? 'No liquidity found'
            : getLang('dapp_exchanger_exchange_button')}
        </Button>
      </div> : <div className="ExchangerSwap__actions-buy">
        <Button
          className=""
          onClick={() => actions.openStateModal('connect_to_wallet')}
        >
          {getLang('dapp_global_connect_wallet')}
        </Button>
      </div>}
      {isSelectFiat && 
        <CabinetModal onClose={() => setIsSelectFiat(false)}>
          <TokenSelect
            onChange={value => handleFiatChange(value)}
            onClose={() => setIsSelectFiat(false)}
            selected={fiat}
            commonBases={network.commonBases}
            isAdaptive={isAdaptive}
            {...context}
            defaultList="fiats"
            tokens={[
              ...coins,
            ]}
            fiats={fiats}
            loadAccountBalances={loadAccountBalances}
          />
        </CabinetModal>
      }
      {isSelectCoin &&
      <CabinetModal onClose={() => setIsSelectCoin(false)}>
        <TokenSelect
          onChange={value => handleCoinChange(value)}
          onClose={() => setIsSelectCoin(false)}
          selected={coin}
          commonBases={network.commonBases}
          isAdaptive={isAdaptive}
          {...context}
          tokens={[...coins]}
          fiats={fiats}
          loadAccountBalances={loadAccountBalances}
        />
      </CabinetModal>
      }
    </ContentBox>
  )
}

export default ExchangerSwap;
