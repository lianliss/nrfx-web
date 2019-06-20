import React from 'react';

import InfoCard from '../InfoCard/InfoCard';


function InfoSection({ firstInfo, secondInfo }) {
  return (
    <div className="SiteAboutScreen__infocards">
      <InfoCard
        horizontal
        title={firstInfo.title}
        caption={firstInfo.caption}
        icon={firstInfo.icon}
        className="SiteAboutScreen__infocard"
        btn={<a href="#" className="SiteAboutScreen__link">Подробнее</a>}
      />

      <div className="SiteAboutScreen__divider"></div>

      <InfoCard
        horizontal
        title={secondInfo.title}
        caption={secondInfo.caption}
        icon={secondInfo.icon}
        className="SiteAboutScreen__infocard"
        btn={<a href="#" className="SiteAboutScreen__link">Подробнее</a>}
      />
    </div>
  )
}

export default React.memo(InfoSection);