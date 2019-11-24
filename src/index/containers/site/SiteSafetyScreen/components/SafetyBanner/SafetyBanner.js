import './SafetyBanner.less';

import React from 'react';
import * as utils from '../../../../../../utils/index';

function SafetyBanner() {
  return (
    <div className="SafetyBanner">
      <h2 className="SafetyBanner__title">{utils.getLang('site__safetyBannerTitle')}</h2>

      <div className="SafetyBanner__cont">
        <div className="SafetyBanner__data">
          <h4>98%</h4>
        </div>

        <div className="SafetyBanner__text">
          <h4 className="SafetyBanner__subtitle">{utils.getLang('site__safetyBannerSubTitle')}</h4>
          <h5 className="SafetyBanner__caption">{utils.getLang('site__safetyBannerCaption')}</h5>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SafetyBanner);