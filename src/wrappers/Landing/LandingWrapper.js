import React, { useEffect } from 'react';
import './LandingWrapper.less';
import Ticker from '../../landing/components/Ticker/Ticker';
import Header from './components/Header/Header';
import TokenHeader from './components/TokenHeader/TokenHeader';
import Footer from './components/Footer/Footer';
import Notice from './components/Notice/Notice';
import TagManager from 'react-gtm-module';
import ReactPixel from 'react-facebook-pixel';
import {
  TOKEN,
  NARFEX_DAO,
  FARMING_INSTRUCTION,
} from '../../index/constants/pages';

import { useRoute } from 'react-router5';

export default (props) => {
  const route = useRoute();
  TagManager.initialize({
    gtmId: 'GTM-NSSCKZG',
  });
  ReactPixel.init('503624104685148');
  ReactPixel.pageView();

  useEffect(() => {
    window.scroll(0, 0);
  }, [route.route.name]);

  let isNrfx = false;

  switch (route.route.name) {
    case TOKEN:
    case NARFEX_DAO:
    case FARMING_INSTRUCTION:
      isNrfx = true;
      break;
    default:
      isNrfx = false;
  }

  return (
    <div className="LandingWrapper">
      {isNrfx ? (
        <TokenHeader />
      ) : (
        <>
          <div className="LandingWrapper__block">
            <Ticker />
          </div>
          <Header />
        </>
      )}
      <div className="LandingWrapper__main">{props.children}</div>
      <Footer logoType={isNrfx ? 'NRFX' : 'default'} />
      <Notice />
    </div>
  );
};
