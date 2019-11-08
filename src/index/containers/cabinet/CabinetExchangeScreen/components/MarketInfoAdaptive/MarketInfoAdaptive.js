import './MarketInfoAdaptive.less';

import React from 'react';

import * as utils from '../../../../../utils';
import * as actions from '../../../../../actions/';

export default ({ market, price, percent, diff }) => {

  if (!market) {
    return null;
  }

  const [primary, secondary] = market.split('/').map(actions.getCurrencyInfo);

  const __handleChangeMarket = () => {
    actions.openModal('choose_market');
  }

  const valueClassName = utils.classNames("MarketInfoAdaptive__value", {
    [percent >= 0 ? 'up' : 'down']: true
  })

  return (
    <div className="MarketInfoAdaptive">
      <div className="MarketInfoAdaptive__icons" onClick={__handleChangeMarket}>
        <div style={{backgroundImage: `url(${primary.icon})`}} className="MarketInfoAdaptive__icons__icon" />
        <div style={{backgroundImage: `url(${secondary.icon})`}} className="MarketInfoAdaptive__icons__icon" />
      </div>
      <div className="MarketInfoAdaptive__info">
        <div className="MarketInfoAdaptive__row">
          <div className="MarketInfoAdaptive__pair" onClick={__handleChangeMarket}>
            <div className="MarketInfoAdaptive__pair__primary">{primary.abbr.toUpperCase()}</div>
            <div className="MarketInfoAdaptive__pair__secondary">{secondary.abbr.toUpperCase()}</div>
          </div>
          <div className="MarketInfoAdaptive__day_percent">
            <span className={valueClassName}>{utils.formatDouble(percent, 2)}%</span>
          </div>
        </div>
        <div className="MarketInfoAdaptive__row">
          <div className="MarketInfoAdaptive__price">
            <span className={valueClassName}>{utils.formatDouble(price)}</span>
          </div>
          <div className="MarketInfoAdaptive__day_price">${utils.formatDouble(diff, 2)}</div>
        </div>
      </div>
    </div>
  );
}