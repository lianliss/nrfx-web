import React from 'react';

// Components
import { NumberFormat } from 'src/ui';

// Styles
import './DoubleText.less';

function DoubleText({ title, currency, first, second }) {
  return (
    <div className="DoubleText">
      <span>
        {title} {currency.toUpperCase()}
      </span>
      <p>
        <span>
          <NumberFormat number={first} currency={currency} />
        </span>
        &nbsp;/&nbsp;
        <span>
          $<NumberFormat number={second} />
        </span>
      </p>
    </div>
  );
}

export default DoubleText;
