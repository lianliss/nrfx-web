import './RegisterBanner.less';

import React, { useState } from 'react';

import { classNames } from '../../../utils';
import * as utils from '../../../utils/index';
import AuthModal from '../AuthModal/AuthModal';
import * as steps from '../AuthModal/fixtures';


function RegisterBanner({ isCurly }) {
  const [email, changeEmail] = useState('');
  const [isInputActive, toggleInputActive] = useState(false);

  const className = classNames({
    RegisterBanner: true,
    curly: isCurly,
    active: isInputActive,
  });

  return (
    <div className={className}>
      <div className="RegisterBanner__content">
        <div className="RegisterBanner__title">{utils.getLang('site__registerBannerTitle')}</div>
        <div className="RegisterBanner__caption">{utils.getLang('site__registerBannerCaption')}</div>
        <div className="RegisterBanner__form">
          <input
            type="email"
            className="RegisterBanner__form__input"
            placeholder={utils.getLang('site__authModalPlaceholderEmail')}
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
            onFocus={() => toggleInputActive(true)}
            onBlur={() => toggleInputActive(false)}
          />

          <AuthModal type={steps.REGISTRATION} initialEmail={email}>
            <div className="RegisterBanner__form__button">{utils.getLang('site__registerBannerBtn')}</div>
          </AuthModal>
        </div>
      </div>
    </div>
  )
}

export default React.memo(RegisterBanner);