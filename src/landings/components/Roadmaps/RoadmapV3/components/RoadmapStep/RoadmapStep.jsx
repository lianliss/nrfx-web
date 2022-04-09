import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'utils/svg-wrap';
import ellipseIcon from '../../../assets/ellipse.svg';
import './RoadmapStep.less';

function RoadmapStep({ title, description, number }) {
  return (
    <div className="RoadmapStep">
      <SVG src={ellipseIcon} className="RoadmapStep__ellipse" />
      <span className="RoadmapStep__tag">Phase {number}</span>
      <h3 className="RoadmapStep__title">{title}</h3>
      <p className="RoadmapStep__description">{description}</p>
    </div>
  );
}

RoadmapStep.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  number: PropTypes.number,
};

RoadmapStep.defaultProps = {
  title: '',
  description: '',
  number: 0,
};

export default RoadmapStep;
