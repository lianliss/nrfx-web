import React from 'react';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import ContactsContainer from '../../../components/ContactsContainer/ContactsContainer';
import TokenButton from '../../../components/TokenButton/TokenButton';
import SVG from 'utils/svg-wrap';
import contactsImage from '../../assets/contacts.svg';

import './Contacts.less';

function Contacts() {
  return (
    <div className="Contacts">
      <LandingContainer>
        <ContactsContainer>
          <h2>Anyone can be an Narfex Token holder</h2>
          <p>
            and all are welcome to come join us in shaping the future of DeFi.
          </p>
          <TokenButton className="white-btn">Join Telegram</TokenButton>
          <SVG src={contactsImage} />
        </ContactsContainer>
      </LandingContainer>
    </div>
  );
}

export default Contacts;
