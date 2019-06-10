import './MobileAppBanner.less';

import React from 'react';


export default function MobileAppBanner() {
  return (
    <div className="MobileAppBanner">
      <div className="MobileAppBanner__bg" />
      <div className="MobileAppBanner__cont">
        <div className="MobileAppBanner__title">BITCOINBOT всегда под рукой</div>
        <div className="MobileAppBanner__caption">Управляйте цифровыми активами, где бы вы ни находились</div>
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
