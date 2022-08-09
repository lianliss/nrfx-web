import React from 'react';

// Components
import { Row, Col, NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetScrollBlock from 'src/index/components/dapp/CabinetScrollBlock/CabinetScrollBlock';

// Styles
import './ChooseBank.less';

const banks = [
  {
    name: 'Tinkoff bank',
    icon: require('src/asset/banks/tinkoff.svg').default,
  },
  {
    name: 'Tinkoff bank',
    icon: require('src/asset/banks/tinkoff.svg').default,
  },
  {
    name: 'Tinkoff bank',
    icon: require('src/asset/banks/tinkoff.svg').default,
  },
  {
    name: 'Tinkoff bank',
    icon: require('src/asset/banks/tinkoff.svg').default,
  },
  {
    name: 'Tinkoff bank',
    icon: require('src/asset/banks/tinkoff.svg').default,
  },
  {
    name: 'Tinkoff bank',
    icon: require('src/asset/banks/tinkoff.svg').default,
  },
  {
    name: 'Tinkoff bank',
    icon: require('src/asset/banks/tinkoff.svg').default,
  },
];

function ChooseBank() {
  const BanksWrapper = banks.length > 5 ? CabinetScrollBlock : Col;

  return (
    <Col className="DepositModal__ChooseBank">
      <h3 className="default dark medium">Choose a bank</h3>
      <BanksWrapper className="DepositModal__ChooseBank-items">
        {banks.map((bank, key) => {
          return (
            <Row
              className="DepositModal__ChooseBank-item"
              alignItems="center"
              key={key}
            >
              <span className="secondary medium default">{bank.name}</span>
              <Row alignItems="center">
                <img src={bank.icon} alt={bank.name} />
                <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
              </Row>
            </Row>
          );
        })}
      </BanksWrapper>
      <Row className="buttons" justifyContent="flex-end">
        <Button type="secondary-alice" shadow>
          Back
        </Button>
      </Row>
    </Col>
  );
}

export default ChooseBank;
