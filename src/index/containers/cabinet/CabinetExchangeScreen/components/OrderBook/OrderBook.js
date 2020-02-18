import './OrderBook.less';

import React, { useState, useEffect, useRef } from 'react';
import * as actions from 'src/actions/cabinet/exchange';
import { connect } from 'react-redux';
import UI from 'src/ui/index';
import { getLang, ucfirst, classNames as cn } from 'src/utils/index';
import Block from '../Block/Block';
import SVG from 'react-inlinesvg';
import * as utils from '../../../../../../utils';
import LoadingStatus from '../../../../../components/cabinet/LoadingStatus/LoadingStatus';

const OrderBook = props => {

  const listLength = props.adaptive ? 6 : 14;

  const { status } = props;
  const [type, setType] = useState('all');
  const [,secondaryCurrency] = props.market.toUpperCase().split('/');

  const scrollBlock = useRef(null);

  useEffect(() => {
    const { current } = scrollBlock;
    setTimeout(() => {
      current.scroll(0, type === 'sell' ? current.clientHeight : 0);
    }, 1);
  }, [type]);

  const getSumOrders = (orders, type) => {
    return props.orders
      .filter(o => o.action === type)
      .reduce((total, order) => total + order.amount, 0);
  };

  const sum = {
    sell: getSumOrders(props.orders, 'sell'),
    buy: getSumOrders(props.orders, 'buy')
  };

  const total = sum.sell + sum.buy;

  const fillPercent = {
    sell: sum.sell / total * 100,
    buy: sum.buy / total * 100,
  };

  const maxTotal = Math.max(...props.orders.map(order => order.amount * order.price));
  const diff = Math.round(fillPercent.sell) - Math.round(fillPercent.buy);

  const renderList = (type, limit) => {

    const range = type === 'sell' ? [-limit] : [0, limit];

    const handleOrderClick = order => {
      const primaryFractionDigits = utils.isFiat(order.primary_coin) ? 2 : 8;
      const secondaryFractionDigits = utils.isFiat(order.secondary_coin) ? 2 : 8;

      props.selectOrder({
        action: order.action,
        price: utils.formatDouble(order.price, secondaryFractionDigits),
        amount: utils.formatDouble(order.amount, primaryFractionDigits),
        total: utils.formatDouble(order.price * order.amount, secondaryFractionDigits),
      });
    }

    return (
      <div className="OrderBook__list" ref={scrollBlock}>
        {props.orders.filter(o => o.action === type)
          .sort((a, b) => b.price - a.price)
          .slice(...range)
          .map(order => {
            const total = order.amount * order.price;
            const filled = total / maxTotal * 100;
            return (
              <div key={order.id} onClick={() => handleOrderClick(order)} className={cn("OrderBook__order", order.action)}>
                <div className="OrderBook__order__price">
                  <UI.NumberFormat accurate number={order.price} currency={order.secondary_coin} hiddenCurrency/>
                </div>
                <div className="OrderBook__order__amount">
                  <UI.NumberFormat accurate number={order.amount} currency={order.primary_coin} hiddenCurrency/>
                </div>
                <div className="OrderBook__order__total">
                  <UI.NumberFormat accurate number={order.price * order.amount} currency={order.secondary_coin} hiddenCurrency/>
                </div>
                <div style={{width: filled + '%'}} className="OrderBook__order__fill"/>
              </div>
            )
          })
        }
      </div>
    )
  };

  const renderTicker = () => {
    const { ticker } = props;
    return (
      <div className="OrderBook__ticker">
        <div className="OrderBook__ticker__price">
          <UI.NumberFormat number={ticker.price} type={ticker.price > ticker.prevPrice ? 'up' : 'down'} currency={secondaryCurrency} indicator hiddenCurrency />
        </div>
        <div className="OrderBook__ticker__priceUsd">
          $<UI.NumberFormat number={ticker.usd_price} hiddenCurrency />
        </div>
        <div />
      </div>
    )
  }

  return (
    <Block
      className={cn("OrderBook", type, status)}
      title={getLang('exchange_orderBook')}
      skipCollapse
      controls={(
        <UI.SwitchButtons
          rounded
          className="OrderBook__controls"
          selected={type}
          onChange={setType}
          tabs={['all', 'buy', 'sell'].map(type => ({
            label: ucfirst(type),
            value: type,
            className: type,
            icon: <SVG src={require('src/asset/16px/list.svg')} />
          }))} />
      )}
    >
      { status === 'loading' && <LoadingStatus status="loading" /> }
      <div className="OrderBook__wrapper">
        <div className="OrderBook__title">
          <div className="OrderBook__title__price">{utils.getLang('global_price')}</div>
          <div className="OrderBook__title__amount">{utils.getLang('global_amount')}</div>
          <div className="OrderBook__title__total">{utils.getLang('global_total')}</div>
        </div>
        <div className="OrderBook__indicator">
          {['sell', 'buy'].map(sideType => (
            <div key={sideType} className={cn("OrderBook__indicator__side", sideType)}>
              {(sideType === 'sell' ? diff > 0 : diff < 0) && (
                <span>{ Math.abs(diff) + '%' }</span>
              )}
              <div style={{ height: fillPercent[sideType] + '%' }} className="OrderBook__indicator__side__fill"></div>
            </div>
          ))}
        </div>
        <div className="OrderBook__content">
          {type === 'all' ? <>
            {renderList('sell', listLength)}
            {renderTicker()}
            {renderList('buy', listLength)}
          </> : <>
            {type === 'buy' && renderTicker()}
            {renderList(type)}
            {type === 'sell' && renderTicker()}
          </>}
        </div>
      </div>
    </Block>
  )
}

export default connect(state => ({
  orders: state.exchange.orderBook,
  ticker: state.exchange.ticker,
  market: state.exchange.market,
  adaptive: state.default.adaptive,
  currentLang: state.default.currentLang,
  status: state.exchange.loadingStatus.orderBook,
}), {
  selectOrder: actions.orderBookSelectOrder,
})(OrderBook);
