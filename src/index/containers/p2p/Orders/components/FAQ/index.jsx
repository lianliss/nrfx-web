import React from 'react';

// Components
import { FAQ as DappFAQ, CabinetBlock } from 'dapp';
import { SwitchTabs, Row } from 'ui';

// Utils
import faq from '../../../constants/faq';

// Styles
import './index.less';

const userTypes = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'advertisers', label: 'Advertisers' },
];

function FAQ({ adaptive }) {
  const [userType, setUserType] = React.useState('beginner');

  return (
    <CabinetBlock className="orders-faq">
      <Row
        className="orders-faq__title"
        justifyContent="space-between"
        alignItems="center"
      >
        <h3>FAQ</h3>
        <SwitchTabs
          selected={userType}
          tabs={userTypes}
          onChange={(value) => setUserType(value)}
          type="light-blue"
        />
      </Row>
      <DappFAQ items={faq.orders[userType]} adaptive={adaptive} />
    </CabinetBlock>
  );
}

export default FAQ;
