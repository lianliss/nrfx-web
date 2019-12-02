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
    amount: 1,
    toAmount: 1
  };

  componentDidMount() {
    this.getRate();
    this.interval = setInterval(this.getRate, 5000);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.rate !== this.props.rate) {
      const { state } = this;
      const secondaryType = this.invertType(state.typeActive);
      this.setState({
        [secondaryType + 'Amount']: this.getSecondaryAmount(this.state[state.typeActive + 'Amount'], secondaryType)
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
    this.setState({
      [type + 'Amount']: value,
      amount: value,
      [secondaryType + 'Amount']: this.getSecondaryAmount(value, secondaryType),
      typeActive: type
    });
  };

  getCurrenciesOptions(prefix) {
    return Object.keys(this.props.currencies)
      .map(key => this.props.currencies[key])
      .filter(c => !(c.type === 'crypto' && !c.can_generate))
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
    return formatDouble(
      isFiat(this.state[type]) ? ( amount * rate) : (amount / rate),
      isFiat(this.state[type]) ? 2 : 6
    );
  };

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

    return fee ? {
      fee,
      fiatAmount,
      fiatType,
      fiat,
    } : {};
  }

  renderFee() {
    const { fee, fiatAmount, fiat } = this.getFee();

    if (fee) {
      const currency = fiat.toUpperCase();
      const calcFee = formatDouble(Math.max(fee.min, (fiatAmount / 100 * fee.percent)), 2);
      return `${getLang('exchange_fee')} (${fee.percent}%, ${getLang('cabinet_fiatWalletFeeMin')} ${fee.min} ${currency}) ≈ ${calcFee} ${currency}`;
    } else {
      return '-';
    }
  }

  render() {
    const disabled = !this.props.rate;
    const Wrapper = this.props.adaptive ? UI.Collapse : UI.ContentBox;
    const { fiatType, fiatAmount, fee } = this.getFee();
    const error = fiatAmount < fee.min;

    return (
      <Wrapper isOpenDefault={false} className="FiatMarketForm">
        { !this.props.adaptive && <h2 className="FiatMarketForm__title">{this.state.from} {this.state.to} {getLang('cabinet_fiatMarketExchangeTitle')}</h2> }
        <div className="FiatMarketForm__row">
          <div className="FiatMarketForm__column">
            <UI.Input
              disabled={disabled}
              error={fiatType === 'to' && error}
              value={this.state.toAmount}
              onTextChange={this.handleAmountChange('to')}
              placeholder={getLang('global_amount')}
              type="number" />
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
              value={this.state.fromAmount}
              onTextChange={this.handleAmountChange('from')}
              placeholder={getLang('global_amount')}
              type="number" />
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
          <p className="FiatMarketForm__fee">{this.renderFee()}</p>
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
  adaptive: store.default.adaptive,
  currencies: store.cabinet.currencies,
  rate: store.fiatWallets.rate,
  exchangeFee: store.fiatWallets.exchange_fee,
  loadingStatus: store.fiatWallets.loadingStatus.marketForm
}),{
  exchange: actions.exchange,
  getRate: actions.getRate
})(FiatMarketForm);
