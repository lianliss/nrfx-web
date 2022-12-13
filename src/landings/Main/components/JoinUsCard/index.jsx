import React from 'react';

// Styles
import './index.less';

function JoinUsCard({ title, icon, link }) {
  return (
    <div className="MainLanding-JoinUsCard">
      <img src={icon} className="MainLanding-JoinUsCard__background" />
      <p className="MainLanding-JoinUsCard__title">{title}</p>
      {link}
    </div>
  );
}

export default JoinUsCard;
