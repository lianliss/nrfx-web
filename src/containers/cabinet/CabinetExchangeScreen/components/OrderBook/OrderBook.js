import './OrderBook.less';

import React from 'react';

import * as utils from '../../../../../utils';

export default function OrderBook({ asks, bids, onOrderPress }) {

  asks = Object.values(asks);
  bids = Object.values(bids);

  asks.sort((a, b) => a.price > b.price ? -1 : 1);
  bids.sort((a, b) => a.price > b.price ? -1 : 1);


  const sumAsks = asks.reduce((total, order) => total + order.amount, 0);
  const sumBids = bids.reduce((total, order) => total + order.amount, 0);

  let total = sumAsks + sumBids;
  let asksPercent = sumAsks / total * 100;
  let bidsPercent = sumBids / total * 100;
  let diff = Math.round(Math.abs(asksPercent - bidsPercent));

  return (
    <div className="OrderBook">
      <div className="OrderBook__header OrderBook__order">
        <div className="OrderBook__order__row">Price</div>
        <div className="OrderBook__order__row">Amount</div>
        <div className="OrderBook__order__row">Total</div>
      </div>
      <div className="OrderBook__cont__wrap">
        <div className="OrderBook__cont indicator">
          <div className="OrderBook__side red_bg">
            {diff > 0 && asksPercent > bidsPercent && `${diff}%`}
            <div className="OrderBook__percent_indicator" style={{height: `${asksPercent}%`}} />
          </div>
          <div className="OrderBook__side green_bg">
            {diff > 0 && bidsPercent > asksPercent && `${diff}%`}
            <div className="OrderBook__percent_indicator" style={{height: `${bidsPercent}%`}} />
          </div>
        </div>
        <div className="OrderBook__cont">
          <div className="OrderBook__side">
            {makeRows(asks.slice(-11), onOrderPress)}
          </div>
          <div className="OrderBook__side">
            {makeRows(bids.slice(0, 11), onOrderPress)}
          </div>
        </div>
      </div>
    </div>
  )
}

function makeRows(items, onOrderPress) {
  return items.map((order) => {
    const className = utils.classNames({
      OrderBook__order: true,
      [order.action]: true,
    });
    return (
      <div key={order.id} className={className} onClick={() => onOrderPress(order)}>
        <div className="OrderBook__order__row">{utils.formatDouble(order.price, order.secondary_coin === 'usdt' ? 2 : 6)}</div>
        <div className="OrderBook__order__row">{utils.formatDouble(order.amount)}</div>
        <div className="OrderBook__order__row">{utils.formatDouble(order.price * order.amount, order.secondary_coin === 'usdt' ? 2 : 6)}</div>
        <div className="OrderBook__order__filled" style={{
          width: `${(order.filled / order.amount) * 100}%`
        }}/>
      </div>
    )
  });
}
