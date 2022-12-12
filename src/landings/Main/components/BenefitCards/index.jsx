import React from 'react';

// Components
import { Col, Row } from 'ui';
import BenefitCard from '../BenefitCard';

// Utils
import { getLang } from 'utils';

// Styles
import './index.less';

function BenefitCards() {
  return (
    <Col
      className="MainLanding-BenefitCards"
      alignItems="stretch"
      justifyContent="stretch"
    >
      <Row
        alignItems="stretch"
        justifyContent="stretch"
        className="MainLanding-BenefitCards__row"
      >
        <BenefitCard
          title="Trustless & Based on smart contracts"
          size="medium"
          background="blue"
        />
        <BenefitCard title="users" size="small" />
        <BenefitCard
          title={getLang('main_landing_benefits_ecosystem')}
          size="medium"
        />
      </Row>
      <Row
        alignItems="stretch"
        justifyContent="stretch"
        className="MainLanding-BenefitCards__row"
      >
        <BenefitCard title="exchange transactions every day" size="large" />
        <BenefitCard
          title="50+ fiat currencies"
          size="small"
          background="orange"
        />
        <BenefitCard title="Community driven (DAO)" size="small" />
      </Row>
    </Col>
  );
}

export default BenefitCards;
