import React from 'react';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import SVG from 'utils/svg-wrap';
import membershipBg from '../../assets/membership_bg.svg';
import { getLang } from 'utils';

import './Membership.less';

function Membership() {
  return (
    <div className="Membership">
      <LandingContainer>
        <div className="Membership__content">
          <h2>{getLang('narfex_dao_membership_title')}</h2>
          <p>{getLang('narfex_dao_membership_description')}</p>
        </div>
        <SVG src={membershipBg} className="Membership__bg" />
      </LandingContainer>
    </div>
  );
}

export default Membership;
