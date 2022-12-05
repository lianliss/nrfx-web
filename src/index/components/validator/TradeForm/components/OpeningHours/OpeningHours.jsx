import React from 'react';

// Components
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import { Row } from 'ui';

// Utils
import defaultAnswer from '../../constants/defaultAnswer';
import Hours from '../Hours/Hours';
import Column from '../Column/Column';

function OpeningHours() {
  return (
    <div className="ValidatorTradeForm-opening-hours more-information__item">
      <ColumnTitle title="Opening hours" description={defaultAnswer} />
      <Row className="ValidatorTradeForm-row">
        <Hours day="Sun" />
        <Hours day="Mon" />
        <Hours day="Tue" />
        <Hours day="Wed" />
      </Row>
      <Row className="ValidatorTradeForm-row">
        <Hours day="Thu" />
        <Hours day="Fri" />
        <Hours day="Sat" />
        <Column />
      </Row>
    </div>
  );
}

export default OpeningHours;
