import React from 'react';
import SVG from 'utils/svg-wrap';

// Styles
import './CabinetContent.less';

function CabinetContent({ children, className }) {
  return (
    <div className={`CabinetContent ${className ? className : ''}`}>
      <div className="CabinetContent__container">
        {children}
        <div className="CabinetContent__bg-center">
          <SVG
            src={require('src/asset/backgrounds/cabinet-swap/center-of-screen-fix.svg')}
          />
        </div>
      </div>
      <div className="CabinetContent__bg">
        <SVG
          src={require('src/asset/backgrounds/cabinet-swap/right-of-screen-fix.svg')}
        />
      </div>
    </div>
  );
}

export default CabinetContent;
