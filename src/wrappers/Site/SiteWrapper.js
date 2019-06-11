import React from 'react';
import './SiteWrapper.less';
import Header from '../../components/site/Header/Header';
import Footer from '../../components/site/Footer/Footer';
import SVG from 'react-inlinesvg';

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

        <div style={{padding: '0 100px'}}>
          {children}
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default React.memo(SiteWrapper);