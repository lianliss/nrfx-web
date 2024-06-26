import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import { web3RatesSelector, adaptiveSelector } from 'src/selectors';
import wei from 'utils/wei';
import { setExchangeAmount, setExchangeFocus } from 'src/actions/dapp/exchange';
import {
  dappExchangeAmountSelector,
  dappExchangeFocusSelector,
} from 'src/selectors';
import { getFixedNumber } from 'src/utils';
import routerABI from 'src/index/constants/ABI/NarfexExchangerRouter';
import { openStateModal } from 'src/actions';
import * as toast from 'actions/toasts';
import * as exchangerAnalytics from 'src/utils/analytics/exchanger';
import _ from 'lodash';

function getTokenPrice(token) {
  const rates = useSelector(web3RatesSelector);
  const isFiat = _.get(token, 'isFiat', false);
  const symbol = _.get(token, 'symbol');
  let price;
  switch (symbol) {
    case 'NRFX':
      price = _.get(rates, 'nrfx', 0);
      break;
    case 'USDC':
    case 'USD':
      price = 1;
      break;
    default:
      price = isFiat
        ? _.get(rates, symbol.toLowerCase(), 0)
        : _.get(rates, `${symbol}USDT`, 0);
  }
  return price;
}

function getDefaultCommission(token, _commissions) {
  if (!token) return 0;
  const commissions =
    _commissions ||
    useSelector((state) => _.get(state, 'web3.commissions', {}));
  return token.isFiat
    ? _.get(commissions, 'FiatDefault', 0)
    : _.get(commissions, 'BinanceDefault', 0);
}

// For asynchronous amounts check
let inputAmount, outputAmount;

