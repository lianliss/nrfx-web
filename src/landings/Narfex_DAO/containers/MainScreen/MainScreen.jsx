import React from 'react';
import PropTypes from 'prop-types';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import TokenButton from '../../../components/TokenButton/TokenButton';
import SVG from 'utils/svg-wrap';
import mainScreenBg from '../../assets/main_screen_bg.svg';
import mainScreenBgMobile from '../../assets/main_screen_bg-mobile.svg';
import * as landingActions from 'actions/landing/buttons';
import { getLang } from 'utils';

import './MainScreen.less';

function MainScreen({ adaptive }) {
  return (
    <div className="MainScreen">
      <LandingContainer>
        <div className="MainScreen__content">
          <h1>{getLang('narfex_dao_title')}</h1>
          <p>{getLang('narfex_dao_description')}</p>
          <TokenButton
            className="light-btn"
            onClick={() => {
              landingActions.swap();
            }}
          >
            {getLang('narfex_dao_launch_narfex')}
          </TokenButton>
          {adaptive ? (
            <SVG src={mainScreenBgMobile} className="MainScreen__bg" />
          ) : (
            <SVG src={mainScreenBg} className="MainScreen__bg" />
          )}
        </div>
      </LandingContainer>
    </div>
  );
}

MainScreen.propTypes = {
  adaptive: PropTypes.bool,
};

MainScreen.defaultProps = {
  adaptive: false,
};

export default MainScreen;
