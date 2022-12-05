import React from 'react';

// Components
import { Form } from 'ui';
import MoreInformation from './components/MoreInformation/MoreInformation';
import TradeType from './components/TradeType/TradeType';

// Styles
import './TradeForm.less';

function TradeForm() {
  return (
    <Form className="ValidatorTradeForm">
      <TradeType />
      <MoreInformation />
    </Form>
  );
}

export default TradeForm;
