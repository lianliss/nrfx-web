import React from 'react';

// Components
import { Row, Col, NumberFormat, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CopyText from '../../../../../../../../../ui/components/CopyText/CopyText';
import InfoWrapper from '../InfoWrapper/InfoWrapper';

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
      <div className="DepositModal__ChoosedBank__items">
        <InfoWrapper type="secondary"></InfoWrapper>
      </div>
      <div className="DepositModal__ChoosedBank__items">
        <InfoWrapper>
          <p className="dark default hight-height extra-small">
            An account is reserved for you until 27 July 2022, 9:45
          </p>
          <p className="blue default small">01:59:53</p>
        </InfoWrapper>
        <InfoWrapper>
          <p className="dark default hight-height extra-small">
            Amount to top up
          </p>
          <p className="blue default small">5 000 RUB</p>
        </InfoWrapper>
      </div>
      <div className="DepositModal__ChoosedBank__items">
        <InfoWrapper size="large">
          <p className="dark default hight-height extra-small extra-large-height">
            Recharge card number
          </p>
          <CopyText text="4377 7237 4627 4764">
            <span className="blue default small extra-large-height">
              4377 7237 4627 4764
            </span>
            <span>
              <SVG src={require('src/asset/icons/action/copy.svg')} />
            </span>
          </CopyText>
          <p className="dark default hight-height extra-small extra-large-height">
            Name
          </p>
          <p className="blue default small extra-large-height">
            Evgeny Igorevich G.
          </p>
        </InfoWrapper>
      </div>
      <Row className="buttons" justifyContent="flex-end">
        <Button type="secondary-alice" shadow>
          Cancel
        </Button>
        <Button type="lightBlue">Confirm payment</Button>
      </Row>
    </Col>
  );
}

export default ChoosedBank;
