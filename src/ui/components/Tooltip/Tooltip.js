import './Tooltip.less'

import React from 'react';

const Tooltip = props => {
  return (
    <div className="Tooltip__wrapper">
      <div className="Tooltip">
        <div className="Tooltip__area"></div>
        {props.title}
      </div>
      {props.children}
    </div>
  )
};

export default Tooltip;
