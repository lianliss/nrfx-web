import React from 'react';
import PropTypes from "prop-types";

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './HoverPopup.less';

// 'Children' is display element.
// 'Content' will display when user hover 'Children'.
function HoverPopup({ children, content, className }) {
  return (
    <div className="HoverPopup">
      <div className="HoverPopup__children">{children}</div>
      <div className={`HoverPopup__content ${className}`}>
        <div className="HoverPopup__triangle">
          <SVG src={require('./assets/triangle.svg')} />
        </div>
        {content}
      </div>
    </div>
  );
}

HoverPopup.propTypes = {
  children: PropTypes.any,
  content: PropTypes.any,
  className: PropTypes.string
}

export default HoverPopup;
