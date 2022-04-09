import React from 'react';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import QuoteWindow from '../../components/QuoteWindow/QuoteWindow';
import { RoadmapV3 } from '../../../components/Roadmaps';
import { roadmapItems } from '../../constants/roadmap';

import './Timeline.less';

function Timeline() {
  return (
    <div className="Timeline">
      <QuoteWindow
        defaultText="We firmly believe that DAO is at the core of"
        gradientText="web 3.0 technology"
      />
      <LandingContainer>
        <h2>
          Governance implementation&nbsp;
          <span className="gradient-text">timeline</span>
        </h2>
        <RoadmapV3 items={roadmapItems} />
      </LandingContainer>
    </div>
  );
}

export default Timeline;
