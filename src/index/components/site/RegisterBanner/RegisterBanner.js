import './RegisterBanner.less';

import React, { useState } from 'react';
import { connect } from 'react-redux';

import { classNames } from '../../../../utils';
import * as steps from '../../../../components/AuthModal/fixtures';
import * as actions from '../../../../actions';
import { registrationSetValue } from 'src/actions/index';


function RegisterBanner({ isCurly, lang, registrationSetValue }) {
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
          <div onClick={() => {
            registrationSetValue('email', email);
            actions.openModal('auth', { type: steps.REGISTRATION })
          }} className="RegisterBanner__form__button">{lang.site__registerBannerBtn}</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  lang: state.default.lang,
});

export default React.memo(connect(
  mapStateToProps,
  { registrationSetValue }
)(RegisterBanner));
