import React from 'react';

// Components
import { Form, Radio, RadioGroup } from 'ui';

// Utils

// Styles
import './TradeForm.less';

function TradeForm() {
  const [tradeType, setTradeType] = React.useState('sell');

  return (
    <Form className="ValidatorTradeForm">
      <h2>Trade type</h2>
      <div>
        <RadioGroup selected={tradeType} onChange={setTradeType}>
          <Radio size="small" type="light-blue" value="sell">
            Sell bitcoins online
          </Radio>
          <Radio size="small" type="light-blue" value="buy">
            Buy bitcoins online
          </Radio>
        </RadioGroup>
      </div>
    </Form>
  );
}

export default TradeForm;
