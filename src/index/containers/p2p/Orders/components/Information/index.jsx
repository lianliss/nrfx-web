import React from 'react';

// Components
import { Row } from 'ui';
import { CabinetBlock } from 'dapp';
import avatar from 'src/asset/illustrations/people/p2p_working_instruction_avatar.svg';
import SwitchTheMode from '../SwitchTheMode';

// Styles
import './index.less';

function Information({ mode }) {
  const Card = () => (
    <div className="orders-information-card">
      <img src={avatar} />
      <h5>Place an Order</h5>
      <p>
        Once you place a P2P order, the crypto asset will be escrowed by Narfex
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
        <SwitchTheMode mode={mode} />
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

export default Information;
