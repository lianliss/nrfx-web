import './RegisterBanner.less';

import React from 'react';

import { classNames } from '../../../utils';


function RegisterBanner({ isCurly }) {
  const className = classNames({
    RegisterBanner: true,
    curly: isCurly,
  });

  return (
    <div className={className}>
      <div className="RegisterBanner__title">Создайте единый аккаунт сейчас</div>
      <div className="RegisterBanner__caption">Попробовать все преимущества BITCOINBOT очень просто </div>
      <div className="RegisterBanner__form">
        <input type="email" className="RegisterBanner__form__input" placeholder="E-mail" />
        <div className="RegisterBanner__form__button">Регистрация</div>
      </div>
    </div>
  )
}

export default React.memo(RegisterBanner);