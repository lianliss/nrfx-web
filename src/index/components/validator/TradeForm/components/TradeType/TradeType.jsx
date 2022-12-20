import React from 'react';

// Components
import { Col, Row, Radio, Input, RadioGroup } from 'ui';
import ColumnTitle from '../ColumnTitle/ColumnTitle';

// Utils
import defaultAnswer from '../../constants/defaultAnswer';
import Column from '../Column/Column';

function TradeType() {
  const [tradeType, setTradeType] = React.useState('sell');

  return (
    <>
      <h2>Trade type</h2>
      <Row className="ValidatorTradeForm-row trade-type">
        <Column>
          <ColumnTitle title="I want to..." description={defaultAnswer} />
          <RadioGroup selected={tradeType} onChange={setTradeType}>
            <Radio size="small" type="light-blue" value="sell">
              Sell bitcoins online
            </Radio>
            <Radio size="small" type="light-blue" value="buy">
              Buy bitcoins online
            </Radio>
          </RadioGroup>
        </Column>
        <Column>
          <ColumnTitle title="Location" description={defaultAnswer} />
          <Input placeholder="Enter a location" />
        </Column>
        <Column />
      </Row>
    </>
  );
}

export default TradeType;
