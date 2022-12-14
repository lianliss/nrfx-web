import React from 'react';

// Components
import { default as RoadmapComponent } from 'src/token_landing/containers/Roadmap/Roadmap';

// Utils
import { roadmapItems } from 'src/token_landing/constants/roadmap';
import { types } from 'src/token_landing/containers/Roadmap/constants/roadmapTypes';

// Styles
import './index.less';

function Roadmap({ adaptive }) {
  return (
    <div className="MainLanding-roadmap__wrapper">
      <div className="MainLanding-roadmap">
        <RoadmapComponent
          title="Road map"
          items={roadmapItems}
          type={types.medium}
        />
      </div>
    </div>
  );
}

export default Roadmap;
