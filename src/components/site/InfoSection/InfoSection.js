import React from 'react';

import InfoCard from '../InfoCard/InfoCard';
import * as utils from '../../../utils/index';


function InfoSection({ firstInfo, secondInfo }) {
  return (
    <div className="SiteAboutScreen__infocards">
      <InfoCard
        horizontal
        title={firstInfo.title}
        caption={firstInfo.caption}
        icon={firstInfo.icon}
        className="SiteAboutScreen__infocard"
        btn={<a href="#" className="SiteAboutScreen__link">{utils.getLang('site__aboutReadMore1')}</a>}
      />

      <div className="SiteAboutScreen__divider"></div>

      <InfoCard
        horizontal
        title={secondInfo.title}
        caption={secondInfo.caption}
        icon={secondInfo.icon}
        className="SiteAboutScreen__infocard"
        btn={<a href="#" className="SiteAboutScreen__link">{utils.getLang('site__aboutReadMore2')}</a>}
      />
    </div>
  )
}

export default React.memo(InfoSection);