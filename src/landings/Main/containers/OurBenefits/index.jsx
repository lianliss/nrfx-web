import React from 'react';

// Components
import { Container } from 'ui';
import BenefitCards from '../../components/BenefitCards';

// Styles
import './index.less';

function OurBenefits({ adaptive }) {
  return (
    <Container
      maxWidth={1356}
      padding={adaptive ? 15 : 22}
      className="MainLanding-our-benefits__wrapper"
    >
      <div className="MainLanding-our-benefits">
        <h2>Our Benefits</h2>
        <BenefitCards />
      </div>
    </Container>
  );
}

export default OurBenefits;
