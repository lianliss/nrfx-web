import './FiatMarketForm.less';

import React from 'react';
import { connect } from 'react-redux';

import { getLang, formatDouble, isFiat, ucfirst } from '../../../../../../utils/index';
import UI from '../../../../../../ui/index';

import * as actions from '../../../../../../actions/cabinet/fiatWallets';

class FiatMarketForm extends React.Component {
  state = {
    from: 'btc',
    to: 'usd',
    typeActive: 'from',
    fromAmount: 1,
    amount: 1,
    toAmount: null
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

  getCurrenciesOptions() {
    return Object.keys(this.props.currencies)
      .map(key => this.props.currencies[key])
      .map(c => ({
        ...c,
        title: ucfirst(c.name),
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

  render() {
    const disabled = !this.props.rate;
    return (
      <UI.ContentBox className="FiatMarketForm">
        <h2 className="FiatMarketForm__title">{getLang('cabinet_fiatMarketExchangeTitle')}</h2>
        <div className="FiatMarketForm__row">
          <div className="FiatMarketForm__column">
            <UI.Input
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
              options={this.getCurrenciesOptions()}
            />
            <div className="FiatMarketForm__rate">
              {this.renderRate('from')}
            </div>
          </div>
        </div>
        <div className="FiatMarketForm__row">
          <div className="FiatMarketForm__column">
            <UI.Input
              disabled={disabled}
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
              options={this.getCurrenciesOptions()}
            />
            <div className="FiatMarketForm__rate">
              {this.renderRate('to')}
            </div>
          </div>
        </div>
        <div className="FiatMarketForm__button_wrapper">
          <UI.Button
            disabled={disabled || !(this.state.amount > 0)}
            onClick={this.handleBuy}
            state={this.props.loadingStatus}
          >{getLang('cabinet_fiatMarketExchangeActionButton')}</UI.Button>
        </div>
      </UI.ContentBox>
    )
  }
}

export default connect(store => ({
  currencies: store.cabinet.currencies,
  rate: store.fiatWallets.rate,
  loadingStatus: store.fiatWallets.loadingStatus.marketForm
}),{
  exchange: actions.exchange,
  getRate: actions.getRate
})(FiatMarketForm);