import React from 'react';

// Components
import { Row } from 'ui';
import SVG from 'utils/svg-wrap';

function TransactionLink() {
  return (
    <Row alignItems="center">
      Link
      <div className="TransactionHistory__icon-export">
        <SVG src={require('src/asset/icons/action/export-light-bg.svg')} />
      </div>
    </Row>
  );
}

export default TransactionLink;
