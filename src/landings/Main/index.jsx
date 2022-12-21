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
import ShowIn from './components/ShowIn';

// Utils
import useIsInViewport from '../../hooks/useIsInViewport';

// Styles
import './index.less';

function Main() {
  const adaptive = useSelector(adaptiveSelector);
  const exchangerRef = React.useRef(null);
  const exchangerViewport = useIsInViewport(exchangerRef);
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
          <ShowIn
            animation="swipeHorizontal"
            viewport={exchangerViewport}
            className="MainLanding-exchanger__showIn"
          >
            <Exchanger
              adaptive={adaptive}
              ref={exchangerRef}
              visible={exchangerViewport.visible}
            />
          </ShowIn>
          <OtherProducts adaptive={adaptive} />
          <OurBenefits adaptive={adaptive} />
          <JoinUs adaptive={adaptive} />
          <Roadmap adaptive={adaptive} />
          <OurPartner adaptive={adaptive} />
        </>
      )}
    </div>
  );
}

export default Main;
