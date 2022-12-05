import React from 'react';

// Components
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import { Row } from 'ui';

// Utils
import defaultAnswer from '../../constants/defaultAnswer';

function OpeningHours() {
  return (
    <div className="more-information__item">
      <ColumnTitle title="Opening hours" description={defaultAnswer} />
      <Row className="ValidatorTradeForm-row"></Row>
      <Row className="ValidatorTradeForm-row"></Row>
    </div>
  );
}

export default OpeningHours;
