import React from 'react';

// Components
import { Container } from 'ui';
import BenefitCards from '../../components/BenefitCards';

// Styles
import './index.less';

function OurBenefits() {
  return (
    <Container maxWidth={1356} padding={22}>
      <div className="MainLanding-our-benefits">
        <h2>Our Benefits</h2>
        <BenefitCards />
      </div>
    </Container>
  );
}

export default OurBenefits;
