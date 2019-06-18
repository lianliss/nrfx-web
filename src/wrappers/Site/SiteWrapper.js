import './SiteWrapper.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import Header from '../../components/site/Header/Header';
import Footer from '../../components/site/Footer/Footer';


function SiteWrapper({ isHomepage, className, children }) {
  return (
    <div className={className}>
      <div className="SiteWrapper">

        {isHomepage
          ? (
            <div className="SiteWrapper__home__bg">
              <SVG src={require('../../asset/site/head_bg.svg')} />
            </div>
          )
          : (
            <div className="SiteWrapper__bg">
              <div className="SiteWrapper__bg__img">
                <SVG src={require('../../asset/site/banner_bg.svg')} />
              </div>
            </div>
          )
        }

        <Header />

        <div className="SiteWrapper__content">
          {children}
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default React.memo(SiteWrapper);