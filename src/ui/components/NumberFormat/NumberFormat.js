import './NumberFormat.less';

import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils';

const FormatNumber = ({ number, fractionDigits, skipTitle, currency, type, percent, indicator }) => {

  let displayNumber = parseFloat(parseFloat(number).toFixed(fractionDigits));

  if (currency && !percent ) {
    if (['$', 'usd', 'usdt'].includes(currency.toLowerCase())) {
      displayNumber = '$ ' + displayNumber;
    } else {
      displayNumber += ' ' + currency.toUpperCase(); // nbsp
    }
  }

  if (indicator && type) {
    displayNumber += (' ' + (type === 'up' ? '↑' : '↓'));
  }

  return (
    <span className={classNames("Number", {
      [type]: type
    })} title={!skipTitle && number}>{displayNumber}</span>
  );
}

FormatNumber.defaultProps = {
  fractionDigits: 8,
  percent: false,
  indicator: false,
  currency: '',
  type: '',
}

FormatNumber.propTypes = {
  fractionDigits: PropTypes.number,
  skipTitle: PropTypes.bool,
  percent: PropTypes.bool,
  indicator: PropTypes.bool,
  type: PropTypes.oneOf(['sell', 'buy', 'down', 'up']),
  currency: PropTypes.string
};

export default React.memo(FormatNumber);