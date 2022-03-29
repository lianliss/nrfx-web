import React from 'react';

import SVG from 'utils/svg-wrap';
import './Benefit.less';

function Benefit({ icon, title, description }) {
  return (
    <article className="Benefit">
      <div className="Benefit__icon-container">
        <SVG src={icon} />
      </div>
      <h3 className="Benefit__title">{title}</h3>
      <p className="Benefit__description">{description}</p>
    </article>
  );
}

export default Benefit;
