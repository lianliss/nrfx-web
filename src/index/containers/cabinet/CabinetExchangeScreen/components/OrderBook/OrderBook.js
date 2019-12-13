import './OrderBook.less';

import React, { useState } from 'react';

import * as utils from '../../../../../../utils';
import UI from '../../../../../../ui/index';
import LoadingStatus from '../../../../../components/cabinet/LoadingStatus/LoadingStatus';

export default function OrderBook({ asks, bids, onOrderPress, adaptive, ticker, type }) {

  [asks, bids] = [asks, bids].map(prepareOrders);
  const [status, setStatus] = useState('loading');

  const sideLimit = adaptive ? 7 : 11;

  const sumAsks = asks.reduce((total, order) => total + order.amount, 0);
  const sumBids = bids.reduce((total, order) => total + order.amount, 0);

  const asksMaxTotal = Math.max(...asks.map(order => order.amount * order.price));
  const bidsMaxTotal = Math.max(...bids.map(order => order.amount * order.price));

  const whole = Math.max(asksMaxTotal, bidsMaxTotal);

  let total = sumAsks + sumBids;
  let asksPercent = sumAsks / total * 100;
  let bidsPercent = sumBids / total * 100;
  let diff = Math.round(Math.abs(asksPercent - bidsPercent));

  if (![...asks, ...bids].length && status) {

    return (
      <div className={utils.classNames("OrderBook", type)}>
        <LoadingStatus status="loading" />
      </div>
    )
  } else if (status) {
    setStatus(false);
  }

  return (
    <div className={utils.classNames("OrderBook", type)}>
      <div className="OrderBook__header OrderBook__order">
        <div className="OrderBook__order__row">{utils.getLang('global_price')}</div>
        <div className="OrderBook__order__row">{utils.getLang('global_amount')}</div>
        {!adaptive && <div className="OrderBook__order__row">{utils.getLang('global_total')}</div>}
      </div>
      <div className="OrderBook__cont__wrap">
        {!adaptive && <div className="OrderBook__cont indicator">
          <div className="OrderBook__side red_bg">
            {diff > 0 && asksPercent > bidsPercent && `${diff}%`}
            <div className="OrderBook__percent_indicator" style={{height: `${asksPercent}%`}} />
          </div>
          <div className="OrderBook__side green_bg">
            {diff > 0 && bidsPercent > asksPercent && `${diff}%`}
            <div className="OrderBook__percent_indicator" style={{height: `${bidsPercent}%`}} />
          </div>
        </div>}
        {type !== 'all' ? (
          <div className="OrderBook__cont">
            <div className="OrderBook__side">
              {makeRows((type === "bids" ? bids : asks), onOrderPress, whole, adaptive)}
            </div>
          </div>
        ) : (
          <div className="OrderBook__cont">
            <div className="OrderBook__side">
              {makeRows(asks.slice(-sideLimit), onOrderPress, whole, adaptive)}
            </div>
            {adaptive && <div className="OrderBook__price">
              <UI.NumberFormat number={ticker.price} type={ticker.price  > ticker.prevPrice ? 'up' : 'down'} indicator />
            </div>}
            <div className="OrderBook__side">
              {makeRows(bids.slice(0, sideLimit), onOrderPress, whole, adaptive)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function prepareOrders(orders) {
  // Group and Sort function
  let result = [];
  Object.values(orders).reduce((res, value) => {
    if (!res[value.price]) {
      res[value.price] = { ...value, amount: 0, filled: 0 };
      result.push(res[value.price])
    }
    res[value.price].amount += value.amount;
    res[value.price].filled += value.filled;
    return res;
  }, {});

  return result.sort((a, b) => a.price > b.price ? -1 : 1);
}

function makeRows(items, onOrderPress, whole, adaptive,) {
  return items.map((order) => {
    const className = utils.classNames({
      OrderBook__order: true,
      [order.action]: true,
    });

    const total = order.amount * order.price;
    const filled = total / whole * 100;

    return (
      <div title={`Filled: ${Math.floor(order.filled / order.amount * 100)}%`} key={order.id} className={className} onClick={() => onOrderPress(order)}>
        <div className="OrderBook__order__row"><UI.NumberFormat number={order.price} currency={order.secondary_coin} hiddenCurrency /></div>
        <div className="OrderBook__order__row"><UI.NumberFormat number={order.amount - order.filled} currency={order.primary_coin} hiddenCurrency /></div>
        {!adaptive && <div className="OrderBook__order__row"><UI.NumberFormat number={order.price * order.amount} currency={order.secondary_coin} hiddenCurrency /></div>}
        <div className="OrderBook__order__filled" style={{
          width: `${filled}%`
        }}/>
      </div>
    )
  });
}
