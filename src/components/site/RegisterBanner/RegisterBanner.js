import './RegisterBanner.less';

import React, { useState } from 'react';

import { classNames } from '../../../utils';
import AuthModal from '../AuthModal/AuthModal';
import * as steps from '../AuthModal/fixtures';


function RegisterBanner({ isCurly }) {
  const [email, changeEmail] = useState('');

  const className = classNames({
    RegisterBanner: true,
    curly: isCurly,
  });

  return (
    <div className={className}>
      <div className="RegisterBanner__title">Создайте единый аккаунт сейчас</div>
      <div className="RegisterBanner__caption">Попробовать все преимущества BITCOINBOT очень просто </div>
      <div className="RegisterBanner__form">
        <input
          type="email"
          className="RegisterBanner__form__input"
          placeholder="E-mail"
          value={email}
          onChange={(e) => changeEmail(e.target.value)}
        />

        <AuthModal type={steps.REGISTRATION} initialEmail={email}>
          <div className="RegisterBanner__form__button">Регистрация</div>
        </AuthModal>
      </div>
    </div>
  )
}

export default React.memo(RegisterBanner);