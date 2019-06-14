import './InfoCard.less';

import React from 'react';


function InfoCard({ title, caption, icon, btn, className }) {
  return (
    <div className={"InfoCard " + className}>
      <div className="InfoCard__icon" style={{ backgroundImage: `url(${icon})` }} />
      <h3 className="InfoCard__title">{title}</h3>
      <p className="InfoCard__caption">{caption}</p>

      {btn || null}
    </div>
  )
};

export default React.memo(InfoCard);