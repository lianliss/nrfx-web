import React from 'react';
import { useRoute } from 'react-router5';

// Components
import { Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import {
  DAPP_REFERRAL_EXCHANGER,
  DAPP_REFERRAL_FARMING,
} from 'src/index/constants/pages';
import SocialLinks from '../../../SocialLinks/SocialLinks';
import NumberToSpan from '../../../NumberToSpan/NumberToSpan';

// Styles
import './Preview.less';

function Preview({ adaptive }) {
  const { router } = useRoute();

  return (
    <div className="Referral__Preview">
      <div className="Referral__Preview__container">
        <div className="Referral__Preview__content">
          <h1>Referral program</h1>
          <p className="subtitle">
            <NumberToSpan
              text="Earn up to 30% from friends’
              commission on Fiat deposits and 5% from
              their NRFX token purchases
              through an Narfex Exchanger"
              className="blue"
            />
          </p>
          <Button
            type="lightBlue"
            onClick={() => router.navigate(DAPP_REFERRAL_FARMING)}
          >
            <SVG src={require('src/asset/icons/cabinet/coin.svg')} />
            Referral Farming
          </Button>
          <Button
            type="lightBlue"
            onClick={() => router.navigate(DAPP_REFERRAL_EXCHANGER)}
          >
            <SVG src={require('src/asset/icons/convert-card.svg')} />
            Referral Exchenger
          </Button>
        </div>
        {adaptive ? (
          <div className="Referral__Preview-bg">
            <img
              src={require('src/asset/backgrounds/referral-preview-adaptive-bg.svg').default}
            />
          </div>
        ) : (
          <div className="Referral__Preview-bg">
            <img
              src={require('src/asset/backgrounds/referral-preview-bg.png')}
            />
          </div>
        )}
      </div>
      {!adaptive && <SocialLinks />}
    </div>
  );
}

export default Preview;
