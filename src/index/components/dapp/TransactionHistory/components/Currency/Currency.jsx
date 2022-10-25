import React from 'react';
import PropTypes from 'prop-types';

// Components
import WalletIcon from '../../../WalletIcon/WalletIcon';
import { NumberFormat, Row } from 'ui';
import DoubleWallets from '../../../DoubleWallets/DoubleWallets';
import SVG from 'utils/svg-wrap';

function Currency({
  type,
  source_currency,
  target_currency,
  source_amount,
  target_amount,
}) {
  if (type === 'exchange') {
    return (
      <Row alignItems="center">
        <DoubleWallets
          first={source_currency}
          second={target_currency}
          size={24}
          disableSymbols
        />
        &nbsp;
        <NumberFormat
          number={source_amount}
          currency={source_currency.symbol}
        />
        &nbsp;
        <SVG src={require('src/asset/icons/arrows/to-arrow.svg')} />
        &nbsp;
        <NumberFormat
          number={target_amount}
          currency={target_currency.symbol}
        />
      </Row>
    );
  }

  return (
    <Row alignItems="center">
      <WalletIcon currency={target_currency} size={24} />
      &nbsp;
      <NumberFormat number={target_amount} currency={target_currency.symbol} />
    </Row>
  );
}

Currency.propTypes = {
  type: PropTypes.string,
  source_currency: PropTypes.object,
  target_currency: PropTypes.object,
  source_amount: PropTypes.number,
  target_amount: PropTypes.number,
};

Currency.defaultProps = {
  type: '',
  source_currency: {},
  target_currency: {},
  source_amount: 0,
  target_amount: 0,
};

export default Currency;
