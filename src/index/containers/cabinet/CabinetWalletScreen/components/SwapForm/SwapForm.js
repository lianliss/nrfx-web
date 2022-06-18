import "./SwapForm.less";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from 'lodash';
import {
  ContentBox,
  Dropdown,
  CircleIcon,
  Input,
  Button,
  NumberFormat
} from "src/ui";
import Lang from "src/components/Lang/Lang";
import { classNames as cn } from "utils";
import {
  walletBalanceSelector,
  walletBalancesSelector,
  walletStatusSelector,
  walletSwapSelector,
  walletWalletsSelector,
  web3WalletsSelector,
  web3BalancesSelector,
} from "src/selectors";
import { getCurrencyInfo } from "src/actions";
import SVG from "utils/svg-wrap";
import {
  walletSetStatus,
  walletSwapSetAmount,
  walletSwapSetCurrency,
  walletSwapSetFocus,
  walletSwapStartRatePooling,
  walletSwapStopRatePooling,
  walletSwapSubmit,
  walletSwapSwitch,
  walletSwapSetRate,
  walletUpdate,
} from "src/actions/cabinet/wallet";
import {
  web3SetData,
} from 'actions/cabinet/web3';
import { isFiat, getLang } from "utils";
import web3Backend from "services/web3-backend";
import * as toast from 'actions/toasts';
import { getCanExchangeWallets } from "src/actions/cabinet/wallets";
import getCommission from 'utils/get-commission';
import getFinePrice from 'utils/get-fine-price';

// number to fixed custom function
import { customToFixed } from "utils/customToFixed";

const Form = ({
  onChangeAmount,
  currency,
  secondaryCurrency,
  amount,
  options,
  rate,
  autoFocus,
  onFocus,
  onCurrencyChange,
  disabled,
  currentBalance,
  title,
  commission,
  gasPrice,
}) => {
  let realRate = isFiat(secondaryCurrency) ? rate : 1 / rate;
  console.log('realRate', realRate);
  realRate += realRate * commission;
  console.log('commission', commission, 1 - commission);
  console.log('rate', realRate);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      document.getElementById(`swap-form-input-${currency}`).focus();
    }
  }, [disabled]);

  return (
    <div className="SwapForm__form">
      <div className="SwapForm__form__label">{title}</div>
      <div className="SwapForm__form__control">
        <Dropdown
          disabled={disabled}
          value={currency}
          options={options
            .map(currency => ({
              prefix: (
                <CircleIcon size="ultra_small" currency={currency} />
              ),
              value: currency.abbr,
              title: `${currency.abbr.toUpperCase()}`
            }))}
          onChange={({ value }) => onCurrencyChange(value)}
        />
        <div className="SwapForm__form__control__meta">
          {!!realRate ? <>
          <NumberFormat number={1} currency={currency} />
          {" ≈ "}
          {getFinePrice(realRate)} {secondaryCurrency.toUpperCase()}
          </>
          : <>&nbsp;</>}
        </div>
      </div>
      <div className="SwapForm__form__control">
        <Input
          id={`swap-form-input-${currency}`}
          ref={inputRef}
          disabled={disabled}
          onFocus={onFocus}
          autoFocus={autoFocus}
          value={amount}
          type={'number'}
          onTextChange={onChangeAmount}
        />
        {!!currentBalance && (
          <div
            onClick={() => onChangeAmount(currentBalance)}
            className="SwapForm__form__control__meta active"
          >
            <NumberFormat number={currentBalance} currency={currency} />
          </div>
        )}
        {!!gasPrice && <div className="SwapForm__form__control__meta right">
          {getLang('swap_gas')} ≈<NumberFormat number={gasPrice} skipRoughly currency={currency} />
        </div>}
        {/*{!!commission && <div className="SwapForm__form__control__meta right">*/}
          {/*{getLang('swap_commission')} <NumberFormat number={commission * 100} currency={'%'} />*/}
        {/*</div>}*/}
      </div>
    </div>
  );
};

