import React, { useState, useEffect, useCallback } from 'react';
import './Swap.less';
import { CircleIcon, Input, Button, NumberFormat } from '../../../../../ui';
import { formatDouble } from 'src/utils/index';
import Select from '../Select/Select';
import { useDispatch, useSelector } from 'react-redux';
import { walletSwapSelector } from 'src/selectors';
import { getCurrencyInfo } from 'src/actions';
import SVG from 'utils/svg-wrap';
import Lang from 'src/components/Lang/Lang';
import { classNames as cn } from 'src/utils/index';
import * as actions from 'src/actions/landing/buttons';
import { getCanExchangeWallets } from 'src/actions/cabinet/wallets';
import { walletSwapSetCurrency } from 'src/actions/cabinet/wallet';
import web3Backend from 'services/web3-backend';

export default () => {
  const dispatch = useDispatch();
  const swap = useSelector(walletSwapSelector);
  const fromType = getCurrencyInfo(swap.fromCurrency).type;
  const [fromFiat, setFromFiat] = useState(fromType === 'fiat');
  const [rate, setRate] = useState(0);
  const [pendingRate, setPendingRate] = useState(false);
  const to = swap.toCurrency;
  const from = swap.fromCurrency;
  const [main, setMain] = useState(fromFiat ? 'from' : 'to');
  const [fromAmount, setFromAmount] = useState(1000);
  const [toAmount, setToAmount] = useState(0);

  const getCurrencyRate = useCallback(() => {
    setPendingRate(true);
    (async () => {
      const swapRates = await web3Backend.getAllRates();

      if (fromFiat) {
        setRate(swapRates[to] / swapRates[from]);
      } else {
        setRate(swapRates[from] / swapRates[to]);
      }

      setPendingRate(false);
    })();
  }, [from, to, setPendingRate, setRate]);

  const currencies = getCanExchangeWallets();

  const createOptions = (c) => ({
    value: c.abbr,
    label: c.name,
    icon: <CircleIcon size="small" currency={getCurrencyInfo(c.abbr)} />,
  });

  const fiats = currencies
    .filter((currency) => currency.type === 'fiat')
    .map(createOptions);
  const crypto = currencies
    .filter((currency) => currency.type === 'crypto')
    .map(createOptions);

  const handleChangeFromAmount = useCallback(
    (value) => {
      setMain('from');
      setFromAmount(value);
      setToAmount(
        formatDouble(
          fromFiat ? value / rate : value * rate,
          getCurrencyInfo(to).maximum_fraction_digits
        )
      );
    },
    [setMain, setFromAmount, setToAmount, rate, fromFiat, to]
  );

  const handleChangeToAmount = useCallback(
    (value) => {
      setMain('to');
      setToAmount(value);
      setFromAmount(
        formatDouble(
          !fromFiat ? value / rate : value * rate,
          getCurrencyInfo(from).maximum_fraction_digits
        )
      );
    },
    [setMain, setFromAmount, setToAmount, rate, fromFiat, from]
  );

  const handleSwitch = () => {
    dispatch(walletSwapSetCurrency('from', to));
    dispatch(walletSwapSetCurrency('to', from));
    setMain(main === 'from' ? 'to' : 'from');
    setFromFiat(!fromFiat);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  useEffect(() => {
    getCurrencyRate();
  }, [from, to, getCurrencyRate]);

  useEffect(() => {
    if (main === 'from') {
      handleChangeFromAmount(fromAmount);
    } else {
      handleChangeToAmount(toAmount);
    }
  }, [
    rate,
    main,
    fromAmount,
    toAmount,
    handleChangeToAmount,
    handleChangeFromAmount,
  ]);

  return (
    <div className="Swap LandingWrapper__block">
      <div className="Swap__content LandingWrapper__content">
        <h2>
          <Lang name="landing_swap_title" />
        </h2>
        <p>
          <Lang name="landing_swap_description" />
        </p>

        <div className="Swap__form">
          <div className="Swap__form__card">
            <div className="Swap__form__card__label">
              <Lang name="global_give" />
            </div>
            <Select
              isDisabled={pendingRate}
              options={fromFiat ? fiats : crypto}
              value={from}
              onChange={(currency) =>
                dispatch(walletSwapSetCurrency('from', currency.value))
              }
            />
            <Input
              disabled={pendingRate}
              value={fromAmount}
              onTextChange={handleChangeFromAmount}
              indicator={from.toUpperCase()}
            />
            <div className="Swap__form__card__rate">
              {!pendingRate ? (
                <span>
                  <NumberFormat number={1} currency={from} />
                  {' ≈ '}
                  <NumberFormat
                    number={fromFiat ? (1 / rate).toFixed(5) : rate.toFixed(5)}
                    currency={to}
                  />
                </span>
              ) : (
                '...'
              )}
            </div>
          </div>
          <div
            className={cn(
              'Swap__switchButton',
              { loading: pendingRate },
              'loading'
            )}
            // onClick={handleSwitch}
          >
            <SVG src={require('src/asset/24px/switch.svg')} />
          </div>
          <div className="Swap__form__card">
            <div className="Swap__form__card__label">
              <Lang name="global_buy" />
            </div>
            <Select
              isDisabled={pendingRate}
              options={fromFiat ? crypto : fiats}
              value={to}
              onChange={(currency) =>
                dispatch(walletSwapSetCurrency('to', currency.value))
              }
            />
            <Input
              disabled={pendingRate}
              value={toAmount}
              onTextChange={handleChangeToAmount}
              indicator={to.toUpperCase()}
            />
            <div className="Swap__form__card__rate">
              {!pendingRate ? (
                <span>
                  <NumberFormat number={1} currency={to} />
                  {' ≈ '}
                  <NumberFormat
                    number={!fromFiat ? (1 / rate).toFixed(5) : rate.toFixed(5)}
                    currency={from}
                  />
                </span>
              ) : (
                '...'
              )}
            </div>
          </div>
          <Button
            onClick={() => actions.swap()}
            disabled={pendingRate}
            size="extra_large"
          >
            <Lang name="global_buy" />
          </Button>
        </div>
      </div>
    </div>
  );
};
