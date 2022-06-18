import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbar } from 'react-scrollbars-custom';

import './CabinetScrollBlock.less';

function CabinetScrollBlock({ children, className, ...props }) {
  return (
    <div className={`ScrollbarBox-container ${className}`}>
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
        {children}
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
