import React from 'react';

// Styles
import './Card.less';

function Card({ firstTitle, firstCount, secondTitle, secondCount }) {

  return (
    <div className="Referral__Card">
      <div>
        <p className="Referral__Card__title">{firstTitle}</p>
        <p className="Referral__Card__count">{firstCount}</p>
      </div>
      <div>
        <p className="Referral__Card__title">{secondTitle}</p>
        <p className="Referral__Card__count">{secondCount}</p>
      </div>
    </div>
  );
}

export default Card;
