import './OrderBook.less';

import React from 'react';

import * as utils from '../../../../../utils';

export default function OrderBook({ asks, bids, onOrderPress }) {

  asks.sort((a, b) => a.price - b.price);
  bids.sort((a, b) => b.price - a.price);


  const sumAsks = asks.reduce((total, order) => total + order.amount, 0);
  const sumBids = bids.reduce((total, order) => total + order.amount, 0);

  let total = sumAsks + sumBids;
  let asksPercent = sumAsks / total * 100;
  let bidsPercent = sumBids / total * 100;
  let diff = Math.round(Math.abs(asksPercent - bidsPercent));

  return (
    <div className="OrderBook__cont__wrap">
      <div className="OrderBook__cont indicator">
        <div className="OrderBook__side red_bg">
          {asksPercent > bidsPercent && `${diff}%`}
          <div className="OrderBook__percent_indicator" style={{height: `${asksPercent}%`}} />
        </div>
        <div className="OrderBook__side green_bg">
          {bidsPercent > asksPercent && `${diff}%`}
          <div className="OrderBook__percent_indicator" style={{height: `${bidsPercent}%`}} />
        </div>
      </div>
      <div className="OrderBook__cont">
        <div className="OrderBook__side">
          {makeRows(asks, onOrderPress)}
        </div>
        <div className="OrderBook__side">
          {makeRows(bids, onOrderPress)}
        </div>
      </div>
    </div>
  )
}

function makeRows(items, onOrderPress) {
  return items.slice(0, 11).map((order) => {
    const className = utils.classNames({
      OrderBook__order: true,
      [order.action]: true,
    });
    return (
      <div key={order.id} className={className} onClick={() => onOrderPress(order)}>
        <div className="OrderBook__order__row">{utils.formatDouble(order.price, order.secondary_coin === 'usdt' ? 2 : void 0)}</div>
        <div className="OrderBook__order__row">{utils.formatDouble(order.amount)}</div>
        <div className="OrderBook__order__row">{utils.formatDouble(order.price * order.amount, order.secondary_coin === 'usdt' ? 2 : void 0)}</div>
        <div className="OrderBook__order__filled" style={{
          width: `${(order.filled / order.amount) * 100}%`
        }}/>
      </div>
    )
  });
}
