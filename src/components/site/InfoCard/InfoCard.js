import React from 'react';

import './InfoCard.less';


function InfoCard({ title, caption, icon, btn }) {
  return (
    <div key={title} className="InfoCard__item">
      <div className="InfoCard__item__icon" style={{ backgroundImage: `url(${icon})` }} />
      <div className="InfoCard__item__title">{title}</div>
      <div className="InfoCard__item__caption">{caption}</div>

      {btn || null}
    </div>
  )
};

export default React.memo(InfoCard);