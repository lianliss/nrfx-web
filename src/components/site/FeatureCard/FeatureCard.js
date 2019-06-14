import './FeatureCard.less';

import React from 'react';


function FeatureCard({ title, caption }) {
  return (
    <div className="FeatureCard">
      <img src={require('./asset/feature_tick_icon.svg')} alt="Feature" className="FeatureCard__icon" />

      <div className="FeatureCard__cont">
        <h3 className="FeatureCard__title">{title}</h3>
        <p className="FeatureCard__caption">{caption}</p>
      </div>
    </div>
  )
};

export default React.memo(FeatureCard);