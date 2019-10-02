import * as actionTypes from '../actionTypes';
import * as api from '../../services/api';
import apiSchema from '../../services/apiSchema';
import store from '../../store';
import * as toast from '../cabinet/toasts';

export function load(market) {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.EXCHANGE_SET_LOADING_STATUS, section: 'default', status: 'loading' });
    api.call(apiSchema.Exchange.DefaultGet, {
      market,
      chart_time_frame: getState().exchange.chartTimeFrame,
    }).then((resp) => {
      dispatch({
        type: actionTypes.EXCHANGE_SET,
        ...resp
      });
      dispatch({ type: actionTypes.EXCHANGE_SET_LOADING_STATUS, section: 'default', status: '' });
    }).catch(() => {
      dispatch({ type: actionTypes.EXCHANGE_SET_LOADING_STATUS, section: 'default', status: 'failed' });
    })
  };
}

export function orderCreate(params) {
  return api.call(apiSchema.Exchange.OrderPut, params).then(() => {
    toast.success("ok");
  }).catch((err) => {
    toast.error(err.message);
  })
}

export function orderDelete(orderId) {
  return api.call(apiSchema.Exchange.OrderDelete, {
    order_id: orderId
  }).then(() => {
    store.dispatch({ type: actionTypes.EXCHANGE_SET_ORDER_PENDING, orderId });
  }).catch(err => {
    toast.error(err.message);
  });
}

export function removeOrders(orderIds) {
  store.dispatch({ type: actionTypes.EXCHANGE_REMOVE_ORDER, orderIds });
}

export function orderBookUpdateOrders(orders) {
  store.dispatch({ type: actionTypes.EXCHANGE_ORDER_BOOK_UPDATE, orders });
}

export function setOrderStatus(orderId, status) {
  store.dispatch({ type: actionTypes.EXCHANGE_SET_ORDER_STATUS, orderId, status });
}

export function addOpenOrder(order) {
  store.dispatch({ type: actionTypes.EXCHANGE_ADD_OPEN_ORDER, order });
}

export function addTrades(orders) {
  store.dispatch({ type: actionTypes.EXCHANGE_ADD_TRADES, orders });
}

export function updateBalance(currency, amount) {
  store.dispatch({ type: actionTypes.EXCHANGE_UPDATE_BALANCE, currency, amount });
}

export function changeTimeFrame(timeFrame) {
  return (dispatch) => {
    dispatch({ type: actionTypes.EXCHANGE_CHANGE_TIME_FRAME, timeFrame });
  };
}