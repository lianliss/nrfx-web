import "./FiatMarketForm.less";

import React from "react";
import { connect } from "react-redux";

import {
  getLang,
  formatDouble,
  isFiat,
  ucfirst
} from "../../../../../../utils/index";
import * as UI from "../../../../../../ui/index";

import * as actions from "../../../../../../actions/cabinet/fiat";
import NumberFormat from "../../../../../../ui/components/NumberFormat/NumberFormat";
import SVG from "react-inlinesvg";
import { classNames as cn } from "src/utils";

const indicatorIcon = (
  <div className="FiatMarketForm__indicatorIcon">
    <SVG src={require("src/asset/24px/loading-small.svg")} />
  </div>
);

class FiatMarketForm extends React.Component {
  state = {
    from: "usd",
    to: "btc",
    typeActive: "to",
    fromAmount: null,
    toAmount: 1,
    amount: 1
  };

  componentDidMount() {
    this.getRate();
    this.interval = setInterval(this.getRate, 5000);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.rate !== this.props.rate ||
      prevProps.rateUpdateTime !== this.props.rateUpdateTime
    ) {
      const { state } = this;
      const secondaryType = this.invertType(state.typeActive);
      const secondaryAmount = this.getSecondaryAmount(
        this.state[state.typeActive + "Amount"],
        secondaryType
      );
      this.setState({
        [secondaryType + "Amount"]: secondaryAmount
      });
    }

