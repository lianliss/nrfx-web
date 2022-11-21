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
import router from 'src/router';
import { setSwap } from 'src/actions/dapp/swap';
import * as PAGES from 'src/index/constants/pages';

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
    case 'USDT':
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

function ExchangerSwap(props) {
  const dispatch = useDispatch();
  const isAdaptive = useSelector(adaptiveSelector);
  const rates = useSelector(web3RatesSelector);
  const commissions = useSelector(state => _.get(state, 'web3.commissions', {}));
  const route = useSelector(state => state.router.route);
  const context = React.useContext(Web3Context);
  const {
    connectWallet, isConnected, addTokenToWallet,
    tokens, loadAccountBalances, exchange,
    exchangerRouter, getTokenContract,
    accountAddress,
    getTokenBalance,
  } = context;
  const {
    fiats, fiat, coins, coin,
    setFiat, setCoin, reservation,
    setReservation, fiatsLoaded,
  } = props;
  const [isSelectFiat, setIsSelectFiat] = React.useState(false);
  const [isSelectCoin, setIsSelectCoin] = React.useState(false);
  const [paramsTokenLoaded, setParamsTokensLoaded] = React.useState({
    token: false,
    fiat: false
  });
  const bnbToken = coins.find(c => c.symbol === 'BNB');

  // Symbols
  const fiatSymbol = _.get(fiat, 'symbol', '');
  const coinSymbol = _.get(coin, 'symbol', '');

  const isFirstFiat = _.get(fiat, 'isFiat', false);
  const isSecondFiat = _.get(coin, 'isFiat', false);

  // Fiat price
  const fiatBalance = wei.from(_.get(fiat, 'balance', "0"));
  const fiatPrice = getTokenPrice(fiat);

  // Calculate coin price
  const coinPrice = getTokenPrice(coin);

  const limits = props.limits.find(l => l.coin === coinSymbol);
  const minCoinAmount = Math.max(
    _.get(limits, 'min', 0),
    isFirstFiat && isSecondFiat
      ? 50 / coinPrice
      : 20 / coinPrice
  );
  const maxCoinAmount = _.get(limits, 'max', Infinity);

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
  const bnbCommission = (Number(_.get(
    commissions,
    `bnb`,
    getDefaultCommission(bnbToken, commissions)
  )) || 0) / 100;
  const rate = (fiatPrice * (1 - fiatCommission)) / coinPrice;
  const fiatAmount = Number(fiatValue) || 0;
  const coinAmount = Number(coinValue);
  const rateDisplay = 1 / rate / (1 - coinCommission);

  // Button availability
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [processingTime, setProcessingTime] = React.useState(false);
  const isAvailableOfFiat = fiatBalance >= fiatAmount;
  const isAvailableOfMax = coinAmount <= maxCoinAmount;
  const isAvailableOfMin = coinAmount >= minCoinAmount;
  const isAvailable = isAvailableOfMin && isAvailableOfMax && isAvailableOfFiat;

  const handleFiatInput = newValue => {
    const newCoinAmount = newValue * rate * (1 - coinCommission);

    dispatch(setExchangeAmount(newValue, 'from'));
    dispatch(setExchangeAmount(getFixedNumber(newCoinAmount, 5), 'to'));
  };

  const handleCoinInput = newValue => {
    const newFiatAmount = newValue / (rate * (1 - coinCommission));

    dispatch(setExchangeAmount(newValue, 'to'));
    dispatch(setExchangeAmount(getFixedNumber(newFiatAmount, 5), 'from'));
  }

  function fiatSelector() {
    setIsSelectFiat(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  function coinSelector() {
    setIsSelectCoin(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  function setTransactionToLocalStorage(transaction) {
    const record = window.localStorage.getItem('ExchangerSwapTransactions');
    let transactions = record ? JSON.parse(record) : [];

    transactions = [
      {
        accountAddress: accountAddress,
        date: new Date(),
        tx: transaction.tx,
        token0: transaction.token0,
        token1: transaction.token1,
        amount0: transaction.amount0,
        amount1: transaction.amount1,
      },
      ...transactions
    ];

    window.localStorage.setItem(
      'ExchangerSwapTransactions',
      JSON.stringify(transactions)
    );
  }
  
  const bnbPrice = getTokenPrice(bnbToken);
  const swapTokens = async () => {
    setIsProcessing(true);
    setProcessingTime(Date.now() + 60000 * 5);
    
    try {
      let fiatToBNBAmount = 0;
      const bnbBalance = wei.from(await getTokenBalance());
      const bnbAmount = 0.01;
      const minBNBAmount = 0.005;
  
      const sourcePrice = fiat.isFiat ? fiatPrice : coinPrice;
      const sourceCommission = fiat.isFiat ? fiatCommission : coinCommission;
      const gasPrice = bnbAmount
        * (bnbPrice / sourcePrice)
        * (1 + sourceCommission)
        * (1 + bnbCommission);
      
      // Check BNB balance and ask to exchange some fiat to bnbAmount
      if ((bnbBalance < minBNBAmount) && (fiat.isFiat || coin.isFiat)) {
        try {
          await actions.openModal('attention_buy_token', {}, {
            toToken: {
              amount: bnbAmount,
              label: 'BNB',
            },
            fromToken: {
              amount: Number(gasPrice.toFixed(0)),
              label: fiat.isFiat ? fiatSymbol : coinSymbol,
            }
          });
          fiatToBNBAmount = gasPrice;
        } catch (error) {
          console.warn('Gas buy cancelled', error);
        }
      }
      
      if (!fiat.isFiat) {
        const token = getTokenContract(fiat);
        const allowance = await token.getAllowance(exchangerRouter);
        if (allowance < fiatAmount) {
          await token.approve(exchangerRouter, fiatAmount);
        }
      }
      const result = await exchange(fiat.address, coin.address, fiatAmount, fiatToBNBAmount, {
        symbol: coinSymbol,
        isInProgress: true,
        text: getLang('dapp_exchanger_swap_submitted_text'),
        token: coin,
        coinForAddToWallet: coin,
    });
      console.log('[swapTokens]', result);
       setTransactionToLocalStorage({
        tx: result,
        token0: fiat.symbol,
        token1: coin.symbol,
        amount0: fiatAmount,
        amount1: coinAmount,
      });
      toast.success('Exchange confirmed');
    } catch (error) {
      console.error('[swapTokens]', error);
      toast.error(_.get(error, 'data.message', error ? error.message : ''));
    }
    setIsProcessing(false);
    setProcessingTime(null);
  };

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
                     onFocus={() => {
                      dispatch(setExchangeFocus('from'));
                     }}
                     textPosition="right" />
              <span className="ExchangerSwap__link" onClick={() => handleFiatInput(fiatBalance)}>
                {getLang('dapp_global_balance')}:&nbsp;
                {getFinePrice(fiatBalance)} {fiatSymbol}
              </span>
              {isAdaptive && <div className="ExchangerSwap__rate">
                1 {fiatSymbol} ≈ {getFinePrice(1 / rateDisplay)} {coinSymbol}
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
                1 {coinSymbol} ≈ {getFinePrice(rateDisplay)} {fiatSymbol}
              </div>
            </div>
          </div>
          <div className="SwapForm__form__control">
            <div className="ExchangerSwap__fiat-amount">
              <DappInput placeholder="0.00"
                     disabled={!coin?.isFiat}
                     value={coinAmount}
                     onChange={handleCoinInput}
                     type="number"
                     onFocus={() => {
                      dispatch(setExchangeFocus('to'));
                     }}
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
        {(!isFirstFiat && !isSecondFiat) || fiatSymbol === 'NRFX'
          ? <Button className=""
                    state={isProcessing ? 'loading' : ''}
                    onClick={() => {
                      if (fiatSymbol === 'NRFX' && isSecondFiat) {
                        const secondToken =
                          coins.find(t => t.symbol === 'USDT') ||
                          coins[1];
                        dispatch(setSwap(fiat, secondToken));
                      } else {
                        dispatch(setSwap(fiat, coin));
                      }

                      router.navigate(PAGES.DAPP_SWAP);
                    }}>
            {getLang('dapp_exchanger_exchange_on_dex_button')}
          </Button>
          : <Button className=""
                    state={isProcessing ? 'loading' : ''}
                    onClick={swapTokens}>
            {getLang('dapp_exchanger_exchange_button')}
          </Button>
        }
      </div> : <div className="ExchangerSwap__actions-buy">
        <Button className="" onClick={() => actions.openModal('connect_to_wallet')}>
          {getLang('dapp_global_connect_wallet')}
        </Button>
      </div>}
      {isSelectFiat && 
        <CabinetModal onClose={() => setIsSelectFiat(false)}>
          <TokenSelect
            onChange={value => handleFiatChange(value)}
            onClose={() => setIsSelectFiat(false)}
            selected={fiat}
            isAdaptive={isAdaptive}
            {...context}
            defaultList="fiats"
            tokens={[
              ...coins,
            ].filter(t => t.symbol !== 'BNB')}
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
