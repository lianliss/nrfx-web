import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbar } from 'react-scrollbars-custom';

import './CabinetScrollBlock.less';

function CabinetScrollBlock({ children, title, headerTool }) {
  return (
    <Scrollbar
      maximalThumbSize={73}
      minimalThumbSize={73}
      className="ScrollbarBox"
      trackYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <div {...restProps} ref={elementRef} className="ScrollbarTrackY" />
          );
        },
      }}
      thumbYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <span {...restProps} ref={elementRef} className="ScrollbarThumbY" />
          );
        },
      }}
    >
      {children}
    </Scrollbar>
  );
}

CabinetScrollBlock.propTypes = {
  title: PropTypes.string,
};

CabinetScrollBlock.defaultProps = {
  title: '',
  headerTool: null,
};

export default CabinetScrollBlock;
