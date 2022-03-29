import React from 'react';

import SVG from 'utils/svg-wrap';
import './Service.less';

function Service({ icon, title }) {
  return (
    <div className="Service">
      <div className="Service__icon icon-container">
        <SVG src={icon} />
      </div>
      <span className="Service__title gradient-text">{title}</span>
    </div>
  );
}

export default Service;
