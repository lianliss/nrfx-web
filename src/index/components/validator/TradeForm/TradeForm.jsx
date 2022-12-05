import React from 'react';

// Components
import { Form } from 'ui';
import MoreInformation from './components/MoreInformation/MoreInformation';
import SecurityOptions from './components/SecurityOptions/SecurityOptions';
import TradeType from './components/TradeType/TradeType';

// Styles
import './TradeForm.less';

function TradeForm() {
  return (
    <Form className="ValidatorTradeForm">
      <TradeType />
      <MoreInformation />
      <SecurityOptions />
    </Form>
  );
}

export default TradeForm;
