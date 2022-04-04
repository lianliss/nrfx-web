import React from 'react';
import PropTypes from 'prop-types';

import './Information.less';
import { getLang } from 'utils';
import TokenButton from '../../components/TokenButton/TokenButton';
import CopyText from './components/CopyText/CopyText';
import Card from './components/Card/Card';

// Card Images
import laptopImage from './assets/101.svg';
import tabletImage from './assets/100.svg';
import laptopImageMobile from './assets/101m.svg';
import tabletImageMobile from './assets/100m.svg';
import * as actions from "actions/landing/buttons";

function Information({ code, adaptive, currentLang }) {
  return (
    <section className="Information">
      <div className="Information__container">
        <div className="Information__column">
          <h2 className="Information__title">
            {getLang('token_landing_information_title')}
          </h2>
          <p className="Information__description">
            {getLang('token_landing_information_description')}
          </p>
          {!adaptive && (
            <div className="Information__action">
              <CopyText text={code} />
              <TokenButton className="light-btn" onClick={() => actions.swap()}>
                {getLang('token_landing_narfex_exchange')}
              </TokenButton>
            </div>
          )}
        </div>
        <div className="Information__column">
          <Card
            title="token_landing_information_card_video_instruction_title"
            actionText="token_landing_information_card_video_instruction_button"
            src={adaptive ? tabletImageMobile : tabletImage}
            position={{ left: -33, top: 28.12 }}
          />
          <Card
            title="token_landing_information_card_text_instruction_button"
            actionText="token_landing_information_card_text_instruction_button"
            link={currentLang === "ru" ? "https://narfex.gitbook.io/wiki/" : "https://narfex.gitbook.io/narfex-wiki-en/"}
            src={adaptive ? laptopImageMobile : laptopImage}
            position={{ left: 7.83, top: -19.81 }}

          />
        </div>
        {adaptive && (
          <div className="Information__action">
            <CopyText text={code} />
            <TokenButton className="light-btn">
              {getLang('token_landing_narfex_exchange')}
            </TokenButton>
          </div>
        )}
      </div>
    </section>
  );
}

Information.defaultProps = {
  code: '',
  adaptive: false,
  currentLang: 'ru',
};

Information.propTypes = {
  code: PropTypes.string,
  adaptive: PropTypes.bool,
  currentLang: PropTypes.string,
};

export default Information;
