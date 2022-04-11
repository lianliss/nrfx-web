import React from 'react';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import ContactsContainer from '../../../components/ContactsContainer/ContactsContainer';
import TokenButton from '../../../components/TokenButton/TokenButton';
import SVG from 'utils/svg-wrap';
import contactsImage from '../../assets/contacts.svg';
import { TOKEN } from 'src/index/constants/pages';
import { useRouter } from 'react-router5';

import './Contacts.less';

function Contacts() {
  const router = useRouter();

  return (
    <div className="Contacts">
      <LandingContainer>
        <ContactsContainer>
          <h2>Become a Narfex Token holder</h2>
          <p>
            Anyone can be an Narfex Token holder and all are welcome to come
            join us in shaping the future of DeFi.
          </p>
          <TokenButton
            className="white-btn"
            onClick={() => {
              router.navigate(TOKEN);
            }}
          >
            Buy Token
          </TokenButton>
          <SVG src={contactsImage} />
        </ContactsContainer>
      </LandingContainer>
    </div>
  );
}

export default Contacts;
