import React from 'react';

import './Contacts.less';
import phonesImage from './assets/phones.png';

import { getLang } from 'utils';
import TokenButton from '../../components/TokenButton/TokenButton';

function Contacts() {
  return (
    <section className="Contacts">
      <div className="Contacts__container">
        <h2 className="Contacts__title">
          {getLang('token_landing_contacts_title')}
        </h2>
        <TokenButton className="Contacts__button white-btn">
          {getLang('token_landing_join_telegram')}
        </TokenButton>
        <img src={phonesImage} className="Contacts__image" />
      </div>
    </section>
  );
}

export default Contacts;
