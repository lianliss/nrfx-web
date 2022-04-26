import './Badge.less';

import React from 'react';

function Badge({ count, children, onClick, type = 'default' }) {
  const handleClick = (e) => {
    onClick && onClick(e);
  };

  return (
    <>
      {type === 'default' && (
        <div className="Badge" onClick={handleClick}>
          {children}
          <span className="Badge__count">{count}</span>
        </div>
      )}
      {type === 'blue' && (
        <div className="Badge Badge-blue">
          <div className="Badge-blue-icon" onClick={onClick}>
            {children}
            {count && (
              <div className="Badge-blue-counter">
                <div>
                  <span>{count}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Badge;
