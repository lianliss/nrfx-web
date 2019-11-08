import React from 'react';
import { connect } from 'react-redux';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import { data } from '../fixtures';
import * as utils from '../../../../utils/index';


function Mission({ lang }) {
  const _renderValues = () => {
    const values = [
      {
        title: lang.site__aboutMissionTechnologyDevelopmentTitle,
        caption: lang.site__aboutMissionTechnologyDevelopmentSubTitle,
        icon: require('../asset/change.svg'),
      },
      {
        title: lang.site__aboutMissionCommunityUsersTitle,
        caption: lang.site__aboutMissionCommunityUsersSubTitle,
        icon: require('../asset/community.svg'),
      },
      {
        title: lang.site__aboutMissionTrustReliabilityTitle,
        caption: lang.site__aboutMissionTrustReliabilitySubTitle,
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
        <TitleWithBg title={lang.site__aboutMissionOurMissionTitle} bgTitle={lang.site__aboutMissionOurMissionTitle} centered />
        <p className="SiteAboutScreen__caption">{utils.nl2br(lang.site__aboutMissionOurMissionSubTitle)}</p>
      </div>

      <div className="SiteAboutScreen__mission__values">
        <h2 className="SiteAboutScreen__mission__values__title">{lang.site__aboutMissionValuesUnitUs}</h2>

        {_renderValues()}
      </div>

      <InfoSection firstInfo={data.aboutInfo} secondInfo={data.historyInfo} />
    </>
  )
}

const mapStateToProps = (state) => ({
  lang: state.default.lang,
});

export default React.memo(connect(mapStateToProps)(Mission));