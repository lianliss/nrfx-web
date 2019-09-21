// styles
import './SiteWrapper.less';
// external
import React from 'react';
import SVG from 'react-inlinesvg';
// internal
import Header from '../../components/site/Header/Header';
import Footer from '../../components/site/Footer/Footer';

function SiteWrapper({ isHomepage, withOrangeBg, className, children }) {
  return (
    <div className={className}>
      <div className="SiteWrapper">

        {isHomepage
          ? (
            <div className="SiteWrapper__home__bg">
              <SVG src={require('../../asset/site/head_bg.svg')} />
            </div>
          )
          : withOrangeBg
            ? (
              <div className="SiteWrapper__orange__bg">
                <img src={require('../../asset/site/header_bg.svg')} alt="Bitcoinbot orange background" />
              </div>
            ) : (
              <div className="SiteWrapper__bg">
                <div className="SiteWrapper__bg__img">
                  <SVG src={require('../../asset/site/banner_bg.svg')} />
                </div>
              </div>
            )
        }

        <Header showLightLogo={withOrangeBg} />

        {children}

      </div>
      <Footer />
    </div>
  )
}

export default React.memo(SiteWrapper);