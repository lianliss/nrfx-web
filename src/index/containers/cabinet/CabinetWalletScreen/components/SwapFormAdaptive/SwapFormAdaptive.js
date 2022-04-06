import "./SwapFormAdaptive.less";

import { classNames as cn } from "utils";
import React, { useCallback, useEffect } from "react";
import _ from 'lodash';
import {
  Button,
  CircleIcon,
  ContentBox,
  Input,
  NumberFormat
} from "ui";
import Lang from "../../../../../../components/Lang/Lang";
import { useDispatch, useSelector } from "react-redux";
import {
  walletBalanceSelector,
  walletBalancesSelector,
  walletStatusSelector,
  walletSwapSelector,
  walletWalletsSelector,
  web3BalancesSelector,
} from "src/selectors";
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
} from "actions/cabinet/wallet";
import { isFiat, getLang } from "utils";
import { getCurrencyInfo } from "../../../../../../actions";
import SVG from "utils/svg-wrap";
import web3Backend from "services/web3-backend";
import * as toast from 'actions/toasts';
import currenciesObject from 'src/currencies';
import getCommission from 'utils/get-commission';
import { customToFixed } from 'utils/customToFixed';

const Select = ({ value, options, onChange, title, disabled }) => (
  <div className={cn("SwapFormAdaptive__controlPanel__select", { disabled })}>
    <CircleIcon size="extra_small" currency={getCurrencyInfo(value)} />
    <div className="SwapFormAdaptive__controlPanel__select__label">{title}</div>
    <select onChange={e => onChange(e.target.value)} value={value}>
      {options
        .map(currency => <option value={currency.abbr}>{`${currency.name}(${currency.abbr.toUpperCase()})`}</option>)
      }
    </select>
  </div>
);

const updateRates = async (from, to, dispatch) => {
  try {
    const swapRate = await web3Backend.getFiatToTokenRate(from, to);
    dispatch(walletSwapSetRate(swapRate.rate));
    dispatch(walletSetStatus("rate", ""));
  } catch (error) {
    console.error('[SwapForm] getFiatToTokenRate', error);
  }
};

export default ({rates}) => {
  const status = useSelector(walletStatusSelector);
  const swap = useSelector(walletSwapSelector);
  const dispatch = useDispatch();
  const amount = swap.focus === "from" ? swap.fromAmount : swap.toAmount;
  const currency = swap.focus === "from" ? swap.fromCurrency : swap.toCurrency;
  const toCrypto = isFiat(swap.fromCurrency);
  const wallets = useSelector(walletWalletsSelector);
  const balances = useSelector(walletBalancesSelector);
  const web3Balances = useSelector(web3BalancesSelector);

  const currencies = Object.keys(currenciesObject)
    .map(key => currenciesObject[key])
    .filter(c => c.can_exchange);
  const fiats = currencies.filter(c => c.type === 'fiat');
  const crypto = currencies.filter(c => c.type === 'crypto');

  const fromBalance = useSelector(walletBalanceSelector(swap.fromCurrency));

  useEffect(() => {
    dispatch(walletSetStatus("rate", "loading"));
    updateRates(swap.fromCurrency, swap.toCurrency, dispatch);
  }, [dispatch]);

  const handleChangeAmount = useCallback(
    amount => {
      dispatch(walletSwapSetAmount(swap.focus, amount));
    },
    [dispatch, swap.focus]
  );

  const handleToggleFocus = useCallback(
    amount => {
      dispatch(walletSwapSetFocus(swap.focus === "from" ? "to" : "from"));
    },
    [dispatch, swap.focus]
  );

  // Calculate rate
  const fromRate = _.get(rates, swap.fromCurrency, 0);
  const toRate = _.get(rates, swap.toCurrency, 0);
  let realRate = fromRate && toRate
    ? toRate / fromRate
    : 0;

  // Calculate rate with commission
  const commission = getCommission(useSelector(state => state.web3.commissions), swap.toCurrency);
  realRate += realRate * commission;

  const availableAmount =
    _.get(fromBalance, 'currency') === currency
      ? _.get(fromBalance, 'amount', 0)
      : _.get(fromBalance, 'amount', 0) / realRate;

  const handleClickMaxAmount = useCallback(() => {
    dispatch(walletSwapSetAmount(swap.focus, availableAmount));
  }, [dispatch, availableAmount, swap.focus]);

  return (
    <ContentBox className="SwapFormAdaptive">
      <div className="SwapFormAdaptive__amountLabel">
        <Lang name="global_amount" />
      </div>
      <div className="SwapFormAdaptive__commission">
        <NumberFormat number={1} currency={swap.toCurrency} />
        {" ≈ "}
        <NumberFormat
          skipRoughly
          number={realRate}
          currency={swap.fromCurrency}
        />
      </div>
      <Input
        disabled={!!status.rate}
        value={customToFixed(Number(amount), 5)}
        type="number"
        onTextChange={handleChangeAmount}
        indicator={
          <Button onClick={handleToggleFocus} size="small" type="secondary">
            {currency.toUpperCase()}
          </Button>
        }
      />

      <div
        onClick={handleClickMaxAmount}
        className="SwapFormAdaptive__maxAmountButton"
      >
        <Lang name="global_available" />
        {": "}
        <NumberFormat number={customToFixed(availableAmount, 5)} currency={currency} />
      </div>

      <div className="SwapFormAdaptive__controlPanel">
        <Select
          title={<Lang name="cabinet_fiatWalletGive" />}
          disabled={!!status.rate}
          value={swap.fromCurrency}
          onChange={currency => {
            dispatch(walletSwapSetFocus("from"));
            dispatch(walletSwapSetCurrency("from", currency));
            updateRates(currency, swap.toCurrency, dispatch);
          }}
          options={toCrypto ? fiats : crypto}
        />
        <Select
          title={<Lang name="cabinet_fiatWalletGet" />}
          disabled={!!status.rate}
          value={swap.toCurrency}
          onChange={currency => {
            dispatch(walletSwapSetFocus("to"));
            dispatch(walletSwapSetCurrency("to", currency));
            updateRates(swap.fromCurrency, currency, dispatch);
          }}
          options={toCrypto ? crypto : fiats}
        />
        <div
          onClick={() => {
            return; // TODO unlick swap switch buttun
            !status.rate && dispatch(walletSwapSwitch());
          }}
          className="SwapFormAdaptive__controlPanel__swapButton"
        >
          <Button
            state={status.rate}
            type="secondary"
            className="SwapFormAdaptive__controlPanel__swapButton__circle"
          >
            <SVG src={require("src/asset/24px/switch.svg")} />
          </Button>
        </div>
      </div>

      <Button
        state={status.swap}
        disabled={!!status.rate}
        className="SwapFormAdaptive__submitButton"
        onClick={() => {
          // dispatch(walletSwapSubmit());
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
    </ContentBox>
  );
};