const useSwap = ({
  fiats,
  fiat,
  coins,
  coin,
  setFiat,
  setCoin,
  fiatsLoaded,
}) => {
  const dispatch = useDispatch();
  const isAdaptive = useSelector(adaptiveSelector);
  const commissions = useSelector((state) =>
    _.get(state, 'web3.commissions', {})
  );
  const route = useSelector((state) => state.router.route);
  const context = React.useContext(Web3Context);
  const { isConnected, getTokenContract, getTokenBalance } = context;
  const [isSelectFiat, setIsSelectFiat] = React.useState(false);
  const [isSelectCoin, setIsSelectCoin] = React.useState(false);
  // Display rate
  const [outputRate, setOutputRate] = React.useState(0);
  const [isExactOut, setIsExactOut] = React.useState(false);
  const [paramsTokenLoaded, setParamsTokensLoaded] = React.useState({
    token: false,
    fiat: false,
  });

  // Symbols
  const fiatSymbol = _.get(fiat, 'symbol', '');
  const coinSymbol = _.get(coin, 'symbol', '');

  // Fiat price
  const fiatBalance = wei.from(
    _.get(fiat, 'balance', '0'),
    _.get(fiat, 'decimals', 18)
  );
  const fiatPrice = getTokenPrice(fiat);

  // Calculate coin price
  const coinPrice = getTokenPrice(coin);

  // input values
  const inputFocus = useSelector(dappExchangeFocusSelector);
  const fiatValue = useSelector(dappExchangeAmountSelector('from')) || 0;
  const coinValue = useSelector(dappExchangeAmountSelector('to')) || 0;

  // Calculate amount
  const fiatCommission =
    Number(
      _.get(
        commissions,
        `${fiatSymbol.toLowerCase()}`,
        getDefaultCommission(fiat, commissions)
      )
    ) / 100;
  const coinCommission =
    (Number(
      _.get(
        commissions,
        `${coinSymbol.toLowerCase()}`,
        getDefaultCommission(coin, commissions)
      )
    ) || 0) / 100;
  const rate = (fiatPrice * (1 - fiatCommission)) / coinPrice;
  const fiatAmount = Number(fiatValue) || 0;
  const coinAmount = Number(coinValue);

  // Button availability
  const [isProcessing] = React.useState(false);

  // Get output amount for connected and not connected states
  const getOutAmount = async (inAmount) => {
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
  const getInAmount = async (outAmount) => {
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

  const handleFiatInput = (newValue) => {
    inputAmount = newValue;
    dispatch(setExchangeAmount(newValue, 'from'));
    setIsExactOut(false);

    if (newValue) {
      getOutAmount(newValue)
        .then((outAmount) => {
          if (inputAmount !== newValue) return;
          dispatch(setExchangeAmount(getFixedNumber(outAmount, 5), 'to'));
          outputAmount = outAmount;
        })
        .catch((e) => console.error('[handleFiatInput]', e));
    } else {
      dispatch(setExchangeAmount(null, 'to'));
      outputAmount = 0;
    }
  };

  const handleCoinInput = (newValue) => {
    outputAmount = newValue;
    dispatch(setExchangeAmount(newValue, 'to'));
    setIsExactOut(true);

    if (newValue) {
      getInAmount(newValue)
        .then((inAmount) => {
          if (outputAmount !== newValue) return;
          dispatch(setExchangeAmount(getFixedNumber(inAmount, 5), 'from'));
          inputAmount = inAmount;
        })
        .catch((e) => console.error('[handleCoinInput]', e));
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
    if (paramsTokenLoaded.token) return;

    const { params } = route;
    const paramCoinSymbol = params.coin && params.coin.toLowerCase();
    if (!paramCoinSymbol) return;
    const paramCoin = tokens.find(
      (coin) => coin.symbol.toLowerCase() === paramCoinSymbol
    );

    if (!paramCoin) return;
    handleCoinChange(paramCoin);
  };

  const setParamsFiat = async (tokens) => {
    const { params } = route;
    const paramFiatSymbol = params.currency && params.currency.toLowerCase();

    if (!paramFiatSymbol) {
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
  };

  const handleExchangeFocus = (focus) => {
    dispatch(setExchangeFocus(focus));
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

  return {
    isAdaptive,
    fiat,
    coin,
    fiatSelector,
    coinSelector,
    outputRate,
    fiatBalance,
    fiatAmount,
    coinAmount,
    fiatValue,
    coinValue,
    handleCoinInput,
    handleFiatInput,
    isProcessing,
    isExactOut,
    isNoLiquidity,
    isSelectFiat,
    isSelectCoin,
    setIsSelectFiat,
    setIsSelectCoin,
    handleExchangeFocus,
    handleFiatChange,
    handleCoinChange,
    context,
  };
};

export const useSwapAction = ({
  fiat,
  coin,
  fiatAmount,
  coinAmount,
  isExactOut,
  context,
}) => {
  const {
    addTokenToWallet,
    getTokenContract,
    chainId,
    getWeb3,
    transaction,
    getBSCScanLink,
    network,
    referAddress,
    tryExchangeError,
  } = context || React.useContext(Web3Context);

  const [inAmount, setInAmount] = React.useState(fiatAmount);
  const [outAmount, setOutAmount] = React.useState(coinAmount);
  const [priceImpact, setPriceImpact] = React.useState(0);
  const [rate, setRate] = React.useState(coinAmount / fiatAmount);
  const [isRateReverse, setIsRateReverse] = React.useState(false);
  const [path, setPath] = React.useState([]);
  const [slippage, setSlippage] = React.useState(
    Number(window.localStorage.getItem('nrfx-slippage')) || 0.5
  );
  const [deadline, setDeadline] = React.useState(20);
  const [allowance, setAllowance] = React.useState(999999999);
  const [isProcess, setIsProcess] = React.useState(true);
  const [isApproving, setIsApproving] = React.useState(false);

  const networkName = chainId === 56 ? 'BSC' : 'Testnet BSC';

  const getAmounts = async () => {
    if (!fiat || !coin) return;
    const amounts = {
      fiat: fiatAmount,
      coin: coinAmount,
    };
    setInAmount(amounts.fiat);
    setOutAmount(amounts.coin);

    try {
      if (isExactOut) {
        const data = await getTokenContract(fiat).getInAmount(
          coin,
          amounts.coin
        );
        setInAmount(data.inAmount);
        setOutAmount(Number(amounts.coin.toFixed(9)));
        setRate(amounts.coin / data.inAmount);
        setPath(data.path);
        setPriceImpact(_.get(data, 'priceImpact', 0));
      } else {
        const data = await getTokenContract(fiat).getOutAmount(
          coin,
          amounts.fiat
        );

        setInAmount(Number(amounts.fiat.toFixed(9)));
        setOutAmount(data.outAmount);
        setRate(data.outAmount / amounts.fiat);
        setPath(data.path);
        setPriceImpact(_.get(data, 'priceImpact', 0));
      }
    } catch (err) {
      console.log('getAmounts', err);
    }
  };

  React.useEffect(() => {
    getAmounts();
  }, [fiat, coin, fiatAmount, coinAmount, isExactOut]);

  React.useEffect(() => {
    if (!fiat) return;

    if (fiat.isFiat) {
      setIsProcess(false);
      setAllowance(999999999);
      return;
    }
    const token = getTokenContract(fiat);
    const router = network.contractAddresses.exchangerRouter;

    token.getAllowance(router).then((allowance) => {
      setAllowance(allowance);
      setIsProcess(false);
    });
  }, [fiat]);

  const inAmountMax = inAmount * (1 + slippage / 100);
  const outAmountMin = outAmount * (1 - slippage / 100);

  const priceImpactPercents = priceImpact * 100;
  let priceImpactColor = '';
  if (priceImpactPercents < 1) priceImpactColor = 'green';
  if (priceImpactPercents >= 3) priceImpactColor = 'yellow';
  if (priceImpactPercents >= 5) priceImpactColor = 'red';

  const isAvailable = allowance > inAmount;

  const approve = async () => {
    const token = getTokenContract(fiat);
    const router = network.contractAddresses.exchangerRouter;
    try {
      const maxApprove = 10 ** 9;
      setIsApproving(true);
      await token.approve(
        router,
        inAmountMax > maxApprove ? inAmountMax : maxApprove
      );
      setAllowance(inAmountMax > maxApprove ? inAmountMax : maxApprove);
    } catch (error) {
      console.error('[approve]', error);
      token.stopWaiting();
      toast.warning('Approve error');
    }
    setIsApproving(false);
  };

  const swap = async () => {
    try {
      setIsProcess(true);
      const router = new (getWeb3().eth.Contract)(
        routerABI,
        network.contractAddresses.exchangerRouter
      );

      const isFromBNB =
        !path[0].address ||
        path[0].address.toLowerCase() ===
          network.wrapToken.address.toLowerCase();
      let value;
      if (isFromBNB) {
        if (isExactOut) {
          value = wei.to(inAmountMax);
        } else {
          value = wei.to(inAmount);
        }
      }

      const amountDecimals = isExactOut
        ? _.get(path[path.length - 1], 'decimals', 18)
        : _.get(path[0], 'decimals', 18);
      const limitDecimals = !isExactOut
        ? _.get(path[path.length - 1], 'decimals', 18)
        : _.get(path[0], 'decimals', 18);

      const receipt = await transaction(
        router,
        'swap',
        [
          path.map((token) => token.address),
          isExactOut,
          wei.to(isExactOut ? outAmount : inAmount, amountDecimals),
          wei.to(isExactOut ? inAmountMax : outAmountMin, limitDecimals),
          Math.floor(Date.now() / 1000) + deadline * 60,
          referAddress,
        ],
        value
      );
      openStateModal('transaction_submitted', {
        txLink: getBSCScanLink(receipt),
        symbol: coin.symbol,
        addToken: () => addTokenToWallet(coin),
      });

      const coinRate = await getTokenContract(coin).getOutAmount(
        network.defaultRateToken,
        1
      );
      exchangerAnalytics.addExchange({
        tx: receipt,
        price: coinRate?.outAmount,
        fromToken: fiat,
        toToken: coin,
        chainId: network.chainId,
        toTokensAmount: outAmount,
      });
    } catch (error) {
      console.error('[swap]', error);
      if (error.message.indexOf('Internal JSON-RPC error.') >= 0) {
        const message = error.message.split('Internal JSON-RPC error.')[1];
        try {
          const parsed = JSON.parse(message);
          toast.warning(parsed.message.split('execution reverted:')[1]);
          if (parsed.message.split('Not enough liquidity').length > 1) {
            try {
              tryExchangeError(
                path[0].address,
                path[path.length - 1].address,
                inAmount,
                outAmount
              );
            } catch (error) {
              console.error('[tryExchangeError]', error);
            }
          }
        } catch (error) {
          toast.warning(error.message);
        }
      } else {
        toast.warning(error.message);
      }
    }
    setIsProcess(false);
  };

  return {
    networkName,
    priceImpactColor,
    priceImpactPercents,
    rate,
    isRateReverse,
    setIsRateReverse,
    fiat,
    coin,
    inAmountMax,
    outAmountMin,
    inAmount,
    outAmount,
    isApproving,
    isAvailable,
    isProcess,
    isExactOut,
    slippage,
    setSlippage,
    deadline,
    setDeadline,
    path,
    approve,
    swap,
  };
};

export default useSwap;
