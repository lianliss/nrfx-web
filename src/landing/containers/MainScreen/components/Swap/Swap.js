import React, { useState, useEffect } from "react";
import "./Swap.less";
import { CircleIcon, Input, Button, NumberFormat } from "../../../../../ui";
import { formatDouble } from "src/utils/index";
import Select from "../Select/Select";
import { useSelector } from "react-redux";
import { currenciesSelector } from "../../../../../selectors";
import { getCurrencyInfo } from "../../../../../actions";
import SVG from "react-inlinesvg";
import { getRate } from "src/actions/landing/swap";
import { classNames as cn } from "src/utils/index";
import * as actions from "../../../../../actions";
import * as steps from "../../../../../components/AuthModal/fixtures";

export default () => {
  const [fromFiat, setFromFiat] = useState(true);
  const [rate, setRate] = useState(0);
  const [pendingRate, setPendingRate] = useState(false);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("btc");
  const [main, setMain] = useState("from");

  const [fromAmount, setFromAmount] = useState(1000);
  const [toAmount, setToAmount] = useState(0);

  const getCurrencyRate = () => {
    setPendingRate(true);
    getRate({
      base: from,
      currency: to
    }).then(r => {
      setRate(r.rate);
      setPendingRate(false);
    });
  };

  useEffect(() => {
    getCurrencyRate();
  }, [from, to]);

  useEffect(() => {
    if (main === "from") {
      handleChangeFromAmount(fromAmount);
    } else {
      handleChangeToAmount(toAmount);
    }
  }, [rate]);

  const currencies = useSelector(currenciesSelector);
  const currenciesCanExchange = currencies.filter(c => c.can_exchange);

  const createOptions = c => ({
    value: c.abbr,
    label: c.name,
    icon: (
      <CircleIcon
        shadow={false}
        size="small"
        currency={getCurrencyInfo(c.abbr)}
      />
    )
  });

  const fiatCurrencies = currenciesCanExchange
    .filter(c => c.type === "fiat")
    .map(createOptions);
  const cryptoCurrencies = currenciesCanExchange
    .filter(c => c.type === "crypto")
    .map(createOptions);

  const handleChangeFromAmount = value => {
    setMain("from");
    setFromAmount(value);
    setToAmount(
      formatDouble(
        fromFiat ? value / rate : value * rate,
        getCurrencyInfo(to).maximum_fraction_digits
      )
    );
  };

  const handleChangeToAmount = value => {
    setMain("to");
    setToAmount(value);
    setFromAmount(
      formatDouble(
        !fromFiat ? value / rate : value * rate,
        getCurrencyInfo(from).maximum_fraction_digits
      )
    );
  };

  const handleSwitch = () => {
    setFrom(to);
    setTo(from);
    setMain(main === "from" ? "to" : "from");
    setFromFiat(!fromFiat);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    getCurrencyRate();
  };

  return (
    <div className="Swap LandingWrapper__block">
      <div className="Swap__content LandingWrapper__content">
        <h2>Купить криптовалюту</h2>
        <p>
          Банковским переводом или кредитной картой, с минимальными комиссиями
          в несколько кликов
        </p>

        <div className="Swap__form">
          <div className="Swap__form__card">
            <div className="Swap__form__card__label">Отдать</div>
            <Select
              isDisabled={pendingRate}
              options={fromFiat ? fiatCurrencies : cryptoCurrencies}
              value={from}
              onChange={o => setFrom(o.value)}
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
                  {" ≈ "}
                  <NumberFormat
                    number={fromFiat ? 1 / rate : rate}
                    currency={to}
                  />
                </span>
              ) : (
                "..."
              )}
            </div>
          </div>
          <div
            className={cn("Swap__switchButton", { loading: pendingRate })}
            onClick={handleSwitch}
          >
            <SVG src={require("src/asset/24px/switch.svg")} />
          </div>
          <div className="Swap__form__card">
            <div className="Swap__form__card__label">Получить</div>
            <Select
              isDisabled={pendingRate}
              options={fromFiat ? cryptoCurrencies : fiatCurrencies}
              value={to}
              onChange={o => setTo(o.value)}
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
                  {" ≈ "}
                  <NumberFormat
                    number={!fromFiat ? 1 / rate : rate}
                    currency={from}
                  />
                </span>
              ) : (
                "..."
              )}
            </div>
          </div>
          <Button
            onClick={() => {
              actions.openModal("auth", { type: steps.REGISTRATION });
            }}
            disabled={pendingRate}
            size="extra_large"
          >
            Купить
          </Button>
        </div>
      </div>
    </div>
  );
};
