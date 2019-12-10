import './NumberFormat.less';

import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils';

import * as utils from '../../utils/index';

const NumberFormat = ({ number, fractionDigits, color, skipTitle, currency, type, percent, indicator, brackets }) => {
  if (!fractionDigits) {
    fractionDigits = utils.isFiat(currency) ? 2 : 8;
  }

  let displayNumber = parseFloat(parseFloat(number).toFixed(fractionDigits));

  if (currency && !percent ) {
    displayNumber += ' ' + currency.toUpperCase(); // nbsp
  }


  if (type === 'auto') {
    type = number > 0 ? 'up' : 'down';
  }

  if (indicator && type) {
    displayNumber += (' ' + (type === 'up' ? '↑' : '↓'));
  }

  if (percent) {
    displayNumber = displayNumber + '%';
  }

  if (brackets) {
    displayNumber = `(${displayNumber})`;
  }

  if (color) {
    type = number >= 0 ? 'up' : 'down';
  }

  return (
    <span className={classNames("Number", {
      [type]: type
    })} title={!skipTitle && number}>{displayNumber}</span>
  );
}

NumberFormat.defaultProps = {
  fractionDigits: null,
  percent: false,
  indicator: false,
  brackets: false,
  color: false,
  currency: '',
  type: '',
}

NumberFormat.propTypes = {
  number: PropTypes.number,
  fractionDigits: PropTypes.number,
  skipTitle: PropTypes.bool,
  color: PropTypes.bool,
  percent: PropTypes.bool,
  indicator: PropTypes.bool,
  brackets: PropTypes.bool,
  type: PropTypes.oneOf(['sell', 'buy', 'down', 'up']),
  currency: PropTypes.string
};

export default React.memo(NumberFormat);
