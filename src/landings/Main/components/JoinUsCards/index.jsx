import React from 'react';

// Components
import JoinUsCard from '../JoinUsCard';
import SVG from 'utils/svg-wrap';
import { Link } from 'react-router5';

// Utils
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
            Read more
            <SVG src={linkArrow} flex />
          </Link>
        }
        title="Education Hub"
        icon={educationHubBg}
        className="education-card"
      />
      <JoinUsCard
        link={
          <Link routeName="">
            Read more
            <SVG src={linkArrow} flex />
          </Link>
        }
        title="Governance"
        icon={governanceBg}
        className="governance-card"
      />
    </div>
  );
}

export default JoinUsCards;
