import * as actionTypes from '../actions/actionTypes';
import * as utils from '../utils';

const initialState = {
  loadingStatus: {
    orderBook: 'loading'
  },
  balances: [],
  trades: {},
  openOrders: {},
  last_orders: [],
  fee: 0,
  tickerInfo: {
    diff: 0,
    percent: 0
  },
  balanceInfo: {
    primary: {},
    secondary: {},
  },
  market: 'btc/usdt',
  markets: [],
  depth: {
    asks: {},
    bids: {},
  },
  chart: [],
  chartTimeFrame: 5,
  fullscreen: false,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.EXCHANGE_SET: {
      let tickerInfo = action.ticker || state.tickerInfo;

      let balanceInfo = {};
      let [primary, secondary] = action.market.toUpperCase().split('/');

      balanceInfo.primary = { amount: 0, currency: primary };
      balanceInfo.secondary = { amount: 0, currency: secondary };

      if (action.balances) {
        for (let balance of action.balances) {
          if (balance.currency === primary) {
            balanceInfo.primary = balance;
          } else if (balance.currency === secondary) {
            balanceInfo.secondary = balance;
          }
        }
      }

      // let depth = {
      //   asks: {},
      //   bids: {},
      // };
      //
      // for (let i = 0; i < Math.max(action.depth.asks.length, action.depth.bids.length); i++) {
      //   if (action.depth.asks[i]) {
      //     depth.asks[action.depth.asks[i].id] = action.depth.asks[i];
      //   }
      //
      //   if (action.depth.bids[i]) {
      //     depth.bids[action.depth.bids[i].id] = action.depth.bids[i];
      //   }
      // }

      let openOrders = {};
      if (action.open_orders) {
        for (let i = 0; i < action.open_orders.length; i++) {
          const order = action.open_orders[i];
          openOrders[order.id] = order;
        }
      }
      //
      // let trades = {};
      // for (let i = 0; i < action.trades.length; i++) {
      //   const order = action.trades[i];
      //   trades[order.id] = order;
      // }

      return Object.assign({}, state, {
        ...utils.removeProperty(action, 'type', 'depth', 'open_orders'),
        tickerInfo,
        balanceInfo,
        // depth,
        openOrders,
        trades: action.trades,
        market: action.market
      })
    }

    case actionTypes.EXCHANGE_SET_LOADING_STATUS: {
      return {
        ...state,
        depth: (action.section === 'default' && action.status === 'loading' ? initialState.depth : state.depth),
        loadingStatus: {
          ...state.loadingStatus,
          [action.section]: action.status
        }
      };
    }

    case actionTypes.EXCHANGE_REMOVE_ORDERS: {
      const depth = { ...state.depth };
      const openOrders = { ...state.openOrders };

      action.orderIds.forEach((orderId) => {
        delete depth.asks[orderId];
        delete depth.bids[orderId];
        delete openOrders[orderId];
      });
      return ({ ...state, depth, openOrders });
    }

    case actionTypes.EXCHANGE_ORDER_BOOK_INIT: {
      const asks = {};
      const bids = {};
      action.asks.forEach(i => { asks[i.id] = i });
      action.bids.forEach(i => { bids[i.id] = i });
      return {
        ...state,
        depth: {
          asks: asks,
          bids: bids,
        },
      };
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

    case actionTypes.EXCHANGE_SET_ORDER_PENDING: {
      return {
        ...state,
        openOrders: {
          ...state.openOrders,
          [action.orderId]: {
            ...state.openOrders[action.orderId],
            status: "pending"
          }
        }
      }
    }

    case actionTypes.EXCHANGE_ADD_OPEN_ORDER: {
      return { ...state, openOrders: {
        ...state.openOrders,
        [action.order.id]: action.order
      }};
    }

    case actionTypes.EXCHANGE_ORDER_BOOK_REMOVE_ORDER: {
      const depth = { ...state.depth };

      action.orders.forEach( order => {
        delete depth.asks[order.id];
        delete depth.bids[order.id];
      });

      return { ...state, depth };
    }

    case actionTypes.EXCHANGE_ADD_TRADES: {
      return {
        ...state,
        trades: [ ...action.trades, ...state.trades ]
      };
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

    case actionTypes.EXCHANGE_CHANGE_TIME_FRAME: {
      return Object.assign({}, state, { chartTimeFrame: action.timeFrame });
    }

    case actionTypes.EXCHANGE_SET_MARKETS: {
      return {
        ...state,
        markets: action.markets
      }
    }

    case actionTypes.EXCHANGE_SET_FULLSCREEN: {
      return {
        ...state,
        fullscreen: action.status
      }
    }

    case actionTypes.EXCHANGE_TICKER_UPDATE: {
      return {
        ...state,
        tickerInfo: {
          ...state.tickerInfo,
          ...action.ticker,
          prevPrice: state.tickerInfo.price,
        }
      }
    }

    default:
      return state;
  }
}
