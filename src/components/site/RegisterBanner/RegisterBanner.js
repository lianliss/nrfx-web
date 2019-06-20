import './RegisterBanner.less';

import React from 'react';
import * as utils from '../../../utils/index';

import { classNames } from '../../../utils';


function RegisterBanner({ isCurly }) {
  const className = classNames({
    RegisterBanner: true,
    curly: isCurly,
  });

  return (
    <div className={className}>
      <div className="RegisterBanner__title">{utils.getLang('site__registerBannerTitle')}</div>
      <div className="RegisterBanner__caption">{utils.getLang('site__registerBannerCaption')}</div>
      <div className="RegisterBanner__form">
        <input type="email" className="RegisterBanner__form__input" placeholder={utils.getLang('site__registerBannerPlaceHolderEmail')} />
        <div className="RegisterBanner__form__button">{utils.getLang('site__registerBannerBtn')}</div>
      </div>
    </div>
  )
}

export default React.memo(RegisterBanner);