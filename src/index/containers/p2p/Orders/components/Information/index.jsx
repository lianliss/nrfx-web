import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, SwitchTabs } from 'ui';
import { CabinetBlock } from 'dapp';
import avatar from 'src/asset/illustrations/people/p2p_working_instruction_avatar.svg';

// Utils
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './index.less';

function Information({ mode, onModeChange }) {
  const switchTabs = [
    { value: p2pMode.buy, label: 'Buy Crypto' },
    { value: p2pMode.sell, label: 'Sell Crypto' },
  ];

  const Card = () => (
    <div className="orders-information-card">
      <img src={avatar} />
      <h5>Place an Order</h5>
      <p>
        Once you place a P2P order, the crypto asset will be escrowed by Binance
        P2P.
      </p>
    </div>
  );

  return (
    <CabinetBlock className="orders-information">
      <Row
        className="orders-information__title"
        justifyContent="space-between"
        alignItems="center"
        wrap
      >
        <h3>How P2P works</h3>
        <SwitchTabs
          selected={mode}
          tabs={switchTabs}
          onChange={(mode) => onModeChange(mode)}
          type="light-blue"
        />
      </Row>
      <Row
        className="orders-information__cards"
        justifyContent="space-between"
        alignItems="center"
        wrap
      >
        <Card />
        <Card />
        <Card />
      </Row>
    </CabinetBlock>
  );
}

Information.propTypes = {
  mode: PropTypes.oneOf(p2pMode),
  onModeChange: PropTypes.func,
};

Information.defaultProps = {
  mode: p2pMode.buy,
  onModeChange: () => {},
};

export default Information;
