import React from 'react';
import PropTypes from 'prop-types';

// Components
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'src/utils';

// Styles
import './HoverPopup.less';

// 'Children' is display element.
// 'Content' will display when user hover 'Children'.
// Window Right/Left is paddings in right & left.
function HoverPopup({
  children,
  content,
  className,
  type,
  size,
  windowLeft,
  windowRight,
}) {
  // Constants
  const isTop = type === 'top';
  const isBottom = type === 'bottom';
  const triangleSize = size === 'large' ? 20 : 13;
  const triangleRotate = isTop ? ' rotate(180deg)' : '';
  const padding = size === 'small' ? 10 : 15;

  // States
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const [triangleStyles, setTriangleStyles] = React.useState({
    left: 50 + '%',
    transform: 'translateX(-50%)' + triangleRotate,
    top: isBottom ? -triangleSize / 2 : 'auto',
    bottom: isTop ? -triangleSize / 2 : 'auto',
  });
  const [isVisible, setIsVisible] = React.useState(false);

  // Refs
  const contentRef = React.useRef(null);

  const handleMouseEnter = (e) => {
    if (!contentRef.current) return;

    // Content size.
    const contentWidth = contentRef.current.clientWidth;
    const contentHeight = contentRef.current.clientHeight;

    // Children size
    const childrenHeight = e.currentTarget.clientHeight;
    const childrenWidth = e.currentTarget.clientWidth;

    // Children coordinates.
    const childrenCoords = e.currentTarget.getBoundingClientRect();
    const top = childrenCoords.top;
    const left = childrenCoords.left;

    // Finally left position from content
    let finallyLeft = left - contentWidth / 2 + childrenWidth / 2;
    // Content occupied width from left side
    const occupiedWidth = left + contentWidth / 2 + childrenWidth / 2;
    // Window output pixels
    let remainder = document.body.clientWidth - windowRight - occupiedWidth;
    remainder = remainder > 0 ? 0 : Math.abs(remainder);

    // Set X position
    setPosition((prev) => ({
      ...prev,
      left: finallyLeft - remainder,
    }));

    setTriangleStyles((prev) => ({
      ...prev,
      left: `calc(50% + ${remainder}px)`,
    }));
    // -----

    // Set Y position
    if (type === 'bottom') {
      setPosition((prev) => ({
        ...prev,
        top: top + childrenHeight + 20,
      }));
    }

    if (type === 'top') {
      setPosition((prev) => ({
        ...prev,
        top: top - childrenHeight - contentHeight,
      }));
    }
    // -----

    // Set visible
    setIsVisible(true);
  };

  return (
    <div className="HoverPopup">
      <div
        className="HoverPopup__children"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <div
        className={cn(
          'HoverPopup__content',
          { active: isVisible },
          type,
          className
        )}
        style={{ ...position, padding }}
        ref={contentRef}
      >
        <div className="HoverPopup__triangle" style={triangleStyles}>
          <SVG
            src={require('./assets/triangle.svg')}
            style={{ width: triangleSize, height: triangleSize }}
          />
        </div>
        {content}
      </div>
    </div>
  );
}

HoverPopup.propTypes = {
  children: PropTypes.any,
  content: PropTypes.any,
  className: PropTypes.string,
  type: PropTypes.oneOf(['top', 'bottom']),
  size: PropTypes.oneOf(['small', 'large']),
  windowLeft: PropTypes.number,
  windowRight: PropTypes.number,
};

HoverPopup.defaultProps = {
  className: '',
  type: 'bottom',
  size: 'large',
  windowLeft: 0,
  windowRight: 0,
};

export default HoverPopup;
