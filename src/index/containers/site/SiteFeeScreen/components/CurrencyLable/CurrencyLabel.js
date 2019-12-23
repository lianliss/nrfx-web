import './CurrencyLabel.less'

import React from 'react';
import * as actions from '../../../../../../actions';

export default ({ abbr }) => {
  const currency = actions.getCurrencyInfo(abbr);
  return (
    <div className="CurrencyLabel" title={currency.name}>
      <div
        className="CurrencyLabel__icon"
        style={{ backgroundImage: `url(${currency.icon})`}}
      />
      <div className="CurrencyLabel__abbr" style={{color: currency.color}}>{currency.abbr}</div>
    </div>
  )
};
