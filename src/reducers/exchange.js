import * as actionTypes from '../actions/actionTypes';
import * as utils from '../utils';

const initialState = {
  loadingStatus: {},
  balances: [],
  trades: {},
  openOrders: {},
  last_orders: [],
  tickerInfo: null,
  balanceInfo: {
    primary: {},
    secondary: {},
  },
  market: 'btc/usdt',
  depth: {
    asks: {},
    bids: {},
  },
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.EXCHANGE_SET: {
      let tickerInfo = {};
      for (let ticker of action.tickers) {
        if (ticker.market === state.market) {
          tickerInfo = ticker;
        }
      }

      let balanceInfo = {};
      let [primary, secondary] = state.market.split('/');
      for (let balance of action.balances) {
        if (balance.currency === primary) {
          balanceInfo.primary = balance;
        } else if (balance.currency === secondary) {
          balanceInfo.secondary = balance;
        }
      }

      let depth = {
        asks: {},
        bids: {},
      };

      for (let i = 0; i < Math.max(action.depth.asks.length, action.depth.bids.length); i++) {
        if (action.depth.asks[i]) {
          depth.asks[action.depth.asks[i].id] = action.depth.asks[i];
        }

        if (action.depth.bids[i]) {
          depth.bids[action.depth.bids[i].id] = action.depth.bids[i];
        }
      }

      let openOrders = {};
      for (let i = 0; i < action.open_orders.length; i++) {
        const order = action.open_orders[i];
        openOrders[order.id] = order;
      }

      let trades = {};
      for (let i = 0; i < action.trades.length; i++) {
        const order = action.trades[i];
        trades[order.id] = order;
      }

      return Object.assign({}, state, {
        ...utils.removeProperty(action, 'type', 'depth', 'open_orders', trades),
        tickerInfo,
        balanceInfo,
        depth,
        openOrders,
        trades,
      })
    }

    case actionTypes.EXCHANGE_SET_LOADING_STATUS: {
      return Object.assign({}, state, {
        loadingStatus: Object.assign({}, state.loadingStatus, { [action.section]: action.status })
      });
    }

    case actionTypes.EXCHANGE_REMOVE_ORDER: {
      let depth = Object.assign({}, state.depth);

      for (let orderId of action.orderIds) {
        delete depth.asks[orderId];
        delete depth.bids[orderId];
      }

      return Object.assign({}, state, { depth });
    }

    case actionTypes.EXCHANGE_ORDER_BOOK_UPDATE: {
      let depth = Object.assign({}, state.depth);
      let openOrders = Object.assign({}, state.openOrders);

      for (let order of action.orders) {
        if (openOrders[order.id]) {
          openOrders[order.id] = order;
        }

        if (order.type !== 'limit') {
          continue;
        }

        if (order.action === 'sell') {
          depth.asks[order.id] = order;
        } else if (order.action === 'buy') {
          depth.bids[order.id] = order;
        }
      }

      return Object.assign({}, state, { depth, openOrders });
    }

    case actionTypes.EXCHANGE_SET_ORDER_STATUS: {
      let openOrders = Object.assign({}, state.openOrders);
      let lastOrders = Object.assign([], state.last_orders);

      if (openOrders[action.orderId]) {
        let order = Object.assign({}, openOrders[action.orderId]);
        delete openOrders[action.orderId];
        if (lastOrders.findIndex((order) => order.id === action.orderId) === -1) {
          order.status = action.status;
          lastOrders.unshift(order);
        }
      }

      return Object.assign({}, state, {
        openOrders,
        last_orders: lastOrders,
      });
    }

    case actionTypes.EXCHANGE_ADD_OPEN_ORDER: {
      let openOrders = Object.assign({}, state.openOrders);
      openOrders[action.order.id] = action.order;
      return Object.assign({}, state, { openOrders });
    }

    case actionTypes.EXCHANGE_ADD_TRADES: {
      let trades = Object.assign({}, state.trades);
      for (let order of action.orders) {
        trades[order.id] = order
      }

      return Object.assign({}, state, { trades });
    }

    case actionTypes.EXCHANGE_UPDATE_BALANCE: {
      let balances = Object.assign([], state.balances);
      for (let i = 0; i < balances.length; i++) {
        if (balances[i].currency === action.currency) {
          balances[i].amount = action.amount;
          break;
        }
      }

      let balanceInfo = Object.assign({}, state.balanceInfo);
      const [primary, secondary] = state.market.split('/');

      if (primary === action.currency) {
        balanceInfo.primary.amount = action.amount;
      } else if (secondary === action.currency) {
        balanceInfo.secondary.amount = action.amount;
      }

      return Object.assign({}, state, { balanceInfo, balances });
    }

    default:
      return state;
  }
}
