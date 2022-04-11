import React from 'react';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import TokenButton from '../../../components/TokenButton/TokenButton';
import SVG from 'utils/svg-wrap';
import mainScreenBg from '../../assets/main_screen_bg.svg';
import mainScreenBgMobile from '../../assets/main_screen_bg-mobile.svg';
import * as landingActions from "actions/landing/buttons";

import './MainScreen.less';

function MainScreen({ adaptive }) {
  return (
    <div className="MainScreen">
      <LandingContainer>
        <div className="MainScreen__content">
          <h1>Narfex DAO</h1>
          <p>
            A decentralized organization that governs the network, enabling NRFX
            holders to vote for key protocol parameters.
          </p>
          <TokenButton className="light-btn" onClick={() => {landingActions.swap()}}>Launch Narfex</TokenButton>
          {!adaptive && <SVG src={mainScreenBg} className="MainScreen__bg" />}
          {adaptive && (
            <SVG src={mainScreenBgMobile} className="MainScreen__bg" />
          )}
        </div>
      </LandingContainer>
    </div>
  );
}

export default MainScreen;
