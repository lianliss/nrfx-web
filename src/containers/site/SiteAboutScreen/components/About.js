import React from 'react';
import SVG from 'react-inlinesvg';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import { misssionInfo, historyInfo } from '../fixtures';
import * as utils from '../../../../utils/index';


function About() {
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
        <a href="#" className="SiteAboutScreen__link">{utils.getLang('site__' +
            '' +
            'aboutContact')}</a>
      </div>


      <InfoSection firstInfo={misssionInfo} secondInfo={historyInfo} />
    </>
  )
}

export default React.memo(About);