import './MarketInfoAdaptive.less';

import React from 'react';

import * as actions from '../../../../../../actions/';
import * as UI from '../../../../../../ui';

export default ({ market, price, percent, diff }) => {

  if (!market) {
    return null;
  }

  const [primary, secondary] = market.split('/').map(actions.getCurrencyInfo);

  const __handleChangeMarket = () => {
    actions.openModal('choose_market');
  }


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
            <UI.NumberFormat number={percent} percent type={percent >= 0 ? 'up' : 'down'} />
          </div>
        </div>
        <div className="MarketInfoAdaptive__row">
          <div className="MarketInfoAdaptive__price">
          	<UI.NumberFormat number={price} percent type={percent >= 0 ? 'up' : 'down'} />
          </div>
          <div className="MarketInfoAdaptive__day_price">$<UI.NumberFormat number={diff} currency={'usd'} hiddenCurrency /></div>
        </div>
      </div>
    </div>
  );
}
