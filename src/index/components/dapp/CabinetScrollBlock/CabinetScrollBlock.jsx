import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbar } from 'react-scrollbars-custom';
import { classNames as cn } from 'utils';

import './CabinetScrollBlock.less';

function CabinetScrollBlock({
  children,
  className,
  maxHeight,
  maximalThumbSize,
  minimalThumbSize,
  type,
  top,
  right,
  ...props
}) {
  const contentRef = React.useRef();
  const [height, setHeight] = React.useState(null);

  React.useEffect(() => {
    if (!maxHeight) return;
    if (!contentRef?.current) return;

    const contentHeight = contentRef.current.offsetHeight;

    setHeight(contentHeight);
  }, [children, maxHeight]);

  return (
    <div
      className={cn('ScrollbarBox-container', className)}
      style={{
        height,
        maxHeight,
      }}
    >
      <Scrollbar
        maximalThumbSize={maximalThumbSize}
        minimalThumbSize={minimalThumbSize}
        style={{
          '--scrollbar-track-y-top': top,
          '--scrollbar-track-y-right': right,
        }}
        className={cn('ScrollbarBox', type)}
        trackYProps={{
          renderer: (props) => {
            const { elementRef, ...restProps } = props;
            return (
              <div
                {...restProps}
                ref={elementRef}
                className="ScrollbarTrackY"
              />
            );
          },
        }}
        thumbYProps={{
          renderer: (props) => {
            const { elementRef, ...restProps } = props;
            return (
              <span
                {...restProps}
                ref={elementRef}
                className="ScrollbarThumbY"
              />
            );
          },
        }}
        {...props}
      >
        <div className="ScrollbarBox-content" ref={contentRef}>
          {children}
        </div>
      </Scrollbar>
    </div>
  );
}

CabinetScrollBlock.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['transparent-track', 'alice-blue']),
  maximalThumbSize: PropTypes.number,
  minimalThumbSize: PropTypes.number,
  top: PropTypes.string,
  right: PropTypes.string,
};

CabinetScrollBlock.defaultProps = {
  className: '',
  type: 'transparent-track',
  maximalThumbSize: 73,
  minimalThumbSize: 73,
  top: '10px',
  right: '4px',
};

export default CabinetScrollBlock;
