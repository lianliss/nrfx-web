import './NumberFormat.less';

import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils';

import * as utils from '../../utils/index';

const FormatNumber = ({ number, fractionDigits, skipTitle, currency, type, percent, indicator, brackets }) => {
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

  return (
    <span className={classNames("Number", {
      [type]: type
    })} title={!skipTitle && number}>{displayNumber}</span>
  );
}

FormatNumber.defaultProps = {
  fractionDigits: null,
  percent: false,
  indicator: false,
  brackets: false,
  currency: '',
  type: '',
}

FormatNumber.propTypes = {
  fractionDigits: PropTypes.number,
  skipTitle: PropTypes.bool,
  percent: PropTypes.bool,
  indicator: PropTypes.bool,
  brackets: PropTypes.bool,
  type: PropTypes.oneOf(['sell', 'buy', 'down', 'up']),
  currency: PropTypes.string
};

export default React.memo(FormatNumber);