const updateRates = async (from, to, fromAmount, toAmount, dispatch, setAmounts, commission, gasPrice) => {
  try {
    const swapRate = await web3Backend.getFiatToTokenRate(from, to);
    dispatch(walletSwapSetRate(swapRate.rate));
    dispatch(walletSetStatus("rate", ""));
    setAmounts({
      from: fromAmount,
      to: calculateToAmount(fromAmount, swapRate.rate, commission, gasPrice),
    });

    if (fromAmount && !toAmount) {
      dispatch(walletSwapSetAmount('to', fromAmount / swapRate));
    }
    return swapRate.rate;
  } catch (error) {
    console.error('[SwapForm] getFiatToTokenRate', error);
  }
};

let gasTimeout = null;
const calculateToAmount = (from = 0, rate = 1, commission = 0, gasPrice = 0) => {
  return from * (1 / rate) / (1 + commission);
};
const calculateFromAmount = (to = 0, rate = 1, commission = 0, gasPrice = 0) => {
  return to * rate * (1 + commission);
};

const updateGas = ({
  setGasPrice,
  toCurrency, toAmount,
  callback,
  dispatch,
  timeout = 1500,
}) => {
  if (!!gasTimeout) clearTimeout(gasTimeout);
  gasTimeout = setTimeout(async () => {
    try {
      dispatch(walletSetStatus("rate", "loading"));
      const estimate = await web3Backend.estimateTransferToUserGas(toCurrency, toAmount);
      dispatch(walletSetStatus("rate", ""));
      setGasPrice(estimate.gasInTokens);
      callback(estimate.gasInTokens);
    } catch (error) {
      console.error('[SwapForm] updateGas', error);
      dispatch(walletSetStatus("rate", ""));
    }
  }, timeout);
};

