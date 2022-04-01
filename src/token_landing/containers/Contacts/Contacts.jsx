import React from 'react';

import './Contacts.less';
import SVG from 'utils/svg-wrap';
import phonesImage from './assets/phones.svg';

import TokenButton from '../../components/TokenButton/TokenButton';

function Contacts() {
  return (
    <section className="Contacts">
      <div className="Contacts__container">
        <h2 className="Contacts__title">Subscribe our Telegram</h2>
        <TokenButton className="Contacts__button white-btn">
          Join Telegram
        </TokenButton>
        <SVG src={phonesImage} className="Contacts__image" />
      </div>
    </section>
  );
}

export default Contacts;
