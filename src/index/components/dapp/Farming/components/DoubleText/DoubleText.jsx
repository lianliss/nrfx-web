import React from 'react';

// Components
import { NumberFormat } from 'src/ui';

// Styles
import './DoubleText.less';

function DoubleText({ title, currency, first, second, firstDecimals = 2, secondDecimals = 0 }) {
  return (
    <div className="DoubleText">
      <span>
        {title} {currency.toUpperCase()}
      </span>
      <p>
        <span>
          <NumberFormat number={first} fractionDigits={firstDecimals} currency={currency} />
        </span>
        &nbsp;/&nbsp;
        <span>
          $<NumberFormat number={second} fractionDigits={secondDecimals} />
        </span>
      </p>
    </div>
  );
}

export default DoubleText;
