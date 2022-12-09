import React from 'react';
import { useSelector } from 'react-redux';
import { adaptiveSelector } from '../../selectors';

// Components
import Promo from './containers/Promo';
import Exchanger from './containers/Exchanger';
import OtherProducts from './containers/OtherProducts';
import OurBenefits from './containers/OurBenefits';

// Styles
import './index.less';

function Main() {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <div className="MainLanding">
      <Promo adaptive={adaptive} />
      <Exchanger adaptive={adaptive} />
      <OtherProducts adaptive={adaptive} />
      <OurBenefits adaptive={adaptive} />
    </div>
  );
}

export default Main;
