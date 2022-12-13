import React from 'react';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function JoinUsCard({ title, icon, link, className }) {
  return (
    <div className={cn('MainLanding-JoinUsCard', className)}>
      <img src={icon} className="MainLanding-JoinUsCard__background" />
      <p className="MainLanding-JoinUsCard__title">{title}</p>
      {link}
    </div>
  );
}

export default JoinUsCard;
