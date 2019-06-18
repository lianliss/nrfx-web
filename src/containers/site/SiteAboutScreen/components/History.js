import React from 'react';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import { aboutInfo, misssionInfo } from '../fixtures';


function History() {
  return (
    <>
      <div className="SiteAboutScreen__intro">
        {/* TODO: Make responsive */}
        <TitleWithBg title="Все большое начинается с чего-то малого" bgTitle="Roadmap" centered />
        <p className="SiteAboutScreen__caption">
          Мы стремимся к открытой финансовой системе, которая может дать экономическую свободу каждому, уровнять возможности людей, ускоряя тем самым темпы развития во всем мире. Система не контролируемая какой-либо страной или компанией, свободная как «Интернет». 
        </p>
      </div>

      <div className="SiteAboutScreen__history__timeline">
        {/* TODO: Add timeline */}
        <p>Timeline here</p>
      </div>

      <InfoSection firstInfo={aboutInfo} secondInfo={misssionInfo} />
    </>
  )
}

export default React.memo(History);