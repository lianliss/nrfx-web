import React from 'react';
import defaultAnswer from '../../constants/defaultAnswer';

// Component
import Column from '../Column/Column';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import { Row } from 'ui';
import CheckBox from '../../../../../../ui/components/CheckBox/CheckBox';

function SecurityOptions() {
  return (
    <>
      <h2>Security options</h2>
      <Row className="security-options">
        <Column>
          <ColumnTitle
            title="Identified people only"
            description={defaultAnswer}
          />
          <CheckBox type="simple">Select</CheckBox>
        </Column>
        <Column>
          <ColumnTitle
            title="SMS verification required"
            description={defaultAnswer}
          />
          <CheckBox type="simple">Select</CheckBox>
        </Column>
        <Column alignItems="flex-start">
          <ColumnTitle title="Trusted people only" />
          <CheckBox type="simple">Select</CheckBox>
        </Column>
      </Row>
    </>
  );
}

export default SecurityOptions;
