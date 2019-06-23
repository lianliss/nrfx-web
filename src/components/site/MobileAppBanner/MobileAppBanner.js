import './MobileAppBanner.less';

import React from 'react';
import * as utils from '../../../utils/index';


export default function MobileAppBanner() {
  return (
    <div className="MobileAppBanner">
      <div className="MobileAppBanner__bg" />
      <div className="MobileAppBanner__cont">
        <div className="MobileAppBanner__text">
          <div className="MobileAppBanner__title">{utils.nl2br(utils.getLang('site__mobileAppBannerTitle'))}</div>
          <div className="MobileAppBanner__caption">{utils.getLang('site__mobileAppBannerSubTitle')}</div>
        </div>
        <div className="MobileAppBanner__buttons">
          <a
            href="#"
            className="MobileAppBanner__button ios"
            target="_blank"
            rel="noopener noreferrer"
          />

          <a
            href="https://play.google.com/store/apps/details?id=com.bitcoinbot"
            className="MobileAppBanner__button android"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </div>
  )
}