    if (
      prevProps.rateStatus === "loading" &&
      !this.props.rateStatus &&
      this.props.rateType === "currencyChange"
    ) {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  [[]];

  getRate = type => {
    (this.props.rateStatus !== "loading" || type) &&
      this.props.getRate({
        base: this.state.from,
        currency: this.state.to,
        type: type || "update"
      });
  };

  handleBuy = () => {
    const { state, props } = this;
    this.props.exchange({
      from: state.from,
      to: state.to,
      amountType: props.currencies[state[state.typeActive]].type,
      amount: state.amount
    });
  };

  invertType = type => {
    return type === "from" ? "to" : "from";
  };

  handleCurrencyChange = type => e => {
    const { state } = this;
    const secondaryType = this.invertType(type);
    let secondaryCurrency = state[secondaryType];

    if (isFiat(e.value) === isFiat(state[secondaryType])) {
      secondaryCurrency = isFiat(e.value) ? "btc" : "usd";
    }

    this.setState(
      {
        [type]: e.value,
        [secondaryType]: secondaryCurrency,
        loading: true
      },
      this.getRate("currencyChange")
    );
  };

  handleAmountFocus = type => () => {
    // const secondaryType = this.invertType(type);
    this.setState({
      typeActive: type
    });
  };

  handleAmountChange = type => value => {
    const secondaryType = this.invertType(type);
    const secondaryAmount = this.getSecondaryAmount(value, secondaryType);

    this.setState({
      [type + "Amount"]: value,
      amount: value,
      [secondaryType + "Amount"]: secondaryAmount,
      typeActive: type
    });
  };

  getCurrenciesOptions(prefix) {
    return (
      this.props.canExchange
        .map(key => this.props.currencies[key])
        // .sort((a,b) => a.abbr.toLowerCase() < b.abbr.toLowerCase() ? -1 : 1)
        .map(c => ({
          ...c,
          title: (
            <>
              {prefix} {ucfirst(c.name)}
            </>
          ),
          note: c.abbr.toUpperCase(),
          value: c.abbr
        }))
    );
  }

  getSecondaryAmount = (amount, type) => {
    const { rate } = this.props;
    const secondaryAmount = isFiat(this.state[type])
      ? amount * rate
      : amount / rate;

    return formatDouble(secondaryAmount, isFiat(this.state[type]) ? 2 : 6);
  };

  formatAmount = (amount, currency) => {
    return formatDouble(amount, isFiat(currency) ? 2 : undefined);
  };

  renderRate(type) {
    if (!this.props.rate) return null;
    const secondaryType = this.invertType(type);
    return (
      <div>
        <UI.NumberFormat number={1} currency={this.state[type]} /> ≈{" "}
        <UI.NumberFormat
          number={this.getSecondaryAmount(1, secondaryType)}
          currency={this.state[secondaryType]}
        />
      </div>
    );
  }

  getBalance(type) {
    const currency = this.state[type];
    const secondaryType = this.invertType(type);

    const balances = this.props[isFiat(currency) ? "balances" : "wallets"];
    if (balances && balances.length) {
      const { amount } = balances.find(
        item => item.currency.toLowerCase() === currency
      );
      const secondaryAmount = this.getSecondaryAmount(amount, secondaryType);
      return (
        <UI.NumberFormat
          skipTitle
          onClick={() => {
            // TODO: Думаю что код ниже (if, else) можно написать лучше :-)
            if (type === "from") {
              this.setState({
                typeActive: type,
                amount: amount,
                [secondaryType + "Amount"]: secondaryAmount,
                [type + "Amount"]: this.formatAmount(amount, this.state[type])
              });
            } else {
              this.setState({
                typeActive: secondaryType,
                [secondaryType + "Amount"]: this.formatAmount(
                  amount,
                  this.state.to
                ),
                from: this.state.to,
                to: this.state.from,
                amount: amount,
                [type + "Amount"]: secondaryAmount
              });
            }
          }}
          number={amount}
          currency={currency}
        />
      );
    }
    return null;
  }

  renderFee() {
    const { exchangeFee } = this.props;
    const fee = (this.state.fromAmount / 100) * exchangeFee;
    return (
      <>
        {getLang("cabinet_fiatWalletFee")} (
        {<NumberFormat number={exchangeFee} percent />}{" "}
        {<NumberFormat number={fee} currency={this.state.from} />}) ≈{" "}
        <NumberFormat
          number={parseFloat(this.state.fromAmount) + fee}
          currency={this.state.from}
        />
      </>
    );
  }

  render() {
    const disabled = !this.props.rate;
    const Wrapper = this.props.adaptive ? UI.Collapse : UI.ContentBox;
    const { typeActive } = this.state;

    return (
      <Wrapper
        title={getLang("cabinet_fiatMarketExchangeTitle")}
        isOpenDefault={true}
        className="FiatMarketForm"
      >
        {this.props.loadingStatus && (
          <div className="FiatMarketForm__loader">
            <SVG src={require("src/asset/120/exchange.svg")} />
            <h2>{getLang("cabinet_fiatMarketExchangeWeMakeAnExchange")}</h2>
            <p>{getLang("cabinet_fiatMarketExchangeLoaderDescription")}</p>
          </div>
        )}
        {!this.props.adaptive && (
          <h2 className="FiatMarketForm__title">
            {getLang("cabinet_fiatMarketExchangeTitle")}
          </h2>
        )}
        <div className="FiatMarketForm__row">
          <div className="FiatMarketForm__column">
            <span className="FiatMarketForm__inputLabel">
              {getLang("cabinet_fiatWalletGet")}
            </span>
            <UI.Input
              indicator={
                this.state.loading && typeActive === "from" && indicatorIcon
              }
              disabled={disabled || this.state.loading}
              value={
                (typeActive !== "to" ? "~ " : "") + (this.state.toAmount || "")
              }
              onTextChange={this.handleAmountChange("to")}
              onFocus={this.handleAmountFocus("to")}
              placeholder={getLang("global_amount")}
              type={typeActive === "to" ? "number" : undefined}
            />
            <div className="FiatMarketForm__balance">
              <UI.Tooltip title={getLang("cabinet_fiatWalletMyWalletBalance")}>
                {this.getBalance("to")}
              </UI.Tooltip>
            </div>
          </div>
          <div className="FiatMarketForm__column">
            <UI.Dropdown
              placeholder="Placeholder"
              value={this.state.to}
              disabled={this.state.loading}
              onChange={this.handleCurrencyChange("to")}
              options={this.getCurrenciesOptions(
                getLang("cabinet_fiatWalletBuy")
              )}
            />
            <div
              className={cn("FiatMarketForm__rate", {
                hidden: this.state.loading
              })}
            >
              {this.renderRate("to")}
            </div>
          </div>
        </div>
        <div className="FiatMarketForm__row">
          <div className="FiatMarketForm__column">
            <span className="FiatMarketForm__inputLabel">
              {getLang("cabinet_fiatWalletGive")}
            </span>
            <UI.Input
              indicator={
                this.state.loading && typeActive === "to" && indicatorIcon
              }
              disabled={disabled || this.state.loading}
              value={
                (typeActive !== "from" ? "~ " : "") +
                (this.state.fromAmount || "")
              }
              onTextChange={this.handleAmountChange("from")}
              onFocus={this.handleAmountFocus("from")}
              placeholder={getLang("global_amount")}
              type={typeActive === "from" ? "number" : undefined}
            />
            <div className="FiatMarketForm__balance">
              <UI.Tooltip title={getLang("cabinet_fiatWalletMyWalletBalance")}>
                {this.getBalance("from")}
              </UI.Tooltip>
            </div>
          </div>
          <div className="FiatMarketForm__column">
            <UI.Dropdown
              placeholder="Placeholder"
              value={this.state.from}
              disabled={this.state.loading}
              onChange={this.handleCurrencyChange("from")}
              options={this.getCurrenciesOptions(
                getLang("cabinet_fiatWalletWith")
              )}
            />
            <div
              className={cn("FiatMarketForm__rate", {
                hidden: this.state.loading
              })}
            >
              {this.renderRate("from")}
            </div>
          </div>
        </div>
        <div className="FiatMarketForm__button_wrapper">
          {/*<p className="FiatMarketForm__fee">{this.renderFee()}</p>*/}
          <UI.Button
            disabled={
              disabled || !(this.state.amount > 0) || this.state.loading
            }
            onClick={this.handleBuy}
            state={this.props.loadingStatus}
          >
            {getLang("cabinet_fiatMarketExchangeActionButton")}
          </UI.Button>
        </div>
      </Wrapper>
    );
  }
}

export default connect(
  store => ({
    canExchange: store.fiat.can_exchange,
    balances: store.fiat.balances,
    wallets: store.fiat.wallets,
    adaptive: store.default.adaptive,
    currencies: store.cabinet.currencies,
    rate: store.fiat.rate,
    rateUpdateTime: store.fiat.rateUpdateTime,
    exchangeFee: store.fiat.exchange_fee,
    rateStatus: store.fiat.loadingStatus.rate,
    loadingStatus: store.fiat.loadingStatus.marketForm,
    translator: store.settings.translator,
    rateType: store.fiat.rateType
  }),
  {
    exchange: actions.exchange,
    getRate: actions.getRate
  }
)(FiatMarketForm);
