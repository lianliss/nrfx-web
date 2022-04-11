import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'utils/svg-wrap';
import ellipseIcon from '../../../assets/ellipse.svg';
import { getLang } from 'utils';
import './RoadmapStep.less';

function RoadmapStep({ title, description, number }) {
  return (
    <div className="RoadmapStep">
      <SVG src={ellipseIcon} className="RoadmapStep__ellipse" />
      <span className="RoadmapStep__tag">
        {getLang('narfex_dao_roadmap_phase')} {number}
      </span>
      <h3 className="RoadmapStep__title">{getLang(title)}</h3>
      <p className="RoadmapStep__description">{getLang(description)}</p>
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
