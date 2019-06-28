import React from 'react';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import { data } from '../fixtures';
import * as utils from '../../../../utils/index';


function Mission() {
  const _renderValues = () => {
    const values = [
      {
        title: utils.getLang('site__aboutMissionTechnologyDevelopmentTitle'),
        caption: utils.getLang('site__aboutMissionTechnologyDevelopmentSubTitle'),
        icon: require('../asset/change.svg'),
      },
      {
        title: utils.getLang('site__aboutMissionCommunityUsersTitle'),
        caption: utils.getLang('site__aboutMissionCommunityUsersSubTitle'),
        icon: require('../asset/community.svg'),
      },
      {
        title: utils.getLang('site__aboutMissionTrustReliabilityTitle'),
        caption: utils.getLang('site__aboutMissionTrustReliabilitySubTitle'),
        icon: require('../asset/trust.svg'),
      },
    ]

    return values.map(val => (
      <div className="SiteAboutScreen__mission__value" key={val.title}>
        <img className="SiteAboutScreen__mission__value__icon" src={val.icon} alt={val.title}/>
        <div className="SiteAboutScreen__mission__value__cont">
          <h3 className="SiteAboutScreen__mission__value__title">{val.title}</h3>
          <p className="SiteAboutScreen__mission__value__caption">{val.caption}</p>
        </div>
      </div>
    ))
  }

  return (
    <>
      <div className="SiteAboutScreen__intro">
        <TitleWithBg title={utils.getLang('site__aboutMissionOurMissionTitle')} bgTitle="Mission" centered />
        <p className="SiteAboutScreen__caption">{utils.nl2br(utils.getLang('site__aboutMissionOurMissionSubTitle'))}</p>
      </div>

      <div className="SiteAboutScreen__mission__values">
        <h2 className="SiteAboutScreen__mission__values__title">{utils.getLang('site__aboutMissionValuesUnitUs')}</h2>

        {_renderValues()}
      </div>

      <InfoSection firstInfo={data.aboutInfo} secondInfo={data.historyInfo} />
    </>
  )
}

export default React.memo(Mission);