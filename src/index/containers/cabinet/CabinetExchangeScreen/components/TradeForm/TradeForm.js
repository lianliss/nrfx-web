import './TradeForm.less';

import React from 'react';

import UI from '../../../../../../ui';
import * as utils from '../../../../../../utils';
import * as actions from '../../../../../../actions';
import * as exchange from '../../../../../../actions/cabinet/exchange';
import OrderBook from '../OrderBook/OrderBook';

import * as steps from '../../../../../../components/AuthModal/fixtures';


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

  __renderPlaceholder() {
    return <div className="TradeForm__placeholder">
      <div className="TradeForm__placeholder__wrapper">
        <UI.Button onClick={() => actions.openModal('auth', {type: steps.REGISTRATION})} size="small" >{utils.getLang('site__authModalSignUpBtn')}</UI.Button>
        <span className="TradeForm__placeholder__or">{utils.getLang('global_or')}</span>
        <UI.Button onClick={() => actions.openModal('auth', {type: steps.LOGIN})} size="small" type="secondary">{utils.getLang('site__authModalLogInBtn')}</UI.Button>
      </div>
    </div>
  }

  render() {

    const { balance, market, fee, user, ticker } = this.props;
    const { state: { pending } } = this;

    const [primary, secondary] = market.split('/');
    const isMarket = this.state.orderType === "market";


    const marketPrice = utils.formatDouble(ticker.price, utils.isFiat(secondary) ? 2 : undefined);
    const marketTotalPrice = utils.formatDouble(this.state.amount * ticker.price, utils.isFiat(secondary) ? 2 : undefined);

    if (user && !balance.primary) {
      return null;
    }

    if (this.props.adaptive) {
      return (
        <div className="TradeForm">
          <div className="TradeForm__adaptive_form">
            <div className="TradeForm__adaptive_form__row">
              <UI.Dropdown
                size="small"
                placeholder="Placeholder"
                value={this.state.orderType}
                onChange={e => this.setState({ orderType: e.value })}
                options={[
                  { title: utils.getLang('exchange_type_limit'), value: 'limit' },
                  { title: utils.getLang('exchange_type_market'), value: 'market' }
                ]}
              />
            </div>

            <div className="TradeForm__adaptive_form__row">
              <UI.Input
                error={this.state.touched && !this.state.amount}
                placeholder={utils.getLang('global_amount')}
                indicator={primary.toUpperCase()}
                size="small"
                value={this.state.amount}
                onTextChange={this.__amountDidChange}
              />
              {user && <p>{primary.toUpperCase()}  {utils.getLang('global_balance')} - <UI.NumberFormat number={balance.primary.amount} currency={primary} hiddenCurrency /></p> }
            </div>
            <div className="TradeForm__adaptive_form__row">
              <UI.Input
                error={this.state.touched && !this.state.price && !isMarket}
                placeholder={isMarket ? utils.getLang('exchange_type_market') : utils.getLang('global_price')}
                disabled={isMarket}
                indicator={secondary.toUpperCase()}
                size="small"
                value={(isMarket ? "~" + marketPrice : this.state.price) || ""}
                onTextChange={this.__priceDidChange}
              />
              {user && <p>{secondary.toUpperCase()} {utils.getLang('global_balance')} -  <UI.NumberFormat number={balance.secondary.amount} currency={secondary} hiddenCurrency /></p>}
            </div>
            <div className="TradeForm__adaptive_form__row">
              <UI.Input
                placeholder={isMarket ? utils.getLang('exchange_type_market') : utils.getLang('global_total')}
                indicator={secondary.toUpperCase()}
                size="small"
                disabled={isMarket}
                onTextChange={this.__amountSecondaryDidChange}
                value={(isMarket ? ( marketTotalPrice && "~" + marketTotalPrice) : this.state.amountSecondary) || ""}
              />
              <p>{utils.getLang('exchange_fee')}: <UI.NumberFormat number={fee} percent /></p>
            </div>
            <div className="TradeForm__adaptive_form__row TradeForm__amount_selector">
              {this.__renderAmountsSelector()}
            </div>

            <div className="TradeForm__adaptive_form__buttons">
              <UI.Button
                type="buy"
                state={pending.buy && "loading"}
                onClick={() => this.__handleOrderCreate("buy")}
              >{utils.getLang('exchange_action_buy')}</UI.Button>

              <UI.Button
                type="sell"
                state={pending.sell && "loading"}
                onClick={() => this.__handleOrderCreate("sell")}
              >{utils.getLang('exchange_action_sell')}</UI.Button>
            </div>
          </div>
          <OrderBook
            adaptive={true}
            type="all"
            ticker={this.props.ticker}
            onOrderPress={(order) => {}}
            {...this.props.depth}
            loading={this.props.loadingStatus.orderBook}
          />
        </div>
      )
    }

    return (
      <UI.ContentBox className="TradeForm">
        {!user && this.__renderPlaceholder()}
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
                value={this.state.amount}
                onTextChange={this.__amountDidChange}
              />
              { user && <p className="Form__helper__text">{primary.toUpperCase()}  {utils.getLang('global_balance')} - <UI.NumberFormat number={balance.primary.amount} currency={primary} hiddenCurrency /></p> }
            </div>
            <div className="TradeForm__form__row">
              <UI.Input
                error={this.state.touched && !this.state.price && !isMarket}
                placeholder={isMarket ? utils.getLang('exchange_type_market') : utils.getLang('global_price')}
                disabled={isMarket}
                indicator={secondary.toUpperCase()}
                size="small"
                value={(isMarket ? "~" + marketPrice : this.state.price) || ""}
                onTextChange={this.__priceDidChange}
              />
              { user && <p className="Form__helper__text">{secondary.toUpperCase()} {utils.getLang('global_balance')} - <UI.NumberFormat number={balance.secondary.amount} currency={secondary} hiddenCurrency /></p> }
            </div>
            <div className="TradeForm__form__row">
              <UI.Input
                placeholder={isMarket ? utils.getLang('exchange_type_market') : utils.getLang('global_total')}
                indicator={secondary.toUpperCase()}
                size="small"
                disabled={isMarket}
                onTextChange={this.__amountSecondaryDidChange}
                value={(isMarket ? ( marketTotalPrice && "~" + marketTotalPrice) : this.state.amountSecondary) || ""}
              />
              <p className="Form__helper__text">{utils.getLang('exchange_fee')}: <UI.NumberFormat number={fee} percent /></p>
            </div>
          </div>
          <div className="TradeForm__form__controls">
            <div className="TradeForm__form__row">
              <UI.Button
                size="middle"
                type="buy"
                onClick={() => this.__handleOrderCreate("buy")}
                state={pending.buy ? 'loading' : 'default'}
              >{utils.getLang('exchange_action_buy')}</UI.Button>
            </div>
            <div className="TradeForm__form__row percents">
              {this.__renderAmountsSelector()}
            </div>
            <div className="TradeForm__form__row">
              <UI.Button
                size="middle"
                type="sell"
                state={pending.sell ? 'loading' : 'default'}
                onClick={() => this.__handleOrderCreate("sell")}
              >{utils.getLang('exchange_action_sell')}</UI.Button>
            </div>
          </div>
        </div>
      </UI.ContentBox>
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
    return ['limit', 'market'].map((type, key) => {
      return (
        <UI.Button
          key={key}
          size="ultra_small"
          rounded
          type={this.state.orderType === type ? 'normal' : 'secondary'}
          onClick={() => this.setState({ orderType: type })}
        >{utils.getLang('exchange_type_' + type)}</UI.Button>
      )
    });
  }

  __renderAmountsSelector() {
    const { balance, user } = this.props;

    return [25, 50, 75, 100].map((percent) => {
      const percentAmount = user ? utils.formatDouble(percent / 100 * balance.primary.amount) : 0;
      return (
        <UI.Button
          key={percent}
          disabled={user && balance.primary.amount === 0}
          size="ultra_small"
          rounded
          type={this.state.amount === percentAmount ? 'normal' : 'secondary'}
          onClick={() => this.__handlechangePercent(percentAmount)}
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
        ...(this.state.orderType === 'limit' && { price: this.state.price })
      }).finally(() => {
        this.setState({ pending: { ...this.state.pending, [action]: false }});
      });
    }
  }

  __handlechangePercent = percent => {
    this.setState({
      amount: percent,
      amountSecondary:  percent * this.state.price || null
    });
  };

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
