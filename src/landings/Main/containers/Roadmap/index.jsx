import React from 'react';

// Components
import { default as RoadmapComponent } from 'src/token_landing/containers/Roadmap/Roadmap';

// Utils
import { roadmapItems } from '../../constants/roadmapItems';
import { types } from 'src/token_landing/containers/Roadmap/constants/roadmapTypes';
import { getLang } from 'utils';

// Styles
import './index.less';

function Roadmap({ adaptive }) {
  return (
    <div className="MainLanding-roadmap__wrapper">
      <div className="MainLanding-roadmap">
        <RoadmapComponent
          title={getLang('main_landing_roadmap_title')}
          items={roadmapItems}
          type={types.medium}
        />
      </div>
    </div>
  );
}

export default Roadmap;
