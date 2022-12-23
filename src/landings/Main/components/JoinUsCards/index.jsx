import React from 'react';

// Components
import JoinUsCard from '../JoinUsCard';
import SVG from 'utils/svg-wrap';
import { Link } from 'react-router5';

// Utils
import { getLang } from 'utils';

import educationHubBg from 'src/asset/backgrounds/main-landing/join-us-hub.svg';
import governanceBg from 'src/asset/backgrounds/main-landing/join-us-governance.svg';
import linkArrow from 'src/asset/24px/arrow_right_alt.svg';

// Styles
import './index.less';

function JoinUsCards() {
  return (
    <div className="MainLanding-JoinUsCards">
      <JoinUsCard
        link={
          <Link routeName="">
            {getLang('button_read_more')}
            <SVG src={linkArrow} flex />
          </Link>
        }
        title={getLang('main_landing_join_us_education_hub')}
        icon={educationHubBg}
        className="education-card"
      />
      <JoinUsCard
        link={
          <Link routeName="">
            {getLang('button_read_more')}
            <SVG src={linkArrow} flex />
          </Link>
        }
        title={getLang('main_landing_join_us_governance')}
        icon={governanceBg}
        className="governance-card"
      />
    </div>
  );
}

export default JoinUsCards;
