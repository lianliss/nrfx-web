import React from 'react';
import PropTypes from 'prop-types';

// Components
import WalletIcon from '../../../WalletIcon/WalletIcon';
import { NumberFormat, Row } from 'ui';
import DoubleWallets from '../../../DoubleWallets/DoubleWallets';
import SVG from 'utils/svg-wrap';

function Currency({
  type,
  source_token,
  target_token,
  source_amount,
  target_amount,
}) {
  if (type === 'exchange') {
    return (
      <Row alignItems="center">
        <DoubleWallets
          first={source_token}
          second={target_token}
          size={24}
          disableSymbols
        />
        <Row wrap>
          <NumberFormat number={source_amount} currency={source_token.symbol} />
          <span className="TransactionHistory__icon-arrow">
            <SVG src={require('src/asset/icons/arrows/to-arrow.svg')} />
          </span>
          <NumberFormat number={target_amount} currency={target_token.symbol} />
        </Row>
      </Row>
    );
  }

  return (
    <Row alignItems="center">
      <WalletIcon currency={target_token} size={24} />
      &nbsp;
      <NumberFormat number={target_amount} currency={target_token.symbol} />
    </Row>
  );
}

Currency.propTypes = {
  type: PropTypes.string,
  source_token: PropTypes.object,
  target_token: PropTypes.object,
  source_amount: PropTypes.number,
  target_amount: PropTypes.number,
};

Currency.defaultProps = {
  type: '',
  source_token: {},
  target_token: {},
  source_amount: 0,
  target_amount: 0,
};

export default Currency;
