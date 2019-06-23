import React from 'react';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import Timeline from '../../../../components/site/Timeline/Timeline';
import { aboutInfo, misssionInfo, timelineData } from '../fixtures';
import * as utils from '../../../../utils/index';


function History() {
  return (
    <>
      <div className="SiteAboutScreen__intro SiteAboutScreen__history">
        <TitleWithBg title={utils.getLang('site__aboutHistoryTitle')} bgTitle="Roadmap" centered />
        <p className="SiteAboutScreen__caption">{utils.getLang('site__aboutHistorySubTitle')}</p>
      </div>

      <div className="SiteAboutScreen__history__timeline">
        <Timeline timelineData={timelineData} />
      </div>

      <InfoSection firstInfo={aboutInfo} secondInfo={misssionInfo} />
    </>
  )
}

export default React.memo(History);