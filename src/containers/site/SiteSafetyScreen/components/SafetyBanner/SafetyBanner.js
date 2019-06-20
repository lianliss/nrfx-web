import './SafetyBanner.less';

import React from 'react';

function SafetyBanner() {
  return (
    <div className="SafetyBanner">
      <h2 className="SafetyBanner__title">Ваши средства надежно защищены</h2>

      <div className="SafetyBanner__cont">
        <div className="SafetyBanner__data">
          <h4>98%</h4>
        </div>

        <div className="SafetyBanner__text">
          <h4 className="SafetyBanner__subtitle">Холодное хранение</h4>
          <h5 className="SafetyBanner__caption">Подавляющее большинство средств хранится в автономных кошельках.</h5>
        </div>
      </div>
    </div>
  )
}

export default React.memo(SafetyBanner);