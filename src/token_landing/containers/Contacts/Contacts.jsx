import React from 'react';
import { Link } from 'react-router5';

import './Contacts.less';
import phonesImage from './assets/phones.svg';

import { getLang } from 'utils';
import TokenButton from '../../components/TokenButton/TokenButton';

function Contacts({ currentLang }) {
  const telegramUrl =
    currentLang === 'ru'
      ? 'https://t.me/Narfex_RU'
      : 'https://t.me/Narfex_EN';

  return (
    <section className="Contacts">
      <div className="Contacts__container">
        <h2 className="Contacts__title">
          {getLang('token_landing_contacts_title')}
        </h2>
        <a
          href={telegramUrl}
          target="_blank"
          className="Contacts__link Contacts__link-telegram"
        >
          <TokenButton className="Contacts__button white-btn">
            {getLang('token_landing_join_telegram')}
          </TokenButton>
        </a>
        <img src={phonesImage} className="Contacts__image" />
      </div>
    </section>
  );
}

export default Contacts;
