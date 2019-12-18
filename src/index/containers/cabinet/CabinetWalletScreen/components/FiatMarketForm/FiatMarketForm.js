import './FiatMarketForm.less';

import React from 'react';
import { connect } from 'react-redux';

import { getLang, formatDouble, isFiat, ucfirst } from '../../../../../../utils/index';
import UI from '../../../../../../ui/index';

import * as actions from '../../../../../../actions/cabinet/fiatWallets';
import NumberFormat from '../../../../../../ui/components/NumberFormat/NumberFormat';

class FiatMarketForm extends React.Component {
  state = {
    from: 'usd',
    to: 'btc',
    typeActive: 'to',
    fromAmount: null,
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
    });
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

  renderRate(type) {
    if (!this.props.rate) return null;
    const secondaryType = this.invertType(type);
    return <div>
      <UI.NumberFormat number={1} currency={this.state[type]} /> ≈ <UI.NumberFormat number={ this.getSecondaryAmount(1, secondaryType)} currency={this.state[secondaryType]} />
    </div>;
  }

  getBalance(type) {
    const currency = this.state[type];

    const balances = this.props[isFiat(currency) ? 'balances' : 'wallets'];
    if (balances) {
      const { amount } = balances.find(item => item.currency.toLowerCase() === currency);
      return <UI.NumberFormat number={amount} currency={currency} />
    } return null;
  }

  renderFee() {
    const { exchangeFee } = this.props;
    const fee = this.state.fromAmount / 100 * exchangeFee;
    return (<>{getLang('cabinet_fiatWalletFee')} ({<NumberFormat number={exchangeFee} percent />} {<NumberFormat number={fee} currency={this.state.from} />}) ≈ <NumberFormat number={parseFloat(this.state.fromAmount) + fee} currency={this.state.from} /></>);
  }

  render() {
    const disabled = !this.props.rate;
    const Wrapper = this.props.adaptive ? UI.Collapse : UI.ContentBox;

    return (
      <Wrapper title={getLang('cabinet_fiatMarketExchangeTitle')} isOpenDefault={false} className="FiatMarketForm">
        { !this.props.adaptive && <h2 className="FiatMarketForm__title">{getLang('cabinet_fiatMarketExchangeTitle')}</h2> }
        <div className="FiatMarketForm__row">
          <div className="FiatMarketForm__column">
            <UI.Input
              disabled={disabled}
              value={this.state.toAmount}
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
              disabled={disabled}
              value={this.state.fromAmount}
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
          <p className="FiatMarketForm__fee">{this.renderFee()}</p>
          <UI.Button
            disabled={disabled || !(this.state.amount > 0)}
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
