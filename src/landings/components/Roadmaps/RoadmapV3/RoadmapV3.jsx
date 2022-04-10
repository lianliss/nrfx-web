import React from 'react';
import PropTypes from 'prop-types';

import RoadmapStep from './components/RoadmapStep/RoadmapStep';
import './RoadmapV3.less';

function RoadmapV3({ items = [] }) {
  return (
    <div className="RoadmapV3">
      <div className="RoadmapV3__container">
        <div className="RoadmapV3__line" />
        <div className="RoadmapV3__items">
          {items.map((item, key) => (
            <RoadmapStep
              key={key}
              title={item.title}
              description={item.description}
              number={key + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

RoadmapV3.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default RoadmapV3;
