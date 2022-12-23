import React from 'react';

// Components
import { Container } from 'ui';
import BenefitCards from '../../components/BenefitCards';

// Utils
import { getLang } from 'utils';

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
        <h2>{getLang('main_landing_our_benefits_title')}</h2>
        <BenefitCards adaptive={adaptive} />
      </div>
    </Container>
  );
}

export default OurBenefits;
