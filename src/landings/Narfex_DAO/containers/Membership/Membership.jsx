import React from 'react';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import SVG from 'utils/svg-wrap';
import membershipBg from '../../assets/membership_bg.svg';

import './Membership.less';

function Membership() {
  return (
    <div className="Membership">
      <LandingContainer>
        <div className="Membership__content">
          <h2>Membership</h2>
          <p>
            Participating in idea submission, commentary, proposal submission,
            and voting is restricted to Narfex DAO members. Holding NRFX is the
            only requirement for membership in the DAO.
          </p>
        </div>
      <SVG src={membershipBg} className="Membership__bg" />
      </LandingContainer>
    </div>
  );
}

export default Membership;
