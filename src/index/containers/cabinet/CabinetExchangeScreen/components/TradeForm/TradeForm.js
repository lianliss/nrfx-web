import './TradeForm.less';

import React from 'react';
import { connect } from 'react-redux';
import UI from '../../../../../../ui';
import * as actions from 'src/actions/cabinet/exchange';
import { openModal } from 'src/actions/index';
import * as utils from '../../../../../../utils';
import * as steps from '../../../../../../components/AuthModal/fixtures';


class TradeForm extends React.Component {
  numberFormat = number => {
    const [,secondaryCurrency] = this.props.market.toUpperCase().split('/');
    return utils.formatDouble(number, (utils.isFiat(secondaryCurrency) ? 2 : 8));
  };

  handleOrderCreate = action => () => {
    this.props.tradeFormSetProperties(action, {
      touched: true
    });

    const form = this.props.form[action];
    if (form.amount && (this.props.form.type === 'market' || form.price)) {
      this.props.orderCreate({
        action,
        type: this.props.form.type,
        market: this.props.market,
        amount: form.amount,
        ...(this.props.form.type === 'limit' && {price: form.price})
      });
    }
  }

  handleChangePrice = type => value => {
    const form = this.props.form[type];
    this.props.tradeFormSetProperties(type, {
      price: value,
      total: (this.numberFormat(value * form.amount) || form.total)
    });
  };

  handleChangeAmount = type => value => {
    const form = this.props.form[type];
    this.props.tradeFormSetProperties(type, {
      amount: value,
      total: (this.numberFormat(value * form.price) || '')
    });
  };

  handleChangeTotal = type => value => {
    const { price, amount } = this.props.form[type];
    this.props.tradeFormSetProperties(type, {
      total: value,
      price: ( value && !price ? ( amount ? this.numberFormat(value / amount) : '') : price),
      amount: (value && price ? utils.formatDouble(value / price) : amount)
    });
  };

  getBalance = currency => {
    return this.props.balances.find(b => b.currency.toLowerCase() === currency.toLowerCase());
  };

  renderForm = (type) => {
    const isMarket = this.props.form.type === 'market';
    const form = this.props.form[type];
    const [primaryCurrency, secondaryCurrency] = this.props.market.toUpperCase().split('/');
    const balance = this.props.isLogged ? this.getBalance(type === "buy" ? primaryCurrency : secondaryCurrency) : {};
    const marketTotalPrice = utils.formatDouble(form.amount * this.props.ticker.price, utils.isFiat(secondaryCurrency) ? 2 : undefined);

    return (
      <div className="TradeForm__form">
        <div className="TradeForm__form__header">
          <div className="TradeForm__form__title">{utils.ucfirst(type)} {primaryCurrency.toUpperCase()}</div>
          <div className="TradeForm__form__balance">
            <span className="TradeForm__form__fee__label">{utils.getLang('global_balance')}:</span>
            <UI.NumberFormat number={balance.amount} currency={balance.currency} />
          </div>
        </div>
        <div className="TradeForm__form__row">
          <div className="TradeForm__form__coll">
            <UI.Input
              type="number"
              error={form.touched && !isMarket && !form.price}
              value={!isMarket && form.price}
              onTextChange={this.handleChangePrice(type)}
              size="small"
              placeholder={isMarket ? utils.getLang('exchange_type_market') : utils.getLang('global_price')}
              disabled={isMarket}
              indicator={secondaryCurrency}
            />
          </div>
          <div className="TradeForm__form__coll">
            <UI.Input
              type="number"
              error={form.touched && !form.amount}
              value={form.amount}
              onTextChange={this.handleChangeAmount(type)}
              size="small"
              placeholder={utils.getLang('exchange_amount')}
              indicator={primaryCurrency}
            />
          </div>
        </div>
        <div className="TradeForm__form__row">
          <div className="TradeForm__form__coll">
            <UI.SwitchTabs
              onChange={value => this.handleChangeAmount(type)(balance.amount / 100 * value)}
              size="ultra_small"
              disabled={!balance.amount}
              type="secondary"
              tabs={[25, 50, 75, 100].map(value => ({ value, label: value + '%' }))}
            />
          </div>
          <div className="TradeForm__form__coll">
            <UI.Input
              type="number"
              error={form.touched && !isMarket && !form.total}
              value={(isMarket ? ( marketTotalPrice ? "~" + marketTotalPrice : '') : form.total)}
              onTextChange={this.handleChangeTotal(type)}
              size="small"
              disabled={isMarket}
              placeholder={isMarket ? utils.getLang('exchange_type_market') : utils.getLang('global_total')}
              indicator={secondaryCurrency}
            />
          </div>
        </div><div className="TradeForm__form__row">
          <div className="TradeForm__form__coll fee">
            <div className="TradeForm__form__fee">
              {utils.getLang('global_fee')}: <UI.NumberFormat number={this.props.fee} percent />
            </div>
          </div>
          <div className="TradeForm__form__coll">
            <UI.Button
              type={type}
              onClick={this.handleOrderCreate(type)}
              state={this.props.loadingStatus[type]}
              children={utils.getLang('global_' + type ) + ' ' + primaryCurrency}
              size="small"
            />
          </div>
        </div>
      </div>
    );
  };

  renderPlaceholder() {
    if (this.props.isLogged) return null;
    return <div className="TradeForm__placeholder">
      <div className="TradeForm__placeholder__wrapper">
        <UI.Button onClick={() => openModal('auth', {type: steps.REGISTRATION})} size="small" >{utils.getLang('site__authModalSignUpBtn')}</UI.Button>
        <span className="TradeForm__placeholder__or">{utils.getLang('global_or')}</span>
        <UI.Button onClick={() => openModal('auth', {type: steps.LOGIN})} size="small" type="secondary">{utils.getLang('site__authModalLogInBtn')}</UI.Button>
      </div>
    </div>
  }

  render() {
    return (
      <UI.ContentBox className="TradeForm">
        {this.renderPlaceholder()}
        <div className="TradeForm__tradeTypeButtons">
          {['limit', 'market'].map(type => (
            <UI.Button
              size="ultra_small"
              onClick={() => this.props.tradeFormSetType(type)}
              type={type !== this.props.form.type && "secondary"}
            >{utils.ucfirst(type)}</UI.Button>
          ))}
        </div>
        <div className="TradeForm__forms">
          {['buy', 'sell'].map(this.renderForm)}
        </div>
      </UI.ContentBox>
    );
  }
}

export default connect(state => ({
  form: state.exchange.form,
  ticker: state.exchange.ticker,
  market: state.exchange.market,
  balances: state.exchange.balances,
  loadingStatus: state.exchange.loadingStatus,
  fee: state.exchange.fee,
  isLogged: !!state.default.profile.user,
}), {
  orderCreate: actions.orderCreate,
  tradeFormSetType: actions.tradeFormSetType,
  tradeFormSetProperties: actions.tradeFormSetProperties,
})(TradeForm);
