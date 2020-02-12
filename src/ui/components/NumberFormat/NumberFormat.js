import './NumberFormat.less';

import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils';

import { isFiat, noExponents } from '../../utils/index';

const NumberFormat = ({ number, fractionDigits, color, skipTitle, accurate, currency, hiddenCurrency, type, percent, indicator, brackets, onClick }) => {

  if (isNaN(number)) return null;

  if (!fractionDigits) {
    if (percent) {
      fractionDigits = 2;
    } else {
      fractionDigits = (isFiat(currency) || currency.toLowerCase() === 'usdt' ) ? 2 : 8;
    }
    // TODO: Вынести количество символов после точки в объект валют
  }


  const coefficient = parseInt(1 + '0'.repeat(fractionDigits));
  let displayNumber = Math.floor((number * coefficient)) / coefficient;

  displayNumber = displayNumber.toLocaleString(undefined, {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: (accurate ? fractionDigits : undefined)
  });

  if (currency && !percent ) {
    displayNumber += ' ' + ( !hiddenCurrency ? currency.toUpperCase() : ''); // nbsp
  }

  if (type === 'auto') {
    type = number > 0 ? 'up' : 'down';
  }

  if (percent) {
    displayNumber = displayNumber + '%';
  }

  if (indicator && type) {
    displayNumber += (' ' + (type === 'up' ? '↑' : '↓'));
  }

  if (brackets) {
    displayNumber = `(${displayNumber})`;
  }

  if (number > 0 && number < 1e-8) {
    displayNumber = `~${displayNumber}`;
  }

  if (color) {
    type = number >= 0 ? 'up' : 'down';
  }

  return (
    <span onClick={onClick} className={classNames("Number", {
      [type]: type
    })} title={!skipTitle && noExponents(number)}>{displayNumber}</span>
  );
};

NumberFormat.defaultProps = {
  fractionDigits: null,
  percent: false,
  indicator: false,
  brackets: false,
  color: false,
  currency: '',
  type: null,
  hiddenCurrency: false,
}

NumberFormat.propTypes = {
  number: PropTypes.number,
  fractionDigits: PropTypes.number,
  skipTitle: PropTypes.bool,
  color: PropTypes.bool,
  percent: PropTypes.bool,
  indicator: PropTypes.bool,
  brackets: PropTypes.bool,
  accurate: PropTypes.bool,
  hiddenCurrency: PropTypes.bool,
  type: PropTypes.oneOf([null, 'sell', 'buy', 'down', 'up']),
  currency: PropTypes.string
};

export default React.memo(NumberFormat);
