import React from 'react';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import ContactsContainer from '../../../components/ContactsContainer/ContactsContainer';
import TokenButton from '../../../components/TokenButton/TokenButton';
import SVG from 'utils/svg-wrap';
import contactsImage from '../../assets/contacts.svg';
import { TOKEN } from 'src/index/constants/pages';
import { useRouter } from 'react-router5';
import { getLang } from 'utils';

import './Contacts.less';

function Contacts() {
  const router = useRouter();

  return (
    <div className="Contacts">
      <LandingContainer>
        <ContactsContainer>
          <h2>{getLang('narfex_dao_contacts_title')}</h2>
          <p>{getLang('narfex_dao_contacts_description')}</p>
          <TokenButton
            className="white-btn"
            onClick={() => {
              router.navigate(TOKEN);
            }}
          >
            {getLang('narfex_dao_buy_token_button')}
          </TokenButton>
          <SVG src={contactsImage} />
        </ContactsContainer>
      </LandingContainer>
    </div>
  );
}

export default Contacts;
