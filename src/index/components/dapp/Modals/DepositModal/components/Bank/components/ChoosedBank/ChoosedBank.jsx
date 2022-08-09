import React from 'react';

// Components
import { Row, Col, NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './ChoosedBank.less';

const bank = {
  name: 'Tinkoff bank',
  icon: require('src/asset/banks/tinkoff.svg').default,
};

function ChoosedBank() {
  return (
    <Col className="DepositModal__ChoosedBank">
      <h3 className="default dark medium">Choose a bank</h3>
      <Row alignItems="center">
        <img src={bank.icon} alt={bank.name} className="bankIcon" />
        <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
      </Row>
    </Col>
  );
}

export default ChoosedBank;
