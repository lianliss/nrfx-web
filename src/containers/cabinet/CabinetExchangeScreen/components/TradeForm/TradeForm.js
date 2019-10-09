import './TradeForm.less';

import React from 'react';

import UI from '../../../../../ui';
import * as utils from '../../../../../utils';
import * as exchange from '../../../../../actions/cabinet/exchange';


export default class TradeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderType: 'limit',
      price: null,
      amount: null,
      amountSecondary: null,
      touched: false,
      pending: {
        buy: false,
        sell: false,
      }
    };
  }

  get isFiat() {
    const [, secondary] = this.props.market.split('/');
    return secondary === 'usdt';
  }

  render() {
    const { balance, market } = this.props;
    const { state: { pending } } = this;

    if (!balance.primary) {
      return null;
    }

    const [primary, secondary] = market.split('/');
    const isMarket = this.state.orderType === "market";

    return (
      <div className="TradeForm Content_box">
        <div className="TradeForm__types">
          {this.__renderOrderType()}
        </div>
        <div className="TradeForm__form__wrap">
          <div className="TradeForm__form">
            <div className="TradeForm__form__row">
              <UI.Input
                error={this.state.touched && !this.state.amount}
                placeholder={utils.getLang('global_amount')}
                indicator={primary.toUpperCase()}
                size="small"
                value={this.state.amount === null ? '' : this.state.amount}
                onTextChange={this.__amountDidChange}
              />
              <p className="Form__helper__text">{primary.toUpperCase()}  {utils.getLang('global_balance')} - {utils.formatDouble(balance.primary.amount)}</p>
            </div>
            <div className="TradeForm__form__row">
              <UI.Input
                error={this.state.touched && !this.state.price && !isMarket}
                placeholder={utils.getLang('global_price')}
                disabled={isMarket}
                indicator={secondary.toUpperCase()}
                size="small"
                value={this.state.price === null || isMarket ? '' : this.state.price}
                onTextChange={this.__priceDidChange}
              />
              <p className="Form__helper__text">{secondary.toUpperCase()} {utils.getLang('global_balance')} - {utils.formatDouble(balance.secondary.amount, this.isFiat ? 2 : void 0)}</p>
            </div>
            <div className="TradeForm__form__row">
              <UI.Input
                placeholder={utils.getLang('global_total')}
                indicator={secondary.toUpperCase()}
                size="small"
                disabled={isMarket}
                onTextChange={this.__amountSecondaryDidChange}
                value={this.state.amountSecondary === null || isMarket ? '' : this.state.amountSecondary}
              />
              <p className="Form__helper__text">{utils.getLang('exchange_fee')}: 0.02%</p>
            </div>
          </div>
          <div className="TradeForm__form__controls">
            <div className="TradeForm__form__row">
              <UI.Button
                size="middle"
                type="buy"
                onClick={() => this.__handleOrderCreate("buy")}
                disabled={pending.buy}
              >{utils.getLang('exchange_action_buy')}</UI.Button>
            </div>
            <div className="TradeForm__form__row percents">
              {this.__renderAmountsSelector()}
            </div>
            <div className="TradeForm__form__row">
              <UI.Button
                size="middle"
                type="sell"
                disabled={pending.sell}
                onClick={() => this.__handleOrderCreate("sell")}
              >{utils.getLang('exchange_action_sell')}</UI.Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  __priceDidChange = (value) => {
    if (isNaN(value)) {
      return;
    }

    const amount = value > 0 ? utils.formatDouble(value * this.state.amount, this.isFiat ? 2 : void 0) : 0;
    this.setState({
      price: value,
      amountSecondary: amount > 0 ? amount : null,
    });
  };

  __amountDidChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    this.setState({
      amount: value,
      amountSecondary: value > 0 && this.state.price > 0 ? utils.formatDouble(value * this.state.price, this.isFiat ? 2 : void 0) : null,
    });
  };

  __amountSecondaryDidChange = (value) => {
    if (isNaN(value)) {
      return;
    }
    this.setState({
      amount: value > 0 && this.state.price > 0 ? utils.formatDouble(parseFloat(value) / this.state.price) : null,
      amountSecondary: value,
    });
  };

  __renderOrderType() {
    return ['limit', 'market'].map((type) => {
      return (
        <UI.Button
          key={type}
          size="ultra_small"
          rounded
          type={this.state.orderType === type ? '' : 'secondary'}
          onClick={() => this.setState({ orderType: type })}
        >{utils.getLang('exchange_type_' + type)}</UI.Button>
      )
    });
  }

  __renderAmountsSelector() {
    const { balance } = this.props;

    return [25, 50, 75, 100].map((percent) => {
      const percentAmount = utils.formatDouble(percent / 100 * balance.primary.amount);
      return (
        <UI.Button
          key={percent}
          disabled={balance.primary.amount === 0}
          size="ultra_small"
          rounded
          type={this.state.amount === percentAmount ? '' : 'secondary'}
          onClick={() => this.setState({ amount: percentAmount })}
        >{`${percent}%`}</UI.Button>
      )
    });
  }

  __handleOrderCreate(action) {
    this.setState({ touched: true });
    if (this.state.amount && (this.state.orderType === 'market' || this.state.price)) {
      this.setState({ pending: { ...this.state.pending, [action]: true }});
      exchange.orderCreate({
        action,
        type: this.state.orderType,
        market: this.props.market,
        amount: this.state.amount,
        ...(this.state.orderType === 'limit' && { price: this.state.amount })
      }).finally(() => {
        this.setState({ pending: { ...this.state.pending, [action]: false }});
      });
    }
  }

  set(amount, price) {
    amount = utils.formatDouble(amount);
    price = utils.formatDouble(price);
    this.setState({
      amount,
      price,
      amountSecondary: utils.formatDouble(amount * price, this.isFiat ? 2 : void 0)
    });
  }
}
