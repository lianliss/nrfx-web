import './FiatMarketForm.less';

import React from 'react';
import { connect } from 'react-redux';

import { getLang, formatDouble, isFiat, ucfirst } from '../../../../../../utils/index';
import UI from '../../../../../../ui/index';

import * as actions from '../../../../../../actions/cabinet/fiatWallets';

class FiatMarketForm extends React.Component {
  state = {
    from: 'usd',
    to: 'btc',
    typeActive: 'to',
    fromAmount: null,
    fee: 0,
    toAmount: 1,
    amount: 1,
  };

  componentDidMount() {
    this.getRate();
    this.interval = setInterval(this.getRate, 5000);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.rate !== this.props.rate) {
      const { state } = this;
      const secondaryType = this.invertType(state.typeActive);
      const secondaryAmount = this.getSecondaryAmount(this.state[state.typeActive + 'Amount'], secondaryType);
      this.setState({
        fee: this.calculateFee(secondaryAmount, secondaryType),
        [secondaryType + 'Amount']: secondaryAmount
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRate = () => {
    const [base, currency] = [this.state.from, this.state.to][ isFiat(this.state.to) ? 'reverse' : 'flat']();
    this.props.getRate({base, currency});
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

  invertType = (type) => {
    return type === 'from' ? 'to' : 'from';
  };

  handleCurrencyChange = (type) => (e) => {
    const { state } = this;
    const secondaryType = this.invertType(type);
    let secondaryCurrency = state[secondaryType];

    if (isFiat(e.value) === isFiat(state[secondaryType])) {
      secondaryCurrency = isFiat(e.value) ? 'btc' : 'usd';
    }

    this.setState({
      [type]: e.value,
      [secondaryType]: secondaryCurrency
    }, this.getRate);
  };

  handleAmountChange = (type) => (value) => {
    const secondaryType = this.invertType(type);
    const secondaryAmount = this.getSecondaryAmount(value, secondaryType);

    this.setState({
      [type + 'Amount']: value,
      amount: value,
      [secondaryType + 'Amount']: secondaryAmount,
      typeActive: type,
      fee: this.calculateFee(secondaryAmount, secondaryType)
    });
  };

  getValue = (type) => {
    const amount = this.state[type + 'Amount'];

    return formatDouble(
      type === this.state.typeActive ? amount : amount + this.state.fee,
      isFiat(this.state[type]) ? 2 : 8
    );
  };

  getCurrenciesOptions(prefix) {
    return this.props.canExchange
      .map(key => this.props.currencies[key])
      .map(c => ({
        ...c,
        title: prefix + ' ' + ucfirst(c.name),
        note: c.abbr.toUpperCase(),
        value: c.abbr,
      }))
      .sort((a,b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
  }

  getSecondaryAmount = (amount, type) => {
    const { rate } = this.props;
    const secondaryAmount = isFiat(this.state[type]) ? ( amount * rate) : (amount / rate);

    return formatDouble(
      secondaryAmount,
      isFiat(this.state[type]) ? 2 : 6
    );
  };

  calculateFee(amount, type) {
    const typeIsFiat = isFiat(this.state[type]);
    const { rate } = this.props;
    const { exchangeFee } = this.props;
    const fiatType = typeIsFiat ? type : this.invertType(type);
    const fiat = this.state[fiatType];
    const fee = exchangeFee[fiat];
    const fiatAmount = typeIsFiat ? amount : amount * rate;
    const calcFee = Math.max(fee.min, (fiatAmount / 100 * fee.percent));
    return typeIsFiat ? calcFee : calcFee / rate;
  }

  renderRate(type) {
    if (!this.props.rate) return null;
    const secondaryType = this.invertType(type);
    return <div>
      <UI.NumberFormat number={1} currency={this.state[type]} /> ≈ <UI.NumberFormat number={ this.getSecondaryAmount(1, secondaryType)} currency={this.state[secondaryType]} />
    </div>;
  }

  getFee() {
    const { exchangeFee } = this.props;
    const fiatType =  isFiat(this.state.from) ? 'from' : 'to';
    const fiat = this.state[fiatType];
    const fiatAmount = this.state[fiatType+'Amount'];
    const fee = exchangeFee[fiat];
    const calcFee = Math.max(fee.min, (fiatAmount / 100 * fee.percent));

    return fee ? {
      fee,
      fiatAmount,
      fiatType,
      fiat,
      calcFee
    } : {};
  }

  renderFee() {
    const { fee, fiat, calcFee } = this.getFee();

    if (fee) {
      const currency = fiat.toUpperCase();
      return `${getLang('exchange_fee')} (${fee.percent}%, ${getLang('cabinet_fiatWalletFeeMin')} ${fee.min} ${currency}) ≈ ${formatDouble(calcFee, 2)} ${currency}`;
    } else {
      return '-';
    }
  }

  getBalance(type) {
    const currency = this.state[type];

    const balances = this.props[isFiat(currency) ? 'balances' : 'wallets'];
    if (balances) {
      const { amount } = balances.find(item => item.currency.toLowerCase() === currency);
      return <UI.NumberFormat number={amount} currency={currency} />
    } return null;
  }

  // renderTotal() {
  //
  //   const amounts = [amount, secondaryAmount];
  //   if (type === 'from') {
  //     amounts.reverse();
  //   }
  //
  //   return (
  //     <>{getLang('cabinet_fiatWalletPurchase')} <UI.NumberFormat number={amounts[0]} currency={this.state.to} /> {getLang('cabinet_fiatWalletWith')} <UI.NumberFormat number={amounts[1]} currency={this.state.from} /></>
  //   );
  // }

  render() {
    const disabled = !this.props.rate;
    const Wrapper = this.props.adaptive ? UI.Collapse : UI.ContentBox;
    const { fiatType, fiatAmount, fee } = this.getFee();
    const error = fiatAmount < fee.min;

    return (
      <Wrapper title={getLang('cabinet_fiatMarketExchangeTitle')} isOpenDefault={false} className="FiatMarketForm">
        { !this.props.adaptive && <h2 className="FiatMarketForm__title">{getLang('cabinet_fiatMarketExchangeTitle')}</h2> }
        <div className="FiatMarketForm__row">
          <div className="FiatMarketForm__column">
            <UI.Input
              disabled={disabled}
              error={fiatType === 'to' && error}
              value={this.getValue('to')}
              onTextChange={this.handleAmountChange('to')}
              placeholder={getLang('global_amount')}
              type="number" />
            <div className="FiatMarketForm__balance">
              {this.getBalance('to')}
            </div>
          </div>
          <div className="FiatMarketForm__column">
            <UI.Dropdown
              placeholder="Placeholder"
              value={this.state.to}
              onChange={this.handleCurrencyChange('to')}
              options={this.getCurrenciesOptions(getLang('cabinet_fiatWalletBuy'))}
            />
            <div className="FiatMarketForm__rate">
              {this.renderRate('to')}
            </div>
          </div>
        </div>
        <div className="FiatMarketForm__row">
          <div className="FiatMarketForm__column">
            <UI.Input
              error={fiatType === 'from' && error}
              disabled={disabled}
              value={this.getValue('from')}
              onTextChange={this.handleAmountChange('from')}
              placeholder={getLang('global_amount')}
              type="number" />
            <div className="FiatMarketForm__balance">
              {this.getBalance('from')}
            </div>
          </div>
          <div className="FiatMarketForm__column">
            <UI.Dropdown
              placeholder="Placeholder"
              value={this.state.from}
              onChange={this.handleCurrencyChange('from')}
              options={this.getCurrenciesOptions(getLang('cabinet_fiatWalletWith'))}
            />
            <div className="FiatMarketForm__rate">
              {this.renderRate('from')}
            </div>
          </div>
        </div>
        <div className="FiatMarketForm__button_wrapper">
          <p className="FiatMarketForm__fee">{getLang('cabinet_fiatWalletPriceAlgorithm')}<br />{this.renderFee()}</p>
          {/*<p className="FiatMarketForm__total">{this.renderTotal()}</p>*/}
          <UI.Button
            disabled={error || disabled || !(this.state.amount > 0)}
            onClick={this.handleBuy}
            state={this.props.loadingStatus}
          >{getLang('cabinet_fiatMarketExchangeActionButton')}</UI.Button>
        </div>
      </Wrapper>
    )
  }
}

export default connect(store => ({
  canExchange: store.fiatWallets.can_exchange,
  balances: store.fiatWallets.balances,
  wallets: store.fiatWallets.wallets,
  adaptive: store.default.adaptive,
  currencies: store.cabinet.currencies,
  rate: store.fiatWallets.rate,
  exchangeFee: store.fiatWallets.exchange_fee,
  loadingStatus: store.fiatWallets.loadingStatus.marketForm
}),{
  exchange: actions.exchange,
  getRate: actions.getRate
})(FiatMarketForm);