export default () => {
  const [gasPrice, setGasPrice] = useState(0);
  const [amounts, setAmounts] = useState({from: 0, to: 0});
  const {from: fromAmount, to: toAmount} = amounts;
  const status = useSelector(walletStatusSelector);
  const swap = useSelector(walletSwapSelector);
  const wallets = useSelector(walletWalletsSelector);
  const balances = useSelector(walletBalancesSelector);
  const currentBalance = useSelector(walletBalanceSelector(swap.fromCurrency));
  const dispatch = useDispatch();
  const toCrypto = isFiat(swap.fromCurrency);
  const disabled = status.rate === "loading" || status.swap === "loading";
  const web3Balances = useSelector(web3BalancesSelector);

  const currencies = getCanExchangeWallets();
  const fiats = currencies.filter(c => c.type === 'fiat');
  const crypto = currencies.filter(c => c.type === 'crypto');
  const commission = getCommission(useSelector(state => state.web3.commissions), swap.toCurrency);
  
  useEffect(() => {
    dispatch(walletSetStatus("rate", "loading"));
    updateRates(swap.fromCurrency, swap.toCurrency, fromAmount, toAmount, dispatch, setAmounts, commission, gasPrice)
      .then(rate => {
        updateGas({
          setGasPrice,
          toCurrency: swap.toCurrency,
          toAmount,
          callback: gasPrice => setAmounts({
            from: fromAmount,
            to: calculateToAmount(fromAmount, rate, commission, gasPrice),
          }),
          dispatch,
          timeout: 0,
        })
      });
  }, [swap.fromCurrency, swap.toCurrency]);

  return (
    <ContentBox className="SwapForm">
      <div className="SwapForm__formWrapper">
        <Form
          title={<Lang name="cabinet_fiatWalletGive" />}
          disabled={disabled}
          options={toCrypto ? fiats : crypto}
          amount={customToFixed(fromAmount, 5)}
          autoFocus={swap.focus === "from"}
          onFocus={() => {
            dispatch(walletSwapSetFocus("from"));
          }}
          currentBalance={_.get(currentBalance, 'amount')}
          currency={swap.fromCurrency}
          secondaryCurrency={swap.toCurrency}
          rate={swap.rate}
          onCurrencyChange={currency => {
            dispatch(walletSwapSetCurrency("from", currency));
          }}
          onChangeAmount={amount => {
            const toAmount = calculateToAmount(Number(amount), swap.rate, commission, gasPrice);
            setAmounts({
              from: Number(amount),
              to: toAmount,
            });
            updateGas({
              setGasPrice,
              toCurrency: swap.toCurrency,
              toAmount,
              callback: gasPrice => setAmounts({
                from: Number(amount),
                to: calculateToAmount(Number(amount), swap.rate, commission, gasPrice),
              }),
              dispatch,
            })
          }}
        />
        <div className="SwapForm__separator">
          <div
            className={cn("SwapForm__switchButton", status.rate)}
            onClick={() => {
              return; // TODO unlock swap switch buttun
              dispatch(walletSwapSwitch());
            }}
          >
            <SVG src={require("src/asset/24px/switch.svg")} />
          </div>
        </div>
        <Form
          title={<Lang name="cabinet_fiatWalletGet" />}
          disabled={disabled}
          options={toCrypto ? crypto : fiats}
          amount={customToFixed(toAmount, 5)}
          autoFocus={swap.focus === "to"}
          onFocus={() => {
            dispatch(walletSwapSetFocus("to"));
          }}
          currency={swap.toCurrency}
          secondaryCurrency={swap.fromCurrency}
          rate={swap.rate}
          onCurrencyChange={currency => {
            dispatch(walletSwapSetCurrency("to", currency));
            //updateRates(swap.fromCurrency, currency, dispatch, setAmounts);
          }}
          onChangeAmount={amount => {
            const fromAmount = calculateFromAmount(Number(amount), swap.rate, commission, gasPrice);
            setAmounts({
              from: fromAmount,
              to: Number(amount),
            });
            updateGas({
              setGasPrice,
              toCurrency: swap.toCurrency,
              toAmount: Number(amount),
              callback: gasPrice => setAmounts({
                from: calculateFromAmount(Number(amount), swap.rate, commission, gasPrice),
                to: Number(amount),
              }),
              dispatch,
            })
          }}
          {...{gasPrice, commission}}
        />
      </div>
      <div className="SwapForm__submitWrapper">
        <Button
          state={status.swap}
          disabled={status.rate === "loading" || toAmount <= 0}
          onClick={() => {
            //dispatch(walletSwapSubmit());
            dispatch(walletSetStatus('swap', 'loading'));
            (async () => {
              try {
                await web3Backend
                  .swapFiatToToken(swap.fromCurrency, swap.toCurrency, fromAmount);
                dispatch(walletSetStatus('swap', ''));
                toast.success(getLang('status_success'));

                // Get new balances
                web3Balances.map(balance => {
                  web3Backend.getBalances(balance.address).then(data => {
                    Object.keys(data).map(token => data[token] = Number(data[token]));
                    const balances = web3Balances.map(b => ({
                      ...b,
                      items: b.address === balance.address
                        ? data
                        : b.items
                    }));
                    dispatch(web3SetData({balances}));
                  }).catch(error => {
                    console.error('[SwapForm][getBalances]', error);
                  })
                });

                // Update fiat balance
                // balances.map(b => {
                //   if (b.currency === swap.fromCurrency) b.amount -= fromAmount;
                // });
                // dispatch(walletUpdate({balances}));
              } catch (error) {
                const message = _.get(error, 'data.name', _.get(error, 'data.message', error.message));
                console.error('[SwapForm] submit', error);
                dispatch(walletSetStatus('swap', ''));
                toast.warning(getLang(message));
              }
            })();
          }}
        >
          <Lang name="cabinet_fiatMarketExchangeActionButton" />
        </Button>
      </div>
    </ContentBox>
  );
};
