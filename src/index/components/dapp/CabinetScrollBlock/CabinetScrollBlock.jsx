import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbar } from 'react-scrollbars-custom';

import './CabinetScrollBlock.less';

function CabinetScrollBlock({ children, className, maxHeight, ...props }) {
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
      className={`ScrollbarBox-container ${className}`}
      style={{
        height,
        maxHeight,
      }}
    >
      <Scrollbar
        maximalThumbSize={73}
        minimalThumbSize={73}
        className="ScrollbarBox"
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
        <div ref={contentRef}>{children}</div>
      </Scrollbar>
    </div>
  );
}

CabinetScrollBlock.propTypes = {
  className: PropTypes.string,
};

CabinetScrollBlock.defaultProps = {
  className: '',
};

export default CabinetScrollBlock;
