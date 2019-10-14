import * as realTime from './realtime';
import * as exchange from '../actions/cabinet/exchange';
import * as toasts from '../actions/cabinet/toasts';

let markets = {};

class Exchange {
  constructor(market) {
    this.market = market;

    this.listeners = [
      ['new_orders', this.__orderBookDidUpdated],
      ['orders_filled', this.__orderBookDidUpdated],
      ['order_completed', this.__orderDidCompleted],
      ['cancel_order', this.__orderDidCancel],
      ['order_cancelled', this.__orderDidCancelled],
      ['cancel_order_failed', this.__orderDidCancelFailed],
      ['order_created', this.__orderDidCreated],
      ['trade_list', this.__orderDidTrade],
      ['balance_update', this.__balanceDidUpdate],
      ['ticker', this.__tickerUpdate]
    ];

    this.__bind();
  }

  destroy() {
    realTime.shared.unsubscribe('market_' + this.market);

    for (let [ name, callback ] of this.listeners) {
      realTime.shared.removeListener(name, callback);
    }
  }

  __bind() {
    realTime.shared.subscribe('market_' + this.market);

    for (let [ name, callback ] of this.listeners) {
      realTime.shared.addListener(name, callback);
    }
  }

  __orderBookDidUpdated = (orders) => exchange.orderBookUpdateOrders(orders);

  __orderDidCompleted = body => {
    exchange.setOrderStatus(body.order_id, 'completed');
  };

  __orderDidCancel = (orderId) => exchange.removeOrders([orderId]);

  __orderDidCancelled = (orderId) => {
    exchange.setOrderStatus(orderId, 'cancelled');
    toasts.success('Your order has been canceled');
  };

  __orderDidCancelFailed = () => toasts.error('Can\'t cancel order');;

  __orderDidCreated = (order) => exchange.addOpenOrder(order);

  __orderDidTrade = (orders) => {
    exchange.removeOrders(orders.map(order => order.id));
    exchange.addTrades(orders);
  };

  __balanceDidUpdate = ({ currency, amount }) => exchange.updateBalance(currency, amount);

  __tickerUpdate = (ticker) => exchange.tickerUpdate(ticker);
}


export function bind(market) {
  markets[market] = new Exchange(market);
}

export function unbind(market) {
  if (markets[market]) {
    markets[market].destroy();
    delete markets[market];
  }
}