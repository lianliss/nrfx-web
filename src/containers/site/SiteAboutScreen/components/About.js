import React from 'react';
import SVG from 'react-inlinesvg';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import { data } from '../fixtures';
import * as utils from '../../../../utils/index';


function About() {
  console.log('utils :', utils);
  return (
    <>
      <div className="SiteAboutScreen__intro">
        <TitleWithBg title={utils.getLang('site__aboutShortTitle')} bgTitle="In Brief" centered />
        <p className="SiteAboutScreen__caption">{utils.nl2br(utils.getLang('site__aboutShortTitleText'))}</p>
      </div>

      <div className="SiteAboutScreen__career">
        <SVG src={require('../asset/about__career.svg')} />
        <h2 className="SiteAboutScreen__career__title">{utils.getLang('site__aboutWorkBitcoinbotTitle')}</h2>
        <p className="SiteAboutScreen__career__caption">{utils.nl2br(utils.getLang('site__aboutWorkBitcoinbotTitleText'))}</p>
        <a href="/#/contact" className="SiteAboutScreen__link">{utils.getLang('site_aboutContact')}</a>
      </div>


      <InfoSection firstInfo={data.misssionInfo} secondInfo={data.historyInfo} />
    </>
  )
}

export default React.memo(About);