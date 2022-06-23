import React from 'react';

// Components
import { Row, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './ReferralList.less';

function ReferralList() {
  return (
    <div className="Referral__ReferralList">
      <Row alignItems="flex-end" justifyContent="space-between">
        <Col>
          <h2>Referral List</h2>
          <p className="subtitle">All your referral friends in one place</p>
        </Col>
      </Row>
    </div>
  );
}

export default ReferralList;
