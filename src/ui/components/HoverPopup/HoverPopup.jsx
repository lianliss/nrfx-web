import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './HoverPopup.less';

// 'Children' is display element.
// 'Content' will display when user hover 'Children'.
function HoverPopup({ children, content }) {
  return (
    <div className="HoverPopup">
      <div className="HoverPopup__children">{children}</div>
      <div className="HoverPopup__content">
        <div className="HoverPopup__triangle">
          <SVG src={require('./assets/triangle.svg')} />
        </div>
        {content}
      </div>
    </div>
  );
}

export default HoverPopup;
