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
import currenciesObject from 'src/currencies';

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
  title
}) => {
  const realRate = isFiat(secondaryCurrency) ? rate : 1 / rate;
  const inputRef = useRef(null);

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
              title: currency.name
            }))
            .filter(Boolean)}
          onChange={({ value }) => onCurrencyChange(value)}
        />
        <div className="SwapForm__form__control__meta">
          <NumberFormat number={1} currency={currency} />
          {" ≈ "}
          <NumberFormat
            skipRoughly
            number={realRate}
            currency={secondaryCurrency}
          />
        </div>
      </div>
      <div className="SwapForm__form__control">
        <Input
          ref={inputRef}
          disabled={disabled}
          onFocus={onFocus}
          autoFocus={autoFocus}
          value={amount}
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
      </div>
    </div>
  );
};

const updateRates = async (from, to, fromAmount, toAmount, dispatch) => {
  try {
    const swapRate = await web3Backend.getFiatToTokenRate(from, to);
    dispatch(walletSwapSetRate(swapRate.rate));
    dispatch(walletSetStatus("rate", ""));

    console.log('updateRates', fromAmount, toAmount, swapRate);
    if (fromAmount && !toAmount) {
      dispatch(walletSwapSetAmount('to', fromAmount / swapRate));
    }
  } catch (error) {
    console.error('[SwapForm] getFiatToTokenRate', error);
  }
};

const updateGas = ({
  gasTimeout, setGasTimeout,
  gasPrice, setGasPrice,
  toCurrency, toAmount,
}) => {
  if (!!gasTimeout) clearTimeout(gasTimeout);
  const newTimeout = setTimeout(async () => {
    setGasTimeout(null);
    const estimate = await web3Backend.estimateTransferToUserGas(toCurrency, toAmount);
    console.log('ESTIMATE', estimate);
  }, 1000);
  setGasTimeout(newTimeout);
};

export default () => {
  const [gasTimeout, setGasTimeout] = useState(null);
  const [gasPrice, setGasPrice] = useState(0);
  const status = useSelector(walletStatusSelector);
  const swap = useSelector(walletSwapSelector);
  const wallets = useSelector(walletWalletsSelector);
  const balances = useSelector(walletBalancesSelector);
  const currentBalance = useSelector(walletBalanceSelector(swap.fromCurrency));
  const dispatch = useDispatch();
  const toCrypto = isFiat(swap.fromCurrency);
  const disabled = status.rate === "loading" || status.swap === "loading";
  const web3Balances = useSelector(web3BalancesSelector);

  useEffect(() => {
    dispatch(walletSetStatus("rate", "loading"));
    updateRates(swap.fromCurrency, swap.toCurrency, swap.fromAmount, swap.toAmount, dispatch);

    return () => {
      updateRates(swap.fromCurrency, swap.toCurrency, swap.fromAmount, swap.toAmount, dispatch);
    };
  }, [dispatch]);

  const swapFromAmount = useRef(swap.fromAmount);
  const currentBalanceAmount = useRef(currentBalance && currentBalance.amount);

  useEffect(() => {
    if (!swapFromAmount.current && !isNaN(currentBalanceAmount.current)) {
      dispatch(
        walletSwapSetAmount("from", currentBalanceAmount.current || 1000)
      );
    }
    //console.log('useEffect', swap.toCurrency, swap.toAmount);
  }, [dispatch, swapFromAmount, currentBalanceAmount]);

  const currencies = Object.keys(currenciesObject)
    .map(key => currenciesObject[key])
    .filter(c => c.can_exchange);
  const fiats = currencies.filter(c => c.type === 'fiat');
  const crypto = currencies.filter(c => c.type === 'crypto');

  //console.log('render', swap.fromAmount, swap.toAmount);

  return (
    <ContentBox className="SwapForm">
      <div className="SwapForm__formWrapper">
        <Form
          title={<Lang name="cabinet_fiatWalletGive" />}
          disabled={disabled}
          options={toCrypto ? fiats : crypto}
          amount={swap.fromAmount}
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
            updateRates(currency, swap.toCurrency, dispatch);
          }}
          onChangeAmount={amount => {
            dispatch(walletSwapSetAmount("from", amount));
          }}
        />
        <div className="SwapForm__separator">
          <div
            className={cn("SwapForm__switchButton", status.rate)}
            onClick={() => {
              return; // TODO unlick swap switch buttun
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
          amount={swap.toAmount}
          autoFocus={swap.focus === "to"}
          onFocus={() => {
            dispatch(walletSwapSetFocus("to"));
          }}
          currency={swap.toCurrency}
          secondaryCurrency={swap.fromCurrency}
          rate={swap.rate}
          onCurrencyChange={currency => {
            console.log('onCurrencyChange', currency);
            dispatch(walletSwapSetCurrency("to", currency));
            updateRates(swap.fromCurrency, currency, dispatch);
          }}
          onChangeAmount={amount => {
            dispatch(walletSwapSetAmount("to", amount));
          }}
        />
      </div>
      <div className="SwapForm__submitWrapper">
        <Button
          state={status.swap}
          disabled={status.rate === "loading"}
          onClick={() => {
            //dispatch(walletSwapSubmit());
            dispatch(walletSetStatus('swap', 'loading'));
            (async () => {
              try {
                await web3Backend
                  .swapFiatToToken(swap.fromCurrency, swap.toCurrency, swap.fromAmount);
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
                balances.map(b => {
                  if (b.currency === swap.fromCurrency) b.amount -= swap.fromAmount;
                });
                dispatch(walletUpdate({balances}));
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
