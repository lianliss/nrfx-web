import React from 'react';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import Timeline from '../../../../components/site/Timeline/Timeline';
import { aboutInfo, misssionInfo, timelineData } from '../fixtures';


function History() {
  return (
    <>
      <div className="SiteAboutScreen__intro SiteAboutScreen__history">
        <TitleWithBg title="Все большое начинается с чего-то малого" bgTitle="Roadmap" centered />
        <p className="SiteAboutScreen__caption">
          Мы стремимся к открытой финансовой системе, которая может дать экономическую свободу каждому, уровнять возможности людей, ускоряя тем самым темпы развития во всем мире. Система не контролируемая какой-либо страной или компанией, свободная как «Интернет». 
        </p>
      </div>

      <div className="SiteAboutScreen__history__timeline">
        <Timeline timelineData={timelineData} />
      </div>

      <InfoSection firstInfo={aboutInfo} secondInfo={misssionInfo} />
    </>
  )
}

export default React.memo(History);