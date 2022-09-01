import React from 'react';

import LandingContainer from '../../../components/LandingContainer/LandingContainer';
import QuoteWindow from '../../components/QuoteWindow/QuoteWindow';
import { RoadmapV3 } from '../../../components/Roadmaps';
import { roadmapItems } from '../../constants/roadmap';
import { getLang } from 'utils';

import './Timeline.less';

function Timeline() {
  return (
    <div className="Timeline">
      <QuoteWindow
        defaultText={getLang('narfex_dao_window_default_text')}
        gradientText={getLang('narfex_dao_window_gradient_text')}
      />
      <LandingContainer>
        <h2>
          {getLang('narfex_dao_timeline_title_default')}<br />
          <span className="gradient-text">
            {getLang('narfex_dao_timeline_title_gradient')}
          </span>
        </h2>
        <RoadmapV3 items={roadmapItems} />
      </LandingContainer>
    </div>
  );
}

export default Timeline;
