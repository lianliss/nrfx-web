import './RegisterBanner.less';

import React from 'react';


function RegisterBanner({ isCurly }) {
  return (
    <div className="SiteRegister" style={isCurly ? { height: '620px' } : { height: '420px' }}>
      <div className="SiteRegister__title">Создайте единый аккаунт сейчас</div>
      <div className="SiteRegister__caption">Попробовать все преимущества BITCOINBOT очень просто </div>
      <div className="SiteRegister__form">
        <input type="email" className="SiteRegister__form__input" placeholder="E-mail" />
        <div className="SiteRegister__form__button">Регистрация</div>
      </div>
    </div>
  )
}

export default React.memo(RegisterBanner);