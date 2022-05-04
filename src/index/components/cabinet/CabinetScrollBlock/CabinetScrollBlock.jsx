import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

import './CabinetScrollBlock.less';

function CabinetScrollBlock({ children, ...props }) {
  return (
    <div className="ScrollbarBox-container">
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

export default CabinetScrollBlock;
