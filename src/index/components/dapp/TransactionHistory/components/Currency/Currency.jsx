import React from 'react';
import PropTypes from 'prop-types';
import { Web3Context } from 'services/web3Provider';

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
  const context = React.useContext(Web3Context);
  const { network } = context;
  const { wrapToken, defaultToken } = network;
  
  if (type === 'exchange') {
    let token0 = source_token;
    let token1 = target_token;
    if (token0.symbol === wrapToken.symbol) {
      token0 = defaultToken;
    }
    if (token1.symbol === wrapToken.symbol) {
      token1 = defaultToken;
    }
    
    return (
      <Row alignItems="center">
        <DoubleWallets
          first={token0}
          second={token1}
          size={24}
          disableSymbols
        />
        <Row alignItems="center" wrap>
          <NumberFormat number={source_amount} currency={token0.symbol} />
          <span className="TransactionHistory__icon-arrow">
            <SVG src={require('src/asset/icons/arrows/to-arrow.svg')} />
          </span>
          <NumberFormat number={target_amount} currency={token1.symbol} />
        </Row>
      </Row>
    );
  }

  return (
    <Row alignItems="center">
      <WalletIcon currency={target_token} size={24} />
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
