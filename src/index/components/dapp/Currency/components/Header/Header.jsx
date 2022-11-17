import React from 'react';

// Components
import { NumberFormat } from 'ui';
import CustomButton, {
  buttonTypes,
} from '../../../ui/CustomButton/CustomButton';

function Header({
  currencyBalance,
  rate,
  symbol,
  onAmountRateClick,
  amountRateDisabled,
}) {
  return (
    <div className="Currency__preview__container">
      <span className="Currency__rate">
        <NumberFormat number={currencyBalance} currency={symbol} />
      </span>
      <CustomButton
        className="Currency__currency_amount_rate"
        type={buttonTypes.link}
        disabled={amountRateDisabled}
        onClick={onAmountRateClick}
      >
        $&nbsp;
        <NumberFormat number={currencyBalance * rate} currency={'usd'} />
      </CustomButton>
    </div>
  );
}

export default React.memo(Header);
