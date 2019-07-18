import './RegisterBanner.less';

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { classNames } from '../../../utils';
import AuthModal from '../AuthModal/AuthModal';
import * as steps from '../AuthModal/fixtures';


function RegisterBanner({ isCurly, lang }) {
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
        <div className="RegisterBanner__title">{lang.site__registerBannerTitle}</div>
        <div className="RegisterBanner__caption">{lang.site__registerBannerCaption}</div>
        <div className="RegisterBanner__form">
          <input
            type="email"
            className="RegisterBanner__form__input"
            placeholder={lang.site__authModalPlaceholderEmail}
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
            onFocus={() => toggleInputActive(true)}
            onBlur={() => toggleInputActive(false)}
          />

          <AuthModal type={steps.REGISTRATION} initialEmail={email}>
            <div className="RegisterBanner__form__button">{lang.site__registerBannerBtn}</div>
          </AuthModal>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  lang: state.default.lang,
});

export default React.memo(connect(mapStateToProps)(RegisterBanner));