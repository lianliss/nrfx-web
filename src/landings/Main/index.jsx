import React from 'react';
import { useSelector } from 'react-redux';
import { adaptiveSelector } from '../../selectors';

// Components
import Promo from './containers/Promo';
import Exchanger from './containers/Exchanger';
import OtherProducts from './containers/OtherProducts';
import OurBenefits from './containers/OurBenefits';
import JoinUs from './containers/JoinUs';
import Roadmap from './containers/Roadmap';
import OurPartner from './containers/OurPartner';

// Styles
import './index.less';

function Main() {
  const adaptive = useSelector(adaptiveSelector);
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="MainLanding">
      <Promo
        adaptive={adaptive}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
      />
      {isLoaded && (
        <>
          <Exchanger adaptive={adaptive} />
          <OtherProducts adaptive={adaptive} />
          <OurBenefits adaptive={adaptive} />
          <JoinUs adaptive={adaptive} />
          <Roadmap adaptive={adaptive} />
        </>
      )}
    </div>
  );
}

export default Main;
