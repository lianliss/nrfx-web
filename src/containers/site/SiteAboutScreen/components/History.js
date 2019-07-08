import React from 'react';
import { connect } from 'react-redux';

import TitleWithBg from '../../../../components/site/TitleWithBg/TitleWithBg';
import InfoSection from '../../../../components/site/InfoSection/InfoSection';
import Timeline from '../../../../components/site/Timeline/Timeline';
import { data } from '../fixtures';


function History({ lang }) {
  return (
    <>
      <div className="SiteAboutScreen__intro SiteAboutScreen__history">
        <TitleWithBg title={lang.site__aboutHistoryTitle} bgTitle={lang.site__aboutHistoryTitle} centered />
        <p className="SiteAboutScreen__caption">{lang.site__aboutHistorySubTitle}</p>
      </div>

      <div className="SiteAboutScreen__history__timeline">
        <Timeline timelineData={data.timelineData} />
      </div>

      <InfoSection firstInfo={data.aboutInfo} secondInfo={data.misssionInfo} />
    </>
  )
}

const mapStateToProps = (state) => ({
  lang: state.default.lang,
});

export default React.memo(connect(mapStateToProps)(History));