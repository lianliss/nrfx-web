import React from 'react';

import './Contacts.less';
import phonesImage from './assets/phones.png';

import Lang from "src/components/Lang/Lang";
import TokenButton from '../../components/TokenButton/TokenButton';

function Contacts() {
  return (
    <section className="Contacts">
      <div className="Contacts__container">
        <h2 className="Contacts__title">Subscribe our Telegram</h2>
        <TokenButton className="Contacts__button white-btn">
          Join Telegram
        </TokenButton>
        <img src={phonesImage} className="Contacts__image" />
      </div>
    </section>
  );
}

export default Contacts;
