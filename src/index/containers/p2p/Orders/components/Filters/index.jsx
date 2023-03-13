import React from 'react';

// Components
import { Row } from 'ui';
import SwitchTheMode from '../SwitchTheMode';

// Styles
import './index.less';

function Filters({ mode }) {
  return (
    <div className="orders-list-filters">
      <Row>
        <div className="orders-list-filters-column">
          <div className="orders-list-filters-column__title">
            Function selection
          </div>
          <div className="orders-list-filters-column__content">
            <SwitchTheMode mode={mode} />
          </div>
        </div>
      </Row>
    </div>
  );
}

export default Filters;